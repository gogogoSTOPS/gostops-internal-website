import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// --- Header Icons ---
const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3.99609 11.9922H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.99609 5.99609H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.99609 17.9922H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12.6654 14V12.6667C12.6654 11.9594 12.3844 11.2811 11.8843 10.781C11.3842 10.281 10.7059 10 9.9987 10H5.9987C5.29145 10 4.61318 10.281 4.11308 10.781C3.61298 11.2811 3.33203 11.9594 3.33203 12.6667V14" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.9987 7.33333C9.47146 7.33333 10.6654 6.13943 10.6654 4.66667C10.6654 3.19391 9.47146 2 7.9987 2C6.52594 2 5.33203 3.19391 5.33203 4.66667C5.33203 6.13943 6.52594 7.33333 7.9987 7.33333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DropdownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.668 11.3346L14.0013 8.0013L10.668 4.66797" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Sidebar Item Icon (Reviews) ---
const ReviewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.6667 6.66797H3.33333C2.8731 6.66797 2.5 7.04106 2.5 7.5013V9.16797C2.5 9.62821 2.8731 10.0013 3.33333 10.0013H16.6667C17.1269 10.0013 17.5 9.62821 17.5 9.16797V7.5013C17.5 7.04106 17.1269 6.66797 16.6667 6.66797Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6.66797V17.5013" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.8346 10V15.8333C15.8346 16.2754 15.659 16.6993 15.3465 17.0118C15.0339 17.3244 14.61 17.5 14.168 17.5H5.83464C5.39261 17.5 4.96868 17.3244 4.65612 17.0118C4.34356 16.6993 4.16797 16.2754 4.16797 15.8333V10" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.2513 6.66703C5.69877 6.66703 5.16886 6.44754 4.77816 6.05684C4.38746 5.66614 4.16797 5.13623 4.16797 4.5837C4.16797 4.03116 4.38746 3.50126 4.77816 3.11056C5.16886 2.71986 5.69877 2.50036 6.2513 2.50036C7.05521 2.48636 7.84299 2.87641 8.51192 3.61966C9.18084 4.36292 9.69987 5.42487 10.0013 6.66703C10.3027 5.42487 10.8218 4.36292 11.4907 3.61966C12.1596 2.87641 12.9474 2.48636 13.7513 2.50036C14.3038 2.50036 14.8337 2.71986 15.2244 3.11056C15.6151 3.50126 15.8346 4.03116 15.8346 4.5837C15.8346 5.13623 15.6151 5.66614 15.2244 6.05684C14.8337 6.44754 14.3038 6.66703 13.7513 6.66703" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigation = [
    { name: 'Incentivise Reviews', href: '/', icon: <ReviewsIcon /> },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // Click Outside to Close Profile Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const handleLogout = () => {
    setUser(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isDesktopSidebarCollapsed}
        toggleCollapse={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
        navigation={navigation}
        handleLogout={handleLogout}
      />

      {/* Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${isDesktopSidebarCollapsed ? 'md:ml-[4rem]' : 'md:ml-[17.5rem]'}
          ml-0
        `}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[rgba(0,0,0,0.10)] bg-white
          h-[4.5rem] px-4 w-full
          md:h-[5.5rem] md:px-6
        ">

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex flex-col items-start p-2 w-10 h-10 shrink-0"
            >
              <HamburgerIcon />
            </button>
          </div>

          {/* Desktop Title */}
          <div className="hidden md:flex flex-col items-baseline gap-1">
            <h2 className="text-[#0A0A0A] text-[1.5rem] font-bold leading-8 tracking-[0.07px]">
              goSTOPS Internal Dashboard
            </h2>
            <span className="text-[#717182] text-[0.875rem] font-normal leading-5 tracking-[-0.15px] ml-1">
              Manage and review customer reward claims
            </span>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden">
            <h2 className="text-[#0A0A0A] text-[1.25rem] font-bold leading-7 tracking-[-0.449px]">
              goSTOPS Internal Dashboard
            </h2>
          </div>

          <div className="hidden md:flex relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex w-[5rem] h-9 justify-center items-center gap-2 cursor-pointer"
            >
              <div className="flex w-8 h-8 justify-center items-center shrink-0 rounded-full bg-[#030213]">
                <UserIcon />
              </div>
              <div className="w-4 h-4 shrink-0">
                <DropdownIcon />
              </div>
            </button>

            {/* Dropdown Modal */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[3rem] mt-2 z-50 flex flex-col items-start rounded-[0.625rem] border border-[#E5E7EB] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] w-[16rem] h-[7.5rem] pt-[0.5rem] px-[1px] pb-[1px]">
                {/* Name, Email Section */}
                <div className="flex flex-col items-start self-stretch px-4 pt-3 pb-[1px] border-b border-[#F3F4F6] mb-1">
                  <p className="text-[#101828] text-[1rem] font-medium leading-6 tracking-[-0.312px]">
                    User
                  </p>
                  <p className="text-[#6A7282] text-[0.875rem] font-normal leading-5 tracking-[-0.15px] mb-2">
                    user@gostops.com
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex px-4 py-2 items-center gap-2 self-stretch hover:bg-gray-50 transition-colors"
                >
                  <LogoutIcon />
                  <span className="text-[#364153] text-center text-[0.875rem] font-medium leading-5 tracking-[-0.15px]">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden w-10"></div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;