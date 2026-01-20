import { useState } from "react";
import { DropdownIcon, CloseIcon } from "../icons/svgIcons";
import { useAuth } from "../context/AuthContext";

const Popup = ({ mode, setShowPopup, claimId, uuid, setShowToast, setToastMessage, onSuccess }) => {
  const { user } = useAuth();
  const baseUrl = import.meta.env.VITE_GOSTOPS_BE_BASEURL;

  const rejectOptions = [
    "We are unable to see the review on the associated platform.",
    "Booking details do not match the submitted review.",
    "This review has already been submitted earlier.",
    "The review is invalid or incomplete.",
    "Others",
  ];

  const [openDropdown, setOpenDropdown] = useState(false);
  const [rejectReason, setRejectReason] = useState(rejectOptions[0]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    if (!isLoading) {
      setShowPopup(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!uuid) {
      setError("Claim UUID is missing");
      return;
    }

    if (!user) {
      setError("User information is missing. Please login again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let payload;
      let url = `${baseUrl}/api/core/v1/incentive-claim/${uuid}/status/`;

      // Base payload with user details for tracking
      const basePayload = {
        employee_id: user.employee_id || null,
        employee_name: user.full_name || "",
        employee_email: user.email || "",
      };

      if (mode === "accept") {
        payload = {
          ...basePayload,
          action: "accept",
        };
        if (comment.trim()) {
          payload.comments = comment.trim();
        }
      } else {
        // For reject, use custom reason if "Others" is selected
        const finalRejectionReason = rejectReason === "Others" && comment.trim()
          ? comment.trim()
          : rejectReason;

        payload = {
          ...basePayload,
          action: "reject",
          rejection_reason: finalRejectionReason,
          comments: comment.trim() || "",
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setShowToast(true);
        setToastMessage(
          mode === "accept"
            ? result.message || `Claim ${claimId} has been accepted`
            : result.message || `Claim ${claimId} has been rejected`
        );

        // Call success callback to refresh data
        if (onSuccess) {
          onSuccess();
        }

        // Close popup after successful action
        setShowPopup(false);
      } else {
        setError(result.message || `Failed to ${mode === "accept" ? "accept" : "reject"} claim. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${mode === "accept" ? "accepting" : "rejecting"} claim:`, error);
      setError(`Failed to ${mode === "accept" ? "accept" : "reject"} claim. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 md:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />
      {/* Viewer */}
      <div className="flex flex-col relative z-10 w-full md:max-w-[50%] max-h-[80vh] md:max-h-[90vh] bg-white rounded-2xl p-6 gap-8">
        {/* Close icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-4 h-4 flex items-center justify-center cursor-pointer"
        >
          <CloseIcon stroke={"black"} />
        </button>

        {/* Text container */}
        <div className="relative flex flex-col gap-2 text-center lg:items-start">
          <span className="text-[#0A0A0A] text-[1.125rem] leading-[1.125rem] font-semibold">
            {mode === "accept" ? "Accept" : "Reject"} Claim
          </span>

          <span className="text-[#717182] text-[0.875rem] leading-[1.25rem] font-normal">
            {mode === "accept"
              ? "Confirm acceptance of"
              : "Please select a reason for rejecting"}{" "}
            this claim ({claimId})
          </span>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-4">
          {/* Select reject reason */}
          {mode === "reject" && (
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-[#0A0A0A] text-[0.875rem] leading-[0.875rem] font-medium"
              >
                Rejection Reason *
              </label>

              {/* CUSTOM SELECT */}
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(prev => !prev)}
                  className="
                    w-full h-9
                    px-3
                    flex items-center justify-between
                    rounded-[0.5rem]
                    bg-[#F3F3F5]
                    border border-transparent
                    text-left
                    focus:outline-none
                    focus:shadow-[0_0_0_2.902px_rgba(161,161,161,0.48)]
                  "
                >
                  <span
                    className="
                    text-[#0A0A0A] text-[0.875rem] font-medium
                      leading-[1.25rem] tracking-[-0.15px]
                      break-words text-left
                      truncate
                    "
                  >
                    {rejectReason}
                  </span>

                  {/* Icon */}
                  <span className="ml-2 shrink-0">
                    <DropdownIcon />
                  </span>
                </button>

                {/* Dropdown Menu */}
                {openDropdown && (
                  <div
                    className="
                      absolute top-[calc(100%+4px)] left-0 w-full
                      bg-white
                      rounded-[0.5rem]
                      border border-[rgba(0,0,0,0.1)]
                      shadow-lg
                      z-50
                      py-1
                      flex flex-col gap-[2px]
                      max-h-[11rem]
                      overflow-y-auto
                    "
                  >
                    {rejectOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setRejectReason(option);
                          setOpenDropdown(false);
                        }}
                        className={`
                          px-3 py-2
                          text-[0.875rem]
                          leading-[1.25rem]
                          break-words
                          cursor-pointer
                          transition-colors
                          ${rejectReason === option
                            ? "bg-[#F3F3F5] font-semibold text-[#0A0A0A]"
                            : "text-[#0A0A0A] font-medium hover:bg-[#F3F3F5]"
                          }
                        `}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other Custom Reject area */}
          {rejectReason === "Others" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="customReason"
                className="text-[#0A0A0A] text-[0.875rem] leading-[0.875rem] font-medium"
              >
                Custom Reason *
              </label>
              <textarea
                id="customReason"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={"Please specify the reason..."}
                className="
                  w-full px-3 py-2
                  rounded-[8px]
                  border border-transparent
                  bg-[#F3F3F5]
                  text-[#0A0A0A] text-[0.875rem] leading-[1.25rem] font-normal
                  resize-none
                  focus:outline-none
                  focus:ring-0
                  focus:shadow-[0_0_0_2.902px_rgba(161,161,161,0.48)]
                "
                disabled={isLoading}
              />
            </div>
          )}

          {/* Text area */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reason"
              className="text-[#0A0A0A] text-[0.875rem] leading-[0.875rem] font-medium"
            >
              {mode === "accept" ? "Comment (Optional)" : "Additional Comment (Optional)"}
            </label>
            <textarea
              id="reason"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                mode === "accept"
                  ? "Add any notes about this acceptance..."
                  : "Add any additional notes..."
              }
              className="
                w-full px-3 py-2
                rounded-[8px]
                border border-transparent
                bg-[#F3F3F5]
                text-[#0A0A0A] text-[0.875rem] leading-[1.25rem] font-normal
                resize-none
                focus:outline-none
                focus:ring-0
                focus:shadow-[0_0_0_2.902px_rgba(161,161,161,0.48)]
              "
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex w-full p-2 bg-[#FEF2F2] rounded-[0.5rem] border-[0.823px] md:border border-[#FFC9C9]">
            <span className="text-[#82181A] text-[0.75rem] leading-[1rem] font-normal">
              {error}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-2">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex items-center justify-center cursor-pointer w-full md:w-auto bg-[#FFF] px-4 py-2 rounded-[0.5rem] border border-[rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-black text-[0.875rem] leading-[1.25rem] font-medium">
              Cancel
            </span>
          </button>

          <button
            onClick={handleConfirmAction}
            disabled={isLoading || (mode === "reject" && rejectReason === "Others" && !comment.trim())}
            className={`flex items-center justify-center cursor-pointer w-full md:w-auto ${mode === "accept" ? "bg-[#008000]" : "bg-[#D4183D]"} px-4 py-2 rounded-[0.5rem] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <span className="text-white text-[0.875rem] leading-[1.25rem] font-medium">
                Processing...
              </span>
            ) : (
              <span className="text-white text-[0.875rem] leading-[1.25rem] font-medium">
                Confirm {mode === "accept" ? "Acceptance" : "Rejection"}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Popup;