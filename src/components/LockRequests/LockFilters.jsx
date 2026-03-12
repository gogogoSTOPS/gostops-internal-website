import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ClearIcon, DownloadIcon, RefreshIcon, SearchIconHostel, CheckIcon } from "../../icons/svgIcons";

// Lock Requests Filter Configuration
const FILTER_CONFIG = [
  {
    id: "hostel",
    label: "Hostel Name",
    type: "select",
    placeholder: "All Hostels",
  },
  {
    id: "status",
    label: "Request Status",
    type: "select",
    placeholder: "All Statuses",
    options: [
      { value: "all", label: "All Statuses" },
      { value: "Accepted", label: "Accepted" },
      { value: "Pending", label: "Pending" },
      { value: "Rejected", label: "Rejected" },
    ],
  },
  {
    id: "fromDate",
    label: "From Date",
    type: "date",
    placeholder: "Select date",
  },
  {
    id: "toDate",
    label: "To Date",
    type: "date",
    placeholder: "Select date",
  },
];

const LockFilters = ({ filters, setFilters, hostels = [], activeTab, onDownload, fetchLockData, isLoadingData }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hostelSearchQuery, setHostelSearchQuery] = useState("");
  const dropdownRefs = useRef({});

  // Filter the configuration based on the active tab
  const visibleFilters = activeTab === "pending"
    ? FILTER_CONFIG.filter((f) => f.id === "hostel")
    : FILTER_CONFIG;

  const hostelOptions = [
    { value: "", label: "All Hostels" },
    ...hostels.map((hostel) => ({
      value: hostel.id || hostel,
      label: hostel.name || hostel,
    })),
  ];

  useEffect(() => {
    setFilters((prev) => {
      const baseFilters = FILTER_CONFIG.reduce((acc, curr) => {
        if (!(curr.id in prev)) {
          acc[curr.id] = curr.id === "status" ? "all" : curr.id === "hostel" ? [] : "";
        } else {
          acc[curr.id] = prev[curr.id];
        }
        return acc;
      }, {});
      return baseFilters;
    });
  }, [setFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!openDropdown) return;
      const currentActiveRef = dropdownRefs.current[openDropdown];
      if (currentActiveRef && !currentActiveRef.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
  };

  const handleHostelToggle = (hostelId) => {
    if (hostelId === "") {
      setFilters((prev) => ({ ...prev, hostel: [] }));
      setOpenDropdown(null); // Close the dropdown immediately
      setHostelSearchQuery(""); 
      return;
    }

    setFilters((prev) => {
      const currentHostels = Array.isArray(prev.hostel) ? prev.hostel : [];

      // If user clicks All Hostels, clear the array
      if (hostelId === "") {
        return { ...prev, hostel: [] };
      }

      // Toggle the selected hostel ID
      const isSelected = currentHostels.includes(hostelId);
      const newHostels = isSelected
        ? currentHostels.filter((id) => id !== hostelId)
        : [...currentHostels, hostelId];

      setHostelSearchQuery("");
      return { ...prev, hostel: newHostels };
    });
  };

  const clearFilters = () => {
    setFilters(
      FILTER_CONFIG.reduce((acc, curr) => {
        acc[curr.id] = curr.id === "status" ? "all" : curr.id === "hostel" ? [] : "";
        return acc;
      }, {})
    );
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, val]) => {
    const isVisible = visibleFilters.some(f => f.id === key);
    if (!isVisible) return false;

    if (key === "hostel") return Array.isArray(val) && val.length > 0;
    if (key === "status") return val !== "all" && val !== "";
    return val !== "";
  });

  const labelStyle = "text-[#0A0A0A] text-[0.875rem] font-medium leading-[0.875rem] -tracking-[0.15px] mb-[0.5rem]";
  const inputBaseStyle = "flex w-full h-[2.25rem] px-[0.75rem] items-center shrink-0 self-stretch rounded-[0.5rem] border border-transparent bg-[#F3F3F5] transition-all duration-200";
  const textInputStyle = "bg-transparent w-full outline-none text-[0.875rem] font-normal text-[#0A0A0A] placeholder-[#717182] -tracking-[0.15px]";
  const dropdownTriggerStyle = "w-full flex justify-between items-center cursor-pointer select-none text-[0.875rem] font-medium -tracking-[0.15px]";

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${activeTab === "reports" ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-4"} gap-[1rem] items-end`}>
        {visibleFilters.map((filter) => (
          <div
            key={filter.id}
            ref={(el) => (dropdownRefs.current[filter.id] = el)}
            className="flex flex-col items-start w-full relative"
          >
            <label className={labelStyle}>{filter.label}</label>

            {filter.type === "date" && (
              <div
                className={`${inputBaseStyle} focus-within:border-black/20 focus-within:bg-white`}
                onClick={() => setOpenDropdown(null)}
              >
                <input
                  type="date"
                  value={filters[filter.id] ?? ""}
                  onChange={(e) => handleChange(filter.id, e.target.value)}
                  className={`${textInputStyle} [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                />
              </div>
            )}

            {filter.type === "select" && (
              <div className="relative w-full">
                <div
                  className={`${inputBaseStyle} ${openDropdown === filter.id ? "bg-[#E5E7EB]" : ""
                    }`}
                  onClick={() => toggleDropdown(filter.id)}
                >
                  <div className={dropdownTriggerStyle}>
                    <span className="text-[#0A0A0A] font-medium truncate flex-1 text-left pr-2">
                      {filter.id === "hostel"
                        ? (Array.isArray(filters.hostel) && filters.hostel.length > 0
                          ? (filters.hostel.length === 1
                            ? hostelOptions.find((opt) => opt.value === filters.hostel[0])?.label
                            : `${filters.hostel.length} Hostels Selected`)
                          : "All Hostels")
                        : filters[filter.id]
                          ? filter.options.find((opt) => opt.value === filters[filter.id])?.label
                          : filter.placeholder}
                    </span>
                    <div className="shrink-0">
                      <ChevronDownIcon isOpen={openDropdown === filter.id} />
                    </div>
                  </div>
                </div>

                {openDropdown === filter.id && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-[0.5rem] border border-[rgba(0,0,0,0.1)] shadow-lg z-50 overflow-hidden py-1 flex flex-col gap-[2px] max-h-[11rem] overflow-y-auto">

                    {/* Search Input for Hostels with Icon */}
                    {filter.id === "hostel" && (
                      <div className="sticky top-0 bg-white z-10 border-b border-[rgba(0,0,0,0.05)] mb-1 relative flex items-center">
                        <input
                          type="text"
                          className="w-full bg-white pl-[0.75rem] pr-[2.5rem] py-[0.5rem] text-[0.875rem] text-[#0A0A0A] outline-none placeholder-[#717182] font-medium transition-colors hover:bg-[#F3F3F5] focus:bg-[#F3F3F5]"
                          placeholder="Search hostel..."
                          value={hostelSearchQuery}
                          onChange={(e) => setHostelSearchQuery(e.target.value)}
                          onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when typing
                        />
                        <div className="absolute right-[0.75rem] text-[#717182] pointer-events-none">
                          <SearchIconHostel />
                        </div>
                      </div>
                    )}

                    {(filter.id === "hostel"
                      ? hostelOptions.filter(opt =>
                        opt.label.toLowerCase().includes(hostelSearchQuery.toLowerCase())
                      )
                      : filter.options
                    ).map((option) => {
                      // Check if the current option is selected
                      const isSelected = filters[filter.id] === option.value || (filter.id === "hostel" && Array.isArray(filters.hostel) && filters.hostel.includes(option.value));

                      return (
                        <div
                          key={option.value}
                          onClick={() => {
                            if (filter.id === "hostel") {
                              handleHostelToggle(option.value); // toggle for hostels
                            } else {
                              handleChange(filter.id, option.value);
                            }
                          }}
                          className={`
                            px-[0.75rem] py-[0.5rem] text-[0.875rem] cursor-pointer transition-colors flex justify-between items-center
                            ${isSelected
                              ? "bg-[#E5E7EB] font-semibold text-[#0A0A0A]" // Darker grey for selected options
                              : "text-[#0A0A0A] font-medium hover:bg-[#F3F3F5] hover:text-[#0A0A0A]"
                            }
                          `}
                        >
                          <span className="truncate pr-2">{option.label}</span>
                          {/* Show Check icon if selected */}
                          {isSelected && (
                            <div className="shrink-0 text-[#0A0A0A]">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Show message if no hostels match search */}
                    {filter.id === "hostel" && hostelOptions.filter(opt => opt.label.toLowerCase().includes(hostelSearchQuery.toLowerCase())).length === 0 && (
                      <div className="px-[0.75rem] py-[0.5rem] text-[0.875rem] text-[#717182] italic text-center">
                        No hostels found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Clear Filters Button */}
        <div className="flex flex-col justify-end w-full h-auto">
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={`
              flex w-full h-[2.25rem] px-[1rem] justify-center items-center gap-[0.5rem] rounded-[0.5rem] border transition-all duration-200
              ${hasActiveFilters
                ? "border-[rgba(0,0,0,0.10)] bg-white hover:bg-gray-50 cursor-pointer text-[#0A0A0A]"
                : "border-transparent bg-gray-50 cursor-not-allowed text-gray-400"
              }
            `}
          >
            <ClearIcon disabled={!hasActiveFilters} />
            <span className="text-center text-[0.875rem] font-medium leading-[1.25rem] -tracking-[0.15px]">
              Clear Filters
            </span>
          </button>
        </div>

        {/* Refresh Data Button */}
        <div className="flex flex-col justify-end w-full h-auto">
          <button
            onClick={fetchLockData}
            disabled={isLoadingData}
            className="flex w-full h-[2.25rem] px-[1rem] justify-center items-center cursor-pointer gap-[0.5rem] rounded-[0.5rem] bg-[#030213] text-white disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-200"
          >
            <RefreshIcon className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            <span className="text-center text-[0.875rem] font-medium leading-[1.25rem] -tracking-[0.15px]">
              {isLoadingData ? 'Refreshing...' : 'Refresh Data'}
            </span>
          </button>
        </div>

        {/* Download Button */}
        {activeTab === "reports" && (
          <div className="flex flex-col justify-end w-full h-auto">
            <button
              onClick={onDownload}
              className="flex w-full h-[2.25rem] px-[1rem] justify-center items-center cursor-pointer gap-[0.5rem] rounded-[0.5rem] bg-[#030213] text-white hover:bg-[#1a1a2e] transition-all duration-200"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <DownloadIcon />
              </div>
              <span className="text-center text-[0.875rem] font-medium leading-[1.25rem] -tracking-[0.15px]">
                Download CSV
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LockFilters;