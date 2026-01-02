import { useState } from "react";

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.332 2.66602H2.66536C1.92898 2.66602 1.33203 3.26297 1.33203 3.99935V11.9993C1.33203 12.7357 1.92898 13.3327 2.66536 13.3327H13.332C14.0684 13.3327 14.6654 12.7357 14.6654 11.9993V3.99935C14.6654 3.26297 14.0684 2.66602 13.332 2.66602Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.6654 4.66602L8.68536 8.46602C8.47955 8.59497 8.24158 8.66336 7.9987 8.66336C7.75582 8.66336 7.51785 8.59497 7.31203 8.46602L1.33203 4.66602" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmailView = ({ email, setEmail, onSubmit }) => {
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    onSubmit();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-[#0A0A0A] text-center text-2xl font-medium leading-8 tracking-[0.07px]">
          goSTOPS Internal Dashboard
        </h1>
        <p className="text-[#717182] text-center text-base font-normal leading-6 tracking-[-0.312px]">
          Enter your email to receive a verification code
        </p>
      </div>

      {/* Input Section */}
      <div className="flex w-full max-w-[24.875rem] flex-col items-start gap-4">
        {/* Email Input */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <label className="text-[#0A0A0A] text-sm font-medium leading-[14px] tracking-[-0.15px]">
            Email Address
          </label>
          <div
            className={`flex h-9 w-full items-center gap-2 rounded-lg px-3 border
              ${email
                ? "bg-[rgba(70,90,126,0.40)] border-[rgba(0,0,0,0)] shadow-[0_0_0_2.903px_rgba(161,161,161,0.48)]"
                : "bg-[#F3F3F5] border-transparent"
              }
          focus-within:bg-[rgba(70,90,126,0.40)]
            focus-within:border-[rgba(0,0,0,0)]
            focus-within:shadow-[0_0_0_2.903px_rgba(161,161,161,0.48)]`}
          >
            <div className="flex h-4 w-4 items-center justify-center shrink-0">
              <EmailIcon />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-transparent text-[#717182] text-sm font-normal leading-normal tracking-[-0.15px] outline-none placeholder:text-[#717182]"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center rounded-lg bg-[#030213] py-[0.5rem] px-5 md:px-[7.5rem] self-stretch"
        >
          <span className="text-white text-center text-sm font-medium leading-5 tracking-[-0.15px]">
            Send Verification Code
          </span>
        </button>

        {error && (
          <span className="text-red-500 text-sm font-medium leading-[14px] tracking-[-0.15px]">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default EmailView;