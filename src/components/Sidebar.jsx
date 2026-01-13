import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseIconDesktop, CloseIconMobile, UserIcon, LogoutIcon } from '../icons/svgIcons';

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse, menuItems, handleLogout, userData }) => {
  const location = useLocation();

  // Body Scroll Lock Logic
  useEffect(() => {
    if (isOpen && isCollapsed) {
      toggleCollapse();
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
        {/* Sidebar Header Fixed at top */}
        <div className={`flex items-center flex-shrink-0 border-b-[0.823px] border-b-[rgba(0,0,0,0.10)]
          ${isCollapsed ? 'justify-center h-[5.5rem]' : 'justify-between px-6 h-[5.5rem]'}
        `}>
          <h1 className={`text-[#101828] text-[1.25rem] font-bold leading-[1.75rem] tracking-[-0.449px]
            ${isCollapsed ? 'hidden' : 'block'}
          `}>
            GoStops Internal
          </h1>

          <button
            onClick={toggleCollapse}
            className={`hidden md:flex flex-col cursor-pointer items-center justify-center p-2 w-9 h-9 transition-transform
              ${isCollapsed ? "rotate-180" : ""}
            `}
          >
            <CloseIconDesktop />
          </button>

          <button
            onClick={onClose}
            className="md:hidden flex flex-col cursor-pointer items-start p-2 w-9 h-9"
          >
            <CloseIconMobile />
          </button>
        </div>

        {/* SCROLLABLE AREA: This container takes remaining height */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3">
          <div className={`flex flex-col gap-[0.75rem]
            ${isCollapsed ? 'px-3 items-center' : 'px-4'}
          `}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex shrink-0 rounded-[0.625rem] transition-colors
                    ${isCollapsed
                      ? 'w-full h-[2.5rem] justify-center items-center'
                      : 'w-full h-[2.5rem] px-3 py-[0.625rem] items-center gap-3'
                    }
                    ${active
                      ? 'bg-[#030213] text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#0A0A0A] [&_path]:stroke-[#0A0A0A]'
                    }
                  `}
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className={`font-medium text-[0.875rem] leading-5 tracking-[-0.15px]
                      ${active ? 'text-white' : 'text-[#0A0A0A]'}
                    `}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Profile - Fixed at bottom of sidebar */}
        <div className="md:hidden mt-auto border-t border-[#E5E7EB] bg-white flex w-full flex-col items-start gap-3 p-4">
          <div className="flex h-11 items-center gap-[0.5rem] shrink-0 self-stretch">
            <div className="flex w-8 h-8 justify-center items-center shrink-0 rounded-full bg-[#030213]">
              <UserIcon />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <p className="text-[#101828] text-[1rem] font-medium leading-6 truncate w-full">{userData?.full_name || "User Name"}</p>
              <p className="text-[#6A7282] text-[0.875rem] font-normal leading-5 truncate w-full">{userData?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full py-2 items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md"
          >
            <LogoutIcon />
            <span className="text-[#364153] text-[0.875rem] font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;