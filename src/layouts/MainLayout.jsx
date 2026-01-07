import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HamburgerIcon, ReviewsIcon, DropdownIcon, UserIcon, LogoutIcon } from '../icons/svgIcons';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const [userData, setUserData] = useState(user);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const menuItems = [
    { name: 'Incentivise Reviews', href: '/', icon: <ReviewsIcon /> },
  ];

  useEffect(() => {
    if (!userData) navigate('/login', { replace: true });
  }, [userData, navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (isLoading)
    return <div>Loading...</div>;
  if (!isAuthenticated)
    return <Navigate to="/login" replace />;
  if (!userData)
    return null;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isDesktopSidebarCollapsed}
        toggleCollapse={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
        menuItems={menuItems}
        handleLogout={handleLogout}
        userData={userData}
      />

      {/* Content Area */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300
          ${isDesktopSidebarCollapsed ? 'md:ml-[4rem]' : 'md:ml-[17.5rem]'}
          ml-0
        `}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-black md:border-[rgba(0,0,0,0.10)] bg-white
          h-[4.5rem] px-4 w-full z-50 relative
          md:h-[5.5rem] md:px-6
        ">

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex flex-col items-start p-2 w-10 h-10 shrink-0 cursor-pointer"
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

            {isProfileOpen && (
              <div className="absolute right-0 top-[2rem] mt-2 z-50 flex flex-col items-start rounded-[0.625rem] border border-[#E5E7EB] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] w-[16rem] h-[7.5rem] pt-[0.5rem] px-[1px] pb-[1px]">
                <div className="flex flex-col items-start self-stretch px-4 pt-3 pb-[1px] border-b border-[#F3F4F6] mb-1">
                  <p className="text-[#101828] text-[1rem] font-medium leading-6 tracking-[-0.312px]">
                    {userData?.name || "Test"}
                  </p>
                  <p className="text-[#6A7282] text-[0.875rem] font-normal leading-5 tracking-[-0.15px] mb-2">
                    {userData?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex px-4 py-2 items-center gap-2 self-stretch hover:bg-gray-50 transition-colors cursor-pointer"
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
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;