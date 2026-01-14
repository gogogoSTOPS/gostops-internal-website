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
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ claimStatus: 'all', timePeriod: 'all' }); // Default to pending status and all time
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
    
    
    return {
      id: claim.uuid,
      claimId: claim.uuid,
      photo: claim.proof_url || '',
      userName: claim.user_profile?.name || 'N/A',
      hostelName: claim.hostel?.name || 'N/A',
      hostelSlug: claim.hostel?.slug || '',
      bookingId: claim.order_id || 'N/A',
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

  // Fetch claims function with filters
  const fetchClaims = useCallback(async (currentFilters) => {
    if (!user?.token) {
      setIsLoadingData(false);
      return;
    }

    setIsLoadingData(true);
    setError("");

    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      // Add status filter (from claimStatus in filters)
      if (currentFilters?.claimStatus && currentFilters.claimStatus !== 'all') {
        queryParams.append('status', currentFilters.claimStatus);
      }
      
      // Add hostel filter (slug)
      if (currentFilters?.hostelName) {
        queryParams.append('hostel_slug', currentFilters.hostelName);
      }
      
      // Add search value
      if (currentFilters?.searchValue) {
        queryParams.append('search', currentFilters.searchValue);
      }
      
      // Add search field
      if (currentFilters?.searchField && currentFilters.searchField !== 'all') {
        queryParams.append('search_field', currentFilters.searchField);
      }
      
      // Add time period filter
      if (currentFilters?.timePeriod && currentFilters.timePeriod !== 'all') {
        queryParams.append('time_period', currentFilters.timePeriod);
      }

      const queryString = queryParams.toString();
      const url = `${baseUrl}/api/core/v1/incentive-claims/${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      console.log("Claims API response:", result);

      if (response.ok && result.status === "success" && result.data) {
        // Set summary data
        if (result.data.summary) {
          setSummary({
            total_claims: result.data.summary.total_claims || 0,
            pending: result.data.summary.pending || 0,
            accepted: result.data.summary.accepted || result.data.summary.approved || 0, // Map approved to accepted
            rejected: result.data.summary.rejected || 0,
          });
        }

        // Transform and set claims data
        const transformedData = (result.data.claims || []).map(transformClaimData);
        setData(transformedData);
        setFilteredData(transformedData); // Set filtered data directly from API
      } else {
        setError(result.message || "Failed to fetch claims");
        setData([]);
        setFilteredData([]);
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
      setFilteredData([]);
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

  // Load Data from API on mount and when filters change
  useEffect(() => {
    fetchClaims(filters);
  }, [filters, fetchClaims]);

  // Handle Stats Card Click - updates filter and triggers API call
  const handleStatClick = (filterValue) => {
    setFilters((prev) => ({ ...prev, claimStatus: filterValue }));
  };

  const getStatusCount = (status) => {
    // Use summary from backend API response (not filtered data)
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
        return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 gap-6 flex flex-col">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          // Default to 'pending' if no claimStatus is set
          const currentStatus = filters.claimStatus || 'all';
          const isSelected = currentStatus === stat.filterValue;

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
        <Filters 
          filters={filters} 
          setFilters={setFilters}
          hostels={user?.hostels_can_access || []}
        />
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