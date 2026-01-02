import { useRef, useState, useEffect } from "react";

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.9987 12.6673L3.33203 8.00065L7.9987 3.33398" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6654 8H3.33203" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OTPView = ({ email, onBack, onVerify }) => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // allow only single digit
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const verifyOTP = async (otp) => {
    return true;
  }

  const handleVerify = async () => {
    const isValid = await verifyOTP(otp.join(""));

    if (!isValid) {
      setError("Incorrect OTP");
    }

    onVerify();
  };

  const handleResend = () => {
    setError("");
    setSuccess("OTP sent successfully");

    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <>
      {/* Header Text */}
      <div className="flex flex-col items-center gap-1">
        {/* Back + Title */}
        <div className="flex h-9 items-center justify-center gap-2">
          <div
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <div className="h-4 w-4 shrink-0">
              <BackIcon />
            </div>
          </div>
          <h1 className="text-[#0A0A0A] text-2xl font-medium leading-8 tracking-[0.07px]">
            Verify Your Email
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center">
          <div className="text-[#717182] text-base font-normal leading-6 tracking-[-0.312px]">
            We've sent a 6-digit code to{" "}
          </div>
          <div className="text-[#717182] text-base font-bold leading-6 tracking-[-0.312px]">
            {email || "you@example.com"}
          </div>
        </div>
      </div>

      {/* OTP Section */}
      <div className="flex w-full max-w-[24.875rem] flex-col items-start gap-6">
        {/* OTP Inputs */}
        <div className="flex h-12 justify-center items-start gap-2 self-stretch">
          {otp.map((value, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F3F3F5] text-center text-[#0A0A0A] text-sm font-normal leading-5 tracking-[-0.15px] outline-none border border-transparent focus:shadow-[0_0_0_2.48px_rgba(161,161,161,0.41)]"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <button
            onClick={handleVerify}
            className="flex w-full items-center justify-center rounded-lg bg-[#030213] pt-[0.53rem] pb-[0.47rem] self-stretch"
          >
            <span className="text-white text-center text-sm font-medium leading-5 tracking-[-0.15px]">
              Verify Code
            </span>
          </button>

          <button
            onClick={handleResend}
            className="flex w-full items-center justify-center pt-[0.53rem] pb-[0.47rem] self-stretch"
          >
            <span className="text-[#0A0A0A] text-center text-sm font-medium leading-5 tracking-[-0.15px]">
              Resend Code
            </span>
          </button>
        </div>

        {(error || success) && (
          <span
            className={`text-sm font-medium leading-[14px] tracking-[-0.15px] ${error ? "text-red-500" : "text-[#0A0A0A]"
              }`}
          >
            {error || success}
          </span>
        )}
      </div>
    </>
  );
};

export default OTPView;
