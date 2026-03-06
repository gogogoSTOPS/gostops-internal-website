import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ClearIcon, DownloadIcon } from "../../icons/svgIcons";

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

const LockFilters = ({ filters, setFilters, hostels = [], activeTab, onDownload }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  // Filter the configuration based on the active tab
  const visibleFilters = activeTab === "pending" 
    ? FILTER_CONFIG.filter((f) => f.id === "hostel") 
    : FILTER_CONFIG;

  const hostelOptions = [
    { value: "", label: "All Hostels" },
    ...hostels.map((hostel) => ({
      value: hostel.slug || hostel, 
      label: hostel.name || hostel,
    })),
  ];

  useEffect(() => {
    setFilters((prev) => {
      const baseFilters = FILTER_CONFIG.reduce((acc, curr) => {
        if (!(curr.id in prev)) {
          acc[curr.id] = curr.id === "status" ? "all" : "";
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

  const clearFilters = () => {
    setFilters(
      FILTER_CONFIG.reduce((acc, curr) => {
        acc[curr.id] = curr.id === "status" ? "all" : ""; 
        return acc;
      }, {})
    );
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, val]) => {
    // Only check active filters based on what's visible
    const isVisible = visibleFilters.some(f => f.id === key);
    if (!isVisible) return false;
    
    if (key === "status") return val !== "all" && val !== "";
    return val !== "";
  });

  const labelStyle = "text-[#0A0A0A] text-[0.875rem] font-medium leading-[0.875rem] -tracking-[0.15px] mb-[0.5rem]";
  const inputBaseStyle = "flex w-full h-[2.25rem] px-[0.75rem] items-center shrink-0 self-stretch rounded-[0.5rem] border border-transparent bg-[#F3F3F5] transition-all duration-200";
  const textInputStyle = "bg-transparent w-full outline-none text-[0.875rem] font-normal text-[#0A0A0A] placeholder-[#717182] -tracking-[0.15px]";
  const dropdownTriggerStyle = "w-full flex justify-between items-center cursor-pointer select-none text-[0.875rem] font-medium -tracking-[0.15px]";

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${activeTab === "reports" ? "xl:grid-cols-6" : "lg:grid-cols-4"} gap-[1rem] items-end`}>
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
                  className={`${inputBaseStyle} ${
                    openDropdown === filter.id ? "bg-[#E5E7EB]" : ""
                  }`}
                  onClick={() => toggleDropdown(filter.id)}
                >
                  <div className={dropdownTriggerStyle}>
                    <span className="text-[#0A0A0A] font-medium truncate flex-1 text-left pr-2">
                      {filter.id === "hostel"
                        ? hostelOptions.find(
                            (opt) => opt.value === (filters[filter.id] || "")
                          )?.label || filter.placeholder
                        : filters[filter.id]
                        ? filter.options.find(
                            (opt) => opt.value === filters[filter.id]
                          )?.label
                        : filter.placeholder}
                    </span>
                    <div className="shrink-0">
                      <ChevronDownIcon isOpen={openDropdown === filter.id} />
                    </div>
                  </div>
                </div>

                {openDropdown === filter.id && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-[0.5rem] border border-[rgba(0,0,0,0.1)] shadow-lg z-50 overflow-hidden py-1 flex flex-col gap-[2px] max-h-[11rem] overflow-y-auto">
                    {(filter.id === "hostel"
                      ? hostelOptions
                      : filter.options
                    ).map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleChange(filter.id, option.value)}
                        className={`
                          px-[0.75rem] py-[0.5rem] text-[0.875rem] cursor-pointer transition-colors
                          ${
                            filters[filter.id] === option.value
                              ? "bg-[#F3F3F5] font-semibold text-[#0A0A0A]"
                              : "text-[#0A0A0A] font-medium hover:bg-[#F3F3F5] hover:text-[#0A0A0A]"
                          }
                        `}
                      >
                        {option.label}
                      </div>
                    ))}
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
              ${
                hasActiveFilters
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

        {/* Download Button */}
        {activeTab === "reports" && (
          <div className="flex flex-col justify-end w-full h-auto">
            <button
              onClick={onDownload}
              className="flex w-full h-[2.25rem] px-[1rem] justify-center items-center gap-[0.5rem] rounded-[0.5rem] bg-[#030213] text-white hover:bg-[#1a1a2e] transition-all duration-200"
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