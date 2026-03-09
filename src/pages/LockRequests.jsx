import { useState, useEffect } from "react";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import LockFilters from "../components/LockRequests/LockFilters";
import ActionModal from "../components/LockRequests/ActionModal";
import TableData from "../components/LockRequests/TableData";

const LockRequests = () => {
  const stats = [
    { name: "Pending Requests", textColor: "text-[#FF9800]", filterValue: "pending" },
    { name: "Approved Today", textColor: "text-[#008000]", filterValue: "accepted" },
    { name: "Denied Today", textColor: "text-[#FF0000]", filterValue: "rejected" },
  ];

  const baseUrl = import.meta.env.VITE_GOSTOPS_BE_BASEURL;
  const { user } = useAuth();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  const [pendingData, setPendingData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [totalPending, setTotalPending] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  const [pendingPage, setPendingPage] = useState(1);
  const [reportsPage, setReportsPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    status: "all",
    hostel: [], // Array for multiple selection
    fromDate: "", 
    toDate: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Reset pages to 1 when filters or active tab changes
  useEffect(() => {
    setPendingPage(1);
    setReportsPage(1);
  }, [filters, activeTab]);

  // Helper to get all allowed hostel IDs
  const getAllHostelIds = () => {
    return user?.hostels_can_access?.map(h => h.id).join(',') || '';
  };

  // convert YYYY-MM-DD to DD-MM-YYYY for API
  const formatApiDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const fetchLockData = async () => {
    setIsLoadingData(true);
    setError(null);
    try {
      const selectedHostels = Array.isArray(filters.hostel) && filters.hostel.length > 0
        ? filters.hostel.join(',')
        : getAllHostelIds();

      if (activeTab === 'pending') {
        const url = `${baseUrl}/api/employee/v1/get-pending-lock-requests/?hostel_ids=${selectedHostels}&limit=${itemsPerPage}&page=${pendingPage - 1}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${user?.token}` } });
        const json = await res.json();

        if (json.status === "success") {
          // Map API keys to TableData expected keys
          const mapped = json.data.requests.map(req => ({
            id: req.id,
            timestamp: req.created_at,
            property: req.hostel,
            room: req.bed_info,
            reason: req.requested_reason,
            staff: req.requested_by_name,
            staffPhone: req.requested_by_mobile
          }));
          setPendingData(mapped);
          setTotalPending(json.data.total_records);
        }
      } else {
        let url = `${baseUrl}/api/employee/v1/request-lock/history/?hostel_ids=${selectedHostels}&limit=${itemsPerPage}&page=${reportsPage - 1}`;

        // Add optional filters
        if (filters.status && filters.status !== 'all') {
          url += `&status=${filters.status.toLowerCase()}`;
        }
        if (filters.fromDate) url += `&start_time=${formatApiDate(filters.fromDate)}`;
        if (filters.toDate) url += `&end_time=${formatApiDate(filters.toDate)}`;

        const res = await fetch(url, { headers: { Authorization: `Bearer ${user?.token}` } });
        const json = await res.json();

        if (json.status === "success") {
          // Map API keys to TableData expected keys
          const mapped = json.data.requests.map(req => ({
            id: req.id,
            datetime: req.created_at,
            location: req.hostel,
            room: req.bed_info,
            status: req.status.charAt(0).toUpperCase() + req.status.slice(1),
            duration: req.access_duration ? `${req.access_duration} min` : '–',
            actionedBy: req.action_by,
            note: req.action_reason || '–'
          }));

          setReportsData(mapped);
          setTotalReports(json.data.total_records);
        }
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Trigger fetch when tab, page, or filters change
  useEffect(() => {
    if (user?.token) fetchLockData();
  }, [activeTab, pendingPage, reportsPage, filters, user?.token]);

  // Modal state
  const [modal, setModal] = useState({ isOpen: false, type: null, id: null });

  const openModal = (type, id) => setModal({ isOpen: true, type, id });
  const closeModal = () => setModal({ isOpen: false, type: null, id: null });

  const handleConfirm = async (type, data) => {
    const isApprove = type === 'approve';
    const endpoint = isApprove ? 'approve/' : 'reject/';
    const url = `${baseUrl}/api/employee/v1/request-lock/${endpoint}`;

    // Payload 
    const reqBody = isApprove
      ? { request_lock_id: modal.id, access_duration: data.duration }
      : { request_lock_id: modal.id, rejection_reason: data.reason };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(reqBody)
      });
      const json = await res.json();

      if (json.status === "success") {
        setToastMessage(isApprove ? 'Access granted successfully.' : 'Request rejected.');
        setShowToast(true);

        closeModal();
        fetchLockData();
      } else {
        setToastMessage(json.message || "Action failed.");
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("An error occurred.");
      setShowToast(true);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const selectedHostels = Array.isArray(filters.hostel) && filters.hostel.length > 0
        ? filters.hostel.join(',')
        : getAllHostelIds();

      let url = `${baseUrl}/api/employee/v1/request-lock/history/download/?hostel_ids=${selectedHostels}`;

      if (filters.status && filters.status !== 'all') url += `&status=${filters.status.toLowerCase()}`;
      if (filters.fromDate) url += `&start_time=${formatApiDate(filters.fromDate)}`;
      if (filters.toDate) url += `&end_time=${formatApiDate(filters.toDate)}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${user?.token}` } });
      if (!res.ok) throw new Error("Download failed");

      // Handle the raw CSV file response
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `Lock_Reports_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setToastMessage("CSV download started successfully.");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Failed to download CSV.");
      setShowToast(true);
    }
  };

  // paginated data
  const paginatedPending = pendingData;
  const paginatedReports = reportsData;

  // Calculate total pages based on total_records from the API
  const totalPendingPages = Math.ceil(totalPending / itemsPerPage) || 1;
  const totalReportsPages = Math.ceil(totalReports / itemsPerPage) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 gap-6 flex flex-col min-h-full w-full min-w-0">
      {/* Tabs */}
      <div className="flex border-b-2 border-[#E5E7EB] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-2 text-[0.875rem] font-medium transition-colors relative border-b-2 shrink-0 cursor-pointer ${activeTab === 'pending' ? 'text-[#0A0A0A] border-[#030213]' : 'text-[#717182] border-transparent hover:text-[#0A0A0A]'}`}
        >
          Pending Requests
          {totalPending > 0 && (
            <span className="ml-2 bg-[#DC2626] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full align-middle inline-flex items-center justify-center">
              {totalPending}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-5 py-2 text-[0.875rem] font-medium transition-colors border-b-2 shrink-0 cursor-pointer ${activeTab === 'reports' ? 'text-[#0A0A0A] border-[#030213]' : 'text-[#717182] border-transparent hover:text-[#0A0A0A]'}`}
        >
          Reports
        </button>
      </div>

      {/* Filters */}
      <LockFilters
        filters={filters}
        setFilters={setFilters}
        hostels={user?.hostels_can_access || []}
        activeTab={activeTab}
        onDownload={handleDownloadCSV}
      />

      {/* Error */}
      {error && (
        <div className="flex bg-white p-12 h-30.5 rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center">
          <span className="text-red-500 text-[1rem] leading-6 font-normal">{error}</span>
        </div>
      )}

      {/* Loading */}
      {isLoadingData && !error && (
        <div className="flex bg-white p-12 h-80 rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center flex-col gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="text-[#717182] text-sm">Loading data...</span>
        </div>
      )}

      {/* Table */}
      {!error && !isLoadingData && (
        <TableData
          activeTab={activeTab}

          // Data
          pendingData={pendingData}
          reportsData={reportsData}
          paginatedPending={paginatedPending}
          paginatedReports={paginatedReports}

          // Pagination
          itemsPerPage={itemsPerPage}
          pendingPage={pendingPage}
          setPendingPage={setPendingPage}
          reportsPage={reportsPage}
          setReportsPage={setReportsPage}
          totalPendingPages={totalPendingPages}
          totalReportsPages={totalReportsPages}
          totalPendingRecords={totalPending}
          totalReportsRecords={totalReports}

          // Action Handlers
          openModal={openModal}
        />
      )}

      {/* Modal */}
      <ActionModal
        isOpen={modal.isOpen}
        type={modal.type}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />

      {/* Toast */}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
      />
    </div>
  );
};

export default LockRequests;