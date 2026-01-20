import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EmailIcon, PasswordIcon } from '../icons/svgIcons';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    const baseUrl = import.meta.env.VITE_GOSTOPS_BE_BASEURL;
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoadingLogin(true);

    try {
      const inputData = {
        "username": email,
        "password": password
      }
    
      const response = await fetch(
        `${baseUrl}/api/employee/v2/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data) {
        // Login successful - extract user data from the new API response structure
        const userData = {
          email: email,
          full_name: data.data.full_name || "",
          employee_id: data.data.employee_id || null,
          mobile: data.data.mobile || "",
          token: data.data.token?.access || "",
          refresh_token: data.data.token?.refresh || "",
          permissions: data.data.permissions || {},
          hostels_can_access: data.data.hostels_can_access || [],
        };

        login(userData);
        navigate("/", { replace: true });
      } else {
        setError(data.message || data.error || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("We're having trouble connecting. Please try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F9FAFB]">
        <div className="text-[#0A0A0A] text-base font-medium">Loading...</div>
      </div>
    );
  }

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full shrink-0 flex-col items-center justify-center bg-[#F9FAFB] p-4">
      <div className="flex flex-col items-center justify-center gap-6 rounded-[0.875rem] border border-[rgba(0,0,0,0.10)] bg-white p-6 shadow-sm md:min-w-[28rem]">
        {/* Header */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-[#0A0A0A] text-center text-2xl font-medium leading-8 tracking-[0.07px]">
            goSTOPS CX Dashboard
          </h1>
          <p className="text-[#717182] text-center text-base font-normal leading-6 tracking-[-0.312px]">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex w-full max-w-[24.875rem] flex-col items-start gap-4">
          {/* Email Input */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#0A0A0A] text-sm font-medium leading-[0.875rem] tracking-[-0.15px]">
              Email Address
            </label>
            <div
              className={`flex h-9 w-full items-center gap-2 rounded-lg px-3 bg-[#F3F3F5] focus-within:border-[rgba(0,0,0,0)] focus-within:shadow-[0_0_0_2.903px_rgba(161,161,161,0.48)]`}
            >
              <div className="flex h-4 w-4 items-center justify-center shrink-0">
                <EmailIcon />
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                className="w-full text-[#717182] text-sm font-normal leading-normal tracking-[-0.15px] outline-none placeholder:text-[#717182]"
                disabled={isLoadingLogin}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#0A0A0A] text-sm font-medium leading-[0.875rem] tracking-[-0.15px]">
              Password
            </label>
            <div
              className={`flex h-9 w-full items-center gap-2 rounded-lg px-3 border
                ${password
                  ? "border-[rgba(0,0,0,0)] shadow-[0_0_0_2.903px_rgba(161,161,161,0.48)]"
                  : "bg-[#F3F3F5] border-transparent"
                }
              
                  focus-within:border-[rgba(0,0,0,0)]
                  focus-within:shadow-[0_0_0_2.903px_rgba(161,161,161,0.48)]
              `}
            >
              <div className="flex h-4 w-4 items-center justify-center shrink-0">
                <PasswordIcon />
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full bg-transparent text-[#717182] text-sm font-normal leading-normal tracking-[-0.15px] outline-none placeholder:text-[#717182]"
                disabled={isLoadingLogin}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <span className="text-red-500 text-sm font-medium leading-[0.875rem] tracking-[-0.15px]">
              {error}
            </span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoadingLogin}
            className="flex w-full items-center justify-center rounded-lg bg-[#030213] py-[0.5rem] px-5 md:px-[7.5rem] self-stretch cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-white text-center text-sm font-medium leading-5 tracking-[-0.15px]">
              {isLoadingLogin ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;