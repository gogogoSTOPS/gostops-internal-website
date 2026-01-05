import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CloseIconDesktop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIconMobile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.9908 4.99609L4.99609 14.9908" stroke="#0A0A0A" strokeWidth="1.66579" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.99609 4.99609L14.9908 14.9908" stroke="#0A0A0A" strokeWidth="1.66579" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReviewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.6667 6.66797H3.33333C2.8731 6.66797 2.5 7.04106 2.5 7.5013V9.16797C2.5 9.62821 2.8731 10.0013 3.33333 10.0013H16.6667C17.1269 10.0013 17.5 9.62821 17.5 9.16797V7.5013C17.5 7.04106 17.1269 6.66797 16.6667 6.66797Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6.66797V17.5013" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.8346 10V15.8333C15.8346 16.2754 15.659 16.6993 15.3465 17.0118C15.0339 17.3244 14.61 17.5 14.168 17.5H5.83464C5.39261 17.5 4.96868 17.3244 4.65612 17.0118C4.34356 16.6993 4.16797 16.2754 4.16797 15.8333V10" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.2513 6.66703C5.69877 6.66703 5.16886 6.44754 4.77816 6.05684C4.38746 5.66614 4.16797 5.13623 4.16797 4.5837C4.16797 4.03116 4.38746 3.50126 4.77816 3.11056C5.16886 2.71986 5.69877 2.50036 6.2513 2.50036C7.05521 2.48636 7.84299 2.87641 8.51192 3.61966C9.18084 4.36292 9.69987 5.42487 10.0013 6.66703C10.3027 5.42487 10.8218 4.36292 11.4907 3.61966C12.1596 2.87641 12.9474 2.48636 13.7513 2.50036C14.3038 2.50036 14.8337 2.71986 15.2244 3.11056C15.6151 3.50126 15.8346 4.03116 15.8346 4.5837C15.8346 5.13623 15.6151 5.66614 15.2244 6.05684C14.8337 6.44754 14.3038 6.66703 13.7513 6.66703" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12.6654 14V12.6667C12.6654 11.9594 12.3844 11.2811 11.8843 10.781C11.3842 10.281 10.7059 10 9.9987 10H5.9987C5.29145 10 4.61318 10.281 4.11308 10.781C3.61298 11.2811 3.33203 11.9594 3.33203 12.6667V14" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.9987 7.33333C9.47146 7.33333 10.6654 6.13943 10.6654 4.66667C10.6654 3.19391 9.47146 2 7.9987 2C6.52594 2 5.33203 3.19391 5.33203 4.66667C5.33203 6.13943 6.52594 7.33333 7.9987 7.33333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.668 11.3346L14.0013 8.0013L10.668 4.66797" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse, navigation, handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.50)] md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-white border-r border-[rgba(0,0,0,0.10)] transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-[4rem]' : 'md:w-[17.5rem] w-[17.5rem]'}
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center flex-shrink-0 border-b-[0.823px] border-b-[rgba(0,0,0,0.10)]
          ${isCollapsed ? 'justify-center h-[5.5rem]' : 'justify-between px-6 h-[5.5rem]'}
        `}>
          {/* Title - Hidden on Desktop Collapsed */}
          <h1 className={`text-[#101828] text-[1.25rem] font-bold leading-[1.75rem] tracking-[-0.449px]
            ${isCollapsed ? 'hidden' : 'block'}
          `}>
            GoStops Internal
          </h1>

          {/* Close/Toggle Icon */}
          <button
            onClick={toggleCollapse}
            className={`hidden md:flex flex-col cursor-pointer items-start p-2 w-9 h-9
              ${isCollapsed ? 'items-center justify-center' : ''}
            `}
          >
            <CloseIconDesktop />
          </button>

          {/* Mobile Close Icon */}
          <button
            onClick={onClose}
            className="md:hidden flex flex-col cursor-pointer items-start p-2 w-9 h-9"
          >
            <CloseIconMobile />
          </button>
        </div>

        <div className="h-[0.75rem] w-full"></div>

        {/* Nav Items */}
        <div className={`flex flex-col gap-[0.75rem] px-3
          ${isCollapsed ? 'px-0 items-center' : 'px-4'}
        `}>
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex shrink-0 rounded-[0.625rem] transition-colors
                  ${isCollapsed
                    ? 'w-full h-[2.5rem] justify-center items-center'
                    : 'w-full h-[2.5rem] px-3 py-[0.625rem] items-start gap-3'
                  }
                  ${active
                    ? 'bg-[#030213] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#0A0A0A] [&_path]:stroke-[#0A0A0A]'
                  }
                `}
              >
                <div className="w-5 h-5 shrink-0">
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <span className={`text-center font-medium text-[0.875rem] leading-5 tracking-[-0.15px]
                    ${active ? 'text-white' : 'text-[#0A0A0A]'}
                  `}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile: User Profile at Bottom */}
        <div className="md:hidden mt-auto flex w-[15.94rem] flex-col items-start gap-3 p-4">
          {/* Profile Section */}
          <div className="flex h-11 items-center gap-[0.5rem] shrink-0 self-stretch">
            <div className="flex w-8 h-8 justify-center items-center shrink-0 rounded-full bg-[#030213]">
              <UserIcon />
            </div>
            {/* User Details */}
            <div className="flex flex-col items-start">
              <p className="text-[#101828] text-[1rem] font-medium leading-6 tracking-[-0.312px]">User</p>
              <p className="text-[#6A7282] text-[0.875rem] font-normal leading-5 tracking-[-0.15px]">user@gostops.com</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex w-full py-2 items-center gap-2"
          >
            <LogoutIcon />
            <span className="text-[#364153] text-center text-[0.875rem] font-medium leading-5 tracking-[-0.15px]">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;