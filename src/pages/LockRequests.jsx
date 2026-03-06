import { useState } from "react";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import LockFilters from "../components/LockRequests/LockFilters";
import ActionModal from "../components/LockRequests/ActionModal";
import TableData from "../components/LockRequests/TableData";

// Sample Data 
const initialPendingData = [
  { id: 1, timestamp: '19-Feb 14:15', property: 'Mumbai, Andheri', room: 'Room 305 Bed B', reason: 'Emergency medical supplies needed', staff: 'Amit Patel', staffPhone: '+91 99887 76655' },
  { id: 2, timestamp: '19-Feb 13:45', property: 'Delhi, Hauz Khas', room: 'Room 102 Bed A', reason: 'Guest locked out - forgot keys', staff: 'Sneha Reddy', staffPhone: '+91 96543 21098' },
  { id: 3, timestamp: '19-Feb 12:20', property: 'Pune, Koregaon Park', room: 'Room 403 Bed C', reason: 'Maintenance check requested by guest', staff: 'Vikram Singh', staffPhone: '+91 94321 87654' },
  { id: 4, timestamp: '19-Feb 11:05', property: 'Goa, Anjuna', room: 'Room 201 Bed A', reason: 'Locker combination not working', staff: 'Priya Nair', staffPhone: '+91 87654 32109' },
];

const initialReportsData = [
  { id: 101, datetime: '19-Feb 12:10', location: 'Delhi, Safdarjung', room: 'Room 101 A', status: 'Accepted', duration: '30 min', actionedBy: 'Ravi (CX)', note: '–' },
  { id: 102, datetime: '19-Feb 09:45', location: 'Varanasi', room: 'Room 302 C', status: 'Rejected', duration: '–', actionedBy: 'Neha (CX)', note: 'Guest is not the primary booker, verification failed.' },
  { id: 103, datetime: '18-Feb 18:20', location: 'Mumbai, Bandra', room: 'Room 205 B', status: 'Accepted', duration: '1 hr', actionedBy: 'Amit (CX)', note: '–' },
  { id: 104, datetime: '18-Feb 16:35', location: 'Bengaluru, Indiranagar', room: 'Room 408 D', status: 'Accepted', duration: '10 min', actionedBy: 'Priya (CX)', note: '–' },
  { id: 105, datetime: '18-Feb 14:55', location: 'Chennai, Adyar', room: 'Room 310 A', status: 'Rejected', duration: '–', actionedBy: 'Ravi (CX)', note: 'Unable to verify guest identity over phone.' },
];

const LockRequests = () => {
  const { user } = useAuth();

  const stats = [
    { name: "Pending", textColor: "text-[#FF9800]", filterValue: "pending" },
    { name: "Today", textColor: "text-[#008000]", filterValue: "accepted" },
    { name: "Rejected", textColor: "text-[#FF0000]", filterValue: "rejected" },
  ];

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  const [pendingData, setPendingData] = useState(initialPendingData);
  const [reportsData, setReportsData] = useState(initialReportsData);
  const [pendingPage, setPendingPage] = useState(1);
  const [reportsPage, setReportsPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    status: "all",
    hostel: "all",
    dateRange: { from: null, to: null },
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Modal state
  const [modal, setModal] = useState({ isOpen: false, type: null, id: null });

  const openModal = (type, id) => setModal({ isOpen: true, type, id });
  const closeModal = () => setModal({ isOpen: false, type: null, id: null });

  const handleConfirm = (type, data) => {
    console.log('Action:', type, 'ID:', modal.id, 'Data:', data);
    setToastMessage(type === 'approve' ? 'Access granted successfully.' : 'Request rejected.');
    setShowToast(true);
    closeModal();
  };

  const getStatusCount = () => 1;

  const paginatedPending = pendingData.slice((pendingPage - 1) * itemsPerPage, pendingPage * itemsPerPage);
  const paginatedReports = reportsData.slice((reportsPage - 1) * itemsPerPage, reportsPage * itemsPerPage);
  const totalPendingPages = Math.ceil(pendingData.length / itemsPerPage) || 1;
  const totalReportsPages = Math.ceil(reportsData.length / itemsPerPage) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 gap-6 flex flex-col min-h-full w-full min-w-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
        {stats?.map((stat) => (
          <div key={stat.name} className="cursor-pointer bg-white rounded-[0.625rem] gap-1 p-4.5 border-[0.823px] md:border border-[rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.75rem] md:text-[0.875rem] leading-4 md:leading-5 font-normal text-[#717182]">{stat.name}</p>
                {isLoadingData ? (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-400"></div>
                  </div>
                ) : (
                  <p className={`mt-2 text-[1.25rem] md:text-[1.5rem] leading-7 md:leading-8 font-bold ${stat.textColor}`}>
                    {getStatusCount(stat.filterValue)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#E5E7EB] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-2 text-[0.875rem] font-medium transition-colors relative border-b-2 shrink-0 cursor-pointer ${activeTab === 'pending' ? 'text-[#0A0A0A] border-[#030213]' : 'text-[#717182] border-transparent hover:text-[#0A0A0A]'}`}
        >
          Pending Requests
          {pendingData.length > 0 && (
            <span className="ml-2 bg-[#DC2626] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full align-middle inline-flex items-center justify-center">
              {pendingData.length}
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
        onDownload={() => { }}
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