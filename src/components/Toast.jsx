import { useEffect } from 'react';
import { ToastIcon } from '../icons/svgIcons';

const Toast = ({ showToast, setShowToast, toastMessage }) => {

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast, setShowToast]);

  if (!showToast)
    return null;

  return (
    <div className="fixed z-100 bottom-6 left-1/2 -translate-x-1/2 w-fit w-[calc(100vw-2rem)] md:w-auto md:left-auto md:translate-x-0 md:right-6 bg-white flex items-center gap-2 px-3 md:pl-4 md:pr-14 py-4 rounded-[0.5rem] border border-[rgb(0,0,0,0.1)] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)]">
      <div className="w-5 h-5 flex-shrink-0">
        <ToastIcon />
      </div>
      <span className="text-[#0A0A0A] text-[0.8125rem] leading-[1.25rem] font-medium whitespace-nowrap">
        {toastMessage}
      </span>
    </div>
  );
};

export default Toast;