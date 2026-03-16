import { useState, useRef, useEffect } from 'react';
import { CloseIcon, ChevronDownIcon } from '../../icons/svgIcons';

const rejectOptions = [
  { value: "Not Permitted", label: "Not Permitted" },
  { value: "You can't access", label: "You can't access" },
  { value: "Please request again", label: "Please request again" },
  { value: "Others", label: "Others (Specify below)" },
];

const durationOptions = [
  { value: "1", label: "1 minute" },
  { value: "10", label: "10 minutes" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "40", label: "40 minutes" },
  { value: "50", label: "50 minutes" },
  { value: "60", label: "60 minutes" },
];

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setIsOpen(o => !o)}
        className={`flex h-[2.25rem] px-[0.75rem] items-center shrink-0 self-stretch rounded-[0.5rem] border border-transparent bg-[#F3F3F5] transition-all duration-200 cursor-pointer ${isOpen ? 'bg-gray-200' : ''}`}
      >
        <div className="w-full flex justify-between items-center text-[0.875rem] font-medium -tracking-[0.15px]">
          <span className="text-[#0A0A0A] truncate flex-1 pr-2">{selectedLabel}</span>
          <ChevronDownIcon isOpen={isOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-[0.5rem] border border-[rgba(0,0,0,0.1)] shadow-lg z-50 py-1 flex flex-col gap-[2px] max-h-[11rem] overflow-y-auto">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`px-[0.75rem] py-[0.5rem] text-[0.875rem] cursor-pointer transition-colors ${value === option.value
                ? 'bg-[#F3F3F5] font-semibold text-[#0A0A0A]'
                : 'text-[#0A0A0A] font-medium hover:bg-[#F3F3F5]'
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ActionModal = ({ isOpen, type, onClose, onConfirm }) => {
  const [rejectReason, setRejectReason] = useState(rejectOptions[0].value);
  const [customComment, setCustomComment] = useState('');
  const [approveDuration, setApproveDuration] = useState(durationOptions[2].value);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRejectReason(rejectOptions[0].value);
      setCustomComment('');
      setApproveDuration(durationOptions[2].value);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'reject') {
      const finalReason = rejectReason === 'Others' ? customComment : rejectReason;
      onConfirm(type, { reason: finalReason });
    } else {
      onConfirm(type, { duration: approveDuration });
    }
  };

  const isRejectDisabled = type === 'reject' && rejectReason === 'Others' && !customComment.trim();

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full md:max-w-[26rem] bg-white rounded-[0.875rem] p-6 md:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
          <CloseIcon stroke="black" />
        </button>

        {type === 'reject' ? (
          <>
            <h3 className="text-[1.125rem] font-semibold text-[#0A0A0A] mb-1">Reject Access Request</h3>
            <p className="text-[0.8125rem] text-[#717182] mb-5 leading-normal pr-4">Please provide a reason for rejecting this lock/locker access request.</p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8125rem] font-medium text-[#0A0A0A]">Rejection Reason</label>
                <CustomSelect
                  value={rejectReason}
                  onChange={setRejectReason}
                  options={rejectOptions}
                  placeholder="Select a reason"
                />
              </div>

              {rejectReason === 'Others' && (
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-[0.8125rem] font-medium text-[#0A0A0A]">Custom Reason *</label>
                  <textarea
                    rows={3}
                    value={customComment}
                    onChange={(e) => setCustomComment(e.target.value)}
                    placeholder="e.g. Guest is not the primary booker, verification failed."
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-[0.5rem] text-[0.875rem] bg-[#F3F3F5] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#030213]/10 focus:border-[#030213] focus:bg-white resize-none transition-all"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-[0.625rem] mt-6">
              <button
                onClick={onClose}
                className="w-full md:w-auto px-[1rem] py-[0.5rem] md:py-[0.375rem] border border-[#E5E7EB] bg-white text-[#0A0A0A] rounded-[0.5rem] text-[0.875rem] md:text-[0.8125rem] font-medium hover:bg-[#F9FAFB] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isRejectDisabled}
                className="w-full md:w-auto px-[1rem] py-[0.5rem] md:py-[0.375rem] bg-[#DC2626] text-white rounded-[0.5rem] border border-transparent text-[0.875rem] md:text-[0.8125rem] font-medium hover:bg-[#B91C1C] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Reject Request
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[1.125rem] font-semibold text-[#0A0A0A] mb-1">Approve Access Request</h3>
            <p className="text-[0.8125rem] text-[#717182] mb-5 leading-normal pr-4">Select how long the guest should be granted access to the lock/locker.</p>

            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-[0.8125rem] font-medium text-[#0A0A0A]">Access Duration</label>
              <CustomSelect
                value={approveDuration}
                onChange={setApproveDuration}
                options={durationOptions}
                placeholder="Select duration"
              />
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-[0.625rem]">
              <button
                onClick={onClose}
                className="w-full md:w-auto px-[1rem] py-[0.5rem] md:py-[0.375rem] border border-[#E5E7EB] bg-white text-[#0A0A0A] rounded-[0.5rem] text-[0.875rem] md:text-[0.8125rem] font-medium hover:bg-[#F9FAFB] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-full md:w-auto px-[1rem] py-[0.5rem] md:py-[0.375rem] bg-[#030213] text-white rounded-[0.5rem] border border-transparent text-[0.875rem] md:text-[0.8125rem] font-medium hover:bg-[#1a1a2e] transition-colors cursor-pointer"
              >
                Grant Access
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionModal;