import { useEffect, useState, useCallback } from "react";
import Filters from "../components/Filters";
import ReviewCard from "../components/ReviewCard";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const baseUrl = import.meta.env.VITE_GOSTOPS_BE_BASEURL;

  const stats = [
    { name: 'Total Claims', textColor: 'text-[#0A0A0A]', filterValue: 'all' },
    { name: 'Pending', textColor: 'text-[#FF9800]', filterValue: 'pending' },
    { name: 'Accepted', textColor: 'text-[#008000]', filterValue: 'accepted' },
    { name: 'Rejected', textColor: 'text-[#FF0000]', filterValue: 'rejected' },
  ];

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    total_claims: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(true); // For API data fetching
  const [isFiltering, setIsFiltering] = useState(false); // For filter operations
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ claimStatus: 'pending' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");

  // Map API status to dashboard status
  const mapStatus = (apiStatus) => {
    switch (apiStatus?.toLowerCase()) {
      case 'approved':
        return 'accepted';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'rejected';
      default:
        return apiStatus?.toLowerCase() || 'pending';
    }
  };

  // Transform API claim data to dashboard format
  const transformClaimData = (claim) => {
    // Extract short UUID for claimId (first 8 characters)
    const shortUuid = claim.uuid?.substring(0, 8).toUpperCase() || 'N/A';
    
    return {
      id: claim.uuid,
      claimId: `CLM-${shortUuid}`,
      photo: claim.proof_url || '',
      userName: claim.user_profile?.name || 'N/A',
      hostelName: claim.hostel?.name || 'N/A',
      bookingId: `BK-${claim.model_id || 'N/A'}`,
      otaVoucherId: claim.platform?.toUpperCase() || 'N/A',
      phone: claim.user_profile?.phone || 'N/A',
      email: claim.user_profile?.email || 'N/A',
      checkoutDate: claim.created_at || new Date().toISOString(),
      dateTime: claim.created_at || new Date().toISOString(),
      status: mapStatus(claim.status),
      hostelId: claim.hostel?.id?.toString() || '',
      rejectionReason: claim.rejection_reason || null,
      acceptanceComment: claim.comments || null,
      uuid: claim.uuid,
    };
  };

  // Fetch claims function
  const fetchClaims = useCallback(async () => {
    if (!user?.token) {
      setIsLoadingData(false);
      return;
    }

    setIsLoadingData(true);
    setError("");

    try {
      const response = await fetch(
        `${baseUrl}/api/core/v1/incentive-claims/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      const result = await response.json();
      console.log("Claims API response:", result);

      if (response.ok && result.status === "success" && result.data) {
        // Set summary data
        if (result.data.summary) {
          setSummary({
            total_claims: result.data.summary.total_claims || 0,
            pending: result.data.summary.pending || 0,
            accepted: result.data.summary.accepted || 0,
            rejected: result.data.summary.rejected || 0,
          });
        }

        // Transform and set claims data
        const transformedData = (result.data.claims || []).map(transformClaimData);
        setData(transformedData);
      } else {
        setError(result.message || "Failed to fetch claims");
        setData([]);
        setSummary({
          total_claims: 0,
          pending: 0,
          accepted: 0,
          rejected: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
      setError("Failed to load claims. Please try again.");
      setData([]);
      setSummary({
        total_claims: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
      });
    } finally {
      setIsLoadingData(false);
    }
  }, [user?.token, baseUrl]);

  // Load Data from API
  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  // Optimized Filter Logic
  useEffect(() => {
    // Don't filter if data is still loading from API
    if (isLoadingData) {
      return;
    }

    setIsFiltering(true);

    // Wrap heavy logic in setTimeout to push it to the next event loop tick.
    // This allows React to render the Loading Spinner FIRST.
    const timer = setTimeout(() => {
      let result = [...data];

      if (filters.claimStatus && filters.claimStatus !== 'all') {
        result = result.filter(item => item.status === filters.claimStatus);
      }

      if (filters.hostelName) {
        result = result.filter(item =>
          item.hostelName.toLowerCase().includes(filters.hostelName.toLowerCase())
        );
      }

      if (filters.timePeriod && filters.timePeriod !== 'all') {
        const now = new Date();
        result = result.filter(item => {
          const itemDate = new Date(item.dateTime);
          const diffInMs = now - itemDate;
          const diffInHours = diffInMs / (1000 * 60 * 60);
          const diffInDays = diffInHours / 24;

          if (filters.timePeriod === '24hrs') return diffInHours <= 24;
          if (filters.timePeriod === '7days') return diffInDays <= 7;
          if (filters.timePeriod === '30days') return diffInDays <= 30;
          return true;
        });
      }

      if (filters.searchValue) {
        const searchTerm = filters.searchValue.toLowerCase();
        const searchField = filters.searchField || 'all';

        result = result.filter((item) => {
          if (searchField === 'all') {
            return (
              item.claimId.toLowerCase().includes(searchTerm) ||
              item.userName.toLowerCase().includes(searchTerm) ||
              item.email.toLowerCase().includes(searchTerm) ||
              item.bookingId.toLowerCase().includes(searchTerm) ||
              item.otaVoucherId.toLowerCase().includes(searchTerm) ||
              item.phone.toLowerCase().includes(searchTerm)
            );
          }
          if (searchField === 'name') {
            return item.userName.toLowerCase().includes(searchTerm);
          }
          if (searchField === 'claimId') {
            return item.claimId.toLowerCase().includes(searchTerm);
          }
          if (searchField === 'bookingId') {
            return item.bookingId.toLowerCase().includes(searchTerm);
          }
          if (searchField === 'otaId') {
            return item.otaVoucherId.toLowerCase().includes(searchTerm);
          }
          if (searchField === 'phone') {
            return item.phone.toLowerCase().includes(searchTerm);
          }
          if (searchField === 'email') {
            return item.email.toLowerCase().includes(searchTerm);
          }
          return true;
        });
      }

      setFilteredData(result);
      setIsFiltering(false);
    }, 0); // 0ms delay is enough to unblock the main thread

    return () => clearTimeout(timer);
  }, [data, filters, isLoadingData]);

  // Handle Stats Card Click
  const handleStatClick = (filterValue) => {
    setFilters((prev) => ({ ...prev, claimStatus: filterValue }));
  };

  const getStatusCount = (status) => {
    if (status === 'all') {
      return summary.total_claims;
    }
    switch (status) {
      case 'pending':
        return summary.pending;
      case 'accepted':
        return summary.accepted;
      case 'rejected':
        return summary.rejected;
      default:
        return data.filter((item) => item.status === status).length;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 gap-6 flex flex-col">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const isSelected =
            (filters.claimStatus === stat.filterValue) ||
            (!filters.claimStatus && stat.filterValue === 'all');

          return (
            <div
              key={stat.name}
              className={`cursor-pointer bg-white rounded-[0.625rem] gap-1 p-[1.125rem] border-[0.823px] md:border ${isSelected ? "border-black bg-gray-50" : "border-[rgba(0,0,0,0.1)]"
                }`}
              onClick={() => handleStatClick(stat.filterValue)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] md:text-[0.875rem] leading-[1rem] md:leading-[1.25rem] font-normal text-[#717182]">
                    {stat.name}
                  </p>
                  {isLoadingData ? (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-400"></div>
                    </div>
                  ) : (
                    <p className={`mt-2 text-[1.25rem] md:text-[1.5rem] leading-[1.75rem] md:leading-[2rem] font-bold ${stat.textColor}`}>
                      {getStatusCount(stat.filterValue)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[0.875rem] border-[0.874px] md:border border-[rgba(0,0,0,0.1)] p-4 md:p-6">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {error && (
        <div className="flex bg-white p-[3rem] h-[7.625rem] rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center">
          <span className="text-red-500 text-[1rem] leading-[1.5rem] font-normal">
            {error}
          </span>
        </div>
      )}
      {isLoadingData ? (
        <div className="flex bg-white p-[3rem] h-[20rem] rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center flex-col gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="text-[#717182] text-sm">Loading claims...</span>
        </div>
      ) : isFiltering ? (
        <div className="flex bg-white p-[3rem] h-[20rem] rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center flex-col gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="text-[#717182] text-sm">Filtering...</span>
        </div>
      ) : !error && filteredData?.length === 0 ? (
        <div className="flex bg-white p-[3rem] h-[7.625rem] rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center">
          <span className="text-[#717182] text-[1rem] leading-[1.5rem] font-normal">
            No claims found matching your filters
          </span>
        </div>
      ) : !error && (
        <div className="flex flex-col gap-4">
          {filteredData.map((item) => (
            <ReviewCard 
              key={item.id} 
              item={item} 
              setShowToast={setShowToast} 
              setToastMessage={setToastMessage}
              onRefresh={fetchClaims}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
      />

    </div>
  );
};

export default Dashboard;