import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseIconDesktop, CloseIconMobile, UserIcon, LogoutIcon } from '../icons/svgIcons';

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
              ${isCollapsed ? "rotate-180" : ""}
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
            className="flex w-full py-2 items-center gap-2 cursor-pointer"
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