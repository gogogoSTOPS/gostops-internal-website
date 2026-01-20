import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ClearIcon, SearchIcon } from "../icons/svgIcons";

// Filters Configuration
const FILTER_CONFIG = [
  {
    id: "hostelName",
    label: "Search by Hostel Name",
    type: "select",
    placeholder: "Select hostel...",
  },
  {
    id: "searchField",
    label: "Search Field",
    type: "select",
    placeholder: "All Fields",
    options: [
      { value: "all", label: "All Fields" },
      { value: "name", label: "Name" },
      { value: "claimId", label: "Claim ID" },
      { value: "otaID", label: "Ota ID" },
      { value: "bookingId", label: "Booking ID" },
      { value: "phone", label: "Phone Number" },
      { value: "email", label: "Email" },
    ],
  },
  {
    id: "searchValue",
    label: "Search Value",
    type: "text",
    placeholder: "Search by all fields...",
    icon: <SearchIcon />,
  },
  {
    id: "timePeriod",
    label: "Time Period",
    type: "select",
    placeholder: "All Time",
    options: [
      { value: "all", label: "All Time" },
      { value: "24hrs", label: "Last 24 Hours" },
      { value: "7days", label: "Last 7 Days" },
      { value: "30days", label: "Last 30 Days" },
    ],
  },
];

const Filters = ({ filters, setFilters, hostels = [] }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const hostelOptions = [
    { value: "", label: "All Hostels" },
    ...hostels.map((hostel) => ({
      value: hostel.slug,
      label: hostel.name,
    })),
  ];

  useEffect(() => {
    setFilters((prev) => {
      const baseFilters = FILTER_CONFIG.reduce((acc, curr) => {
        if (!(curr.id in prev)) {
          acc[curr.id] = "";
        } else {
          acc[curr.id] = prev[curr.id];
        }
        return acc;
      }, {});

      if (!prev.claimStatus) {
        baseFilters.claimStatus = "pending";
      } else {
        baseFilters.claimStatus = prev.claimStatus;
      }

      return baseFilters;
    });
  }, []);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If no dropdown is open, do nothing
      if (!openDropdown) return;

      // Get the specific DOM element for the currently open filter
      const currentActiveRef = dropdownRefs.current[openDropdown];

      // If the click is NOT inside the currently open filter's container, close it
      if (currentActiveRef && !currentActiveRef.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]); // Dependent on openDropdown state

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setFilters(
      FILTER_CONFIG.reduce((acc, curr) => ({ ...acc, [curr.id]: "" }), {})
    );
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const hasActiveFilters = Object.values(filters).some((val) => val !== "");

  const labelStyle =
    "text-[#0A0A0A] text-[0.875rem] font-medium leading-[0.875rem] -tracking-[0.15px]";
  const inputBaseStyle =
    "flex h-[2.25rem] px-[0.75rem] items-center shrink-0 self-stretch rounded-[0.5rem] border border-transparent bg-[#F3F3F5] transition-all duration-200";
  const textInputStyle =
    "bg-transparent w-full outline-none text-[0.875rem] font-normal text-[#0A0A0A] placeholder-[#717182] -tracking-[0.15px]";
  const dropdownTriggerStyle =
    "w-full flex justify-between items-center cursor-pointer select-none text-[0.875rem] font-medium -tracking-[0.15px]";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] items-end">
        {FILTER_CONFIG.map((filter) => (
          <div
            key={filter.id}
            // Assign a specific ref to this filter item based on its ID
            ref={(el) => (dropdownRefs.current[filter.id] = el)}
            className="flex flex-col items-start gap-[0.5rem] w-full relative"
          >
            <label className={labelStyle}>{filter.label}</label>

            {/* TEXT INPUT */}
            {filter.type === "text" && (
              // Added onClick to text input to ensure other dropdowns close if this is clicked
              <div
                className={`${inputBaseStyle} gap-[0.75rem] focus-within:border-black/20 focus-within:bg-white`}
                onClick={() => setOpenDropdown(null)}
              >
                {filter?.icon}
                <input
                  type="text"
                  value={filters[filter.id] ?? ""}
                  onChange={(e) => handleChange(filter.id, e.target.value)}
                  placeholder={filter.placeholder}
                  className={textInputStyle}
                />
              </div>
            )}

            {/* CUSTOM SELECT DROPDOWN */}
            {filter.type === "select" && (
              <div className="relative w-full">
                {/* Trigger Button */}
                <div
                  className={`${inputBaseStyle} ${
                    openDropdown === filter.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => toggleDropdown(filter.id)}
                >
                  <div className={dropdownTriggerStyle}>
                    <span className="text-[#0A0A0A] font-medium truncate flex-1 text-left pr-2">
                      {filter.id === "hostelName"
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

                {/* Dropdown Menu */}
                {openDropdown === filter.id && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-[0.5rem] border border-[rgba(0,0,0,0.1)] shadow-lg z-50 overflow-hidden py-1 flex flex-col gap-[2px] max-h-[11rem] overflow-y-auto">
                    {(filter.id === "hostelName"
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

        {/* CLEAR FILTERS BUTTON */}
        <div className="flex flex-col justify-end w-full h-[3.625rem]">
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={`
              flex w-full h-[2.25rem] px-[1rem] justify-center items-center gap-[1.0625rem] rounded-[0.5rem] border transition-all duration-200
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
      </div>
    </div>
  );
};

export default Filters;
