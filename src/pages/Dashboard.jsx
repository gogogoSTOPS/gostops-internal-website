import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ReviewCard from "../components/ReviewCard";

const Dashboard = () => {
  const stats = [
    { name: 'Total Claims', textColor: 'text-[#0A0A0A]', filterValue: 'all' },
    { name: 'Pending', textColor: 'text-[#FF9800]', filterValue: 'pending' },
    { name: 'Accepted', textColor: 'text-[#008000]', filterValue: 'accepted' },
    { name: 'Rejected', textColor: 'text-[#FF0000]', filterValue: 'rejected' },
  ];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ claimStatus: 'all' });

  // Load Data
  useEffect(() => {
    setData([
      {
        id: '1',
        claimId: 'CLM-2024-001',
        photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
        userName: 'Sarah Johnson',
        hostelName: 'Sunset Backpackers',
        bookingId: 'BK-45321',
        otaVoucherId: 'OTA-9876',
        phone: '+1-555-0123',
        email: 'sarah.j@email.com',
        checkoutDate: '2024-12-29',
        dateTime: '2024-12-30T08:30:00',
        status: 'pending',
        hostelId: 'HST-001',
      },
      {
        id: '2',
        claimId: 'CLM-2024-002',
        photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
        userName: 'Michael Chen',
        hostelName: 'Downtown Hostel',
        bookingId: 'BK-45322',
        otaVoucherId: 'OTA-9877',
        phone: '+1-555-0124',
        email: 'mchen@email.com',
        checkoutDate: '2024-12-29',
        dateTime: '2024-12-30T10:15:00',
        status: 'pending',
        hostelId: 'HST-002',
      },
      {
        id: '3',
        claimId: 'CLM-2024-003',
        photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
        userName: 'Emma Williams',
        hostelName: 'Beach House Hostel',
        bookingId: 'BK-45323',
        otaVoucherId: 'OTA-9878',
        phone: '+1-555-0125',
        email: 'emma.w@email.com',
        checkoutDate: '2024-12-28',
        dateTime: '2024-12-29T14:20:00',
        status: 'accepted',
        hostelId: 'HST-003',
        acceptanceComment: 'Verified review on Google. Reward processed.',
      },
      {
        id: '4',
        claimId: 'CLM-2024-004',
        photo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
        userName: 'James Brown',
        hostelName: 'City Center Hostel',
        bookingId: 'BK-45324',
        otaVoucherId: 'OTA-9879',
        phone: '+1-555-0126',
        email: 'jbrown@email.com',
        checkoutDate: '2024-12-27',
        dateTime: '2024-12-28T16:45:00',
        status: 'rejected',
        hostelId: 'HST-004',
        rejectionReason: 'We are unable to see the review on the associated platform.',
      },
      {
        id: '5',
        claimId: 'CLM-2024-005',
        photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        userName: 'Olivia Martinez',
        hostelName: 'Mountain View Lodge',
        bookingId: 'BK-45325',
        otaVoucherId: 'OTA-9880',
        phone: '+1-555-0127',
        email: 'olivia.m@email.com',
        checkoutDate: '2024-12-30',
        dateTime: '2024-12-30T09:00:00',
        status: 'pending',
        hostelId: 'HST-005',
      },
      {
        id: '6',
        claimId: 'CLM-2024-006',
        photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
        userName: 'David Lee',
        hostelName: 'Riverside Backpackers',
        bookingId: 'BK-45326',
        otaVoucherId: 'OTA-9881',
        phone: '+1-555-0128',
        email: 'david.lee@email.com',
        checkoutDate: '2024-12-30',
        dateTime: '2024-12-30T11:30:00',
        status: 'pending',
        hostelId: 'HST-006',
      },
      {
        id: '7',
        claimId: 'CLM-2024-007',
        photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        userName: 'Robert Taylor',
        hostelName: 'Old Town Hostel',
        bookingId: 'BK-45327',
        otaVoucherId: 'OTA-9882',
        phone: '+1-555-0129',
        email: 'rtaylor@email.com',
        checkoutDate: '2024-12-26',
        dateTime: '2024-12-27T10:00:00',
        status: 'accepted',
        hostelId: 'HST-007',
      },
      {
        id: '8',
        claimId: 'CLM-2024-008',
        photo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&h=300&fit=crop',
        userName: 'Lisa Anderson',
        hostelName: 'Garden Hostel',
        bookingId: 'BK-45328',
        otaVoucherId: 'OTA-9883',
        phone: '+1-555-0130',
        email: 'lisa.a@email.com',
        checkoutDate: '2024-12-29',
        dateTime: '2024-12-30T07:45:00',
        status: 'pending',
        hostelId: 'HST-008',
      },
    ]);
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...data];

    // Claim Status
    if (filters.claimStatus && filters.claimStatus !== 'all') {
      result = result.filter(
        (item) => item.status === filters.claimStatus
      );
    }

    // Hostel Name
    if (filters.hostelName) {
      result = result.filter((item) =>
        item.hostelName.toLowerCase().includes(filters.hostelName.toLowerCase())
      );
    }

    // Time Period
    if (filters.timePeriod && filters.timePeriod !== 'all') {
      const now = new Date();
      result = result.filter((item) => {
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

    // Search Value & Field
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
  }, [data, filters]);

  // Handle Stats Card Click
  const handleStatClick = (filterValue) => {
    setFilters((prev) => ({ ...prev, claimStatus: filterValue }));
  };

  const getStatusCount = (status) => {
    return data.filter((item) => item.status === status).length;
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
                  <p className={`mt-2 text-[1.25rem] md:text-[1.5rem] leading-[1.75rem] md:leading-[2rem] font-bold ${stat.textColor}`}>
                    {stat.filterValue === 'all' ? data.length : getStatusCount(stat.filterValue)}
                  </p>
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

      {/* Data */}
      {filteredData?.length === 0 ? (
        <div className="flex bg-white p-[3rem] h-[7.625rem] rounded-[0.625rem] border-[0.823px] md:border border-[rgba(0,0,0,0.1)] items-center justify-center">
          <span className="text-[#717182] text-[1rem] leading-[1.5rem] font-normal">
            No claims found matching your filters
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredData.map((item) => (
            <ReviewCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;