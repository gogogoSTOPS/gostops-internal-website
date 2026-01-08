import { useState } from 'react';
import EmailView from '../components/EmailView';
import OTPView from '../components/OTPView';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useAuth();

  const [mode, setMode] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmitEmail = async () => {
    setMode("email");

    try {
      console.log("Email submitted:", email);
      const formData = new URLSearchParams();
      formData.append("email", email);

      const response = await fetch(
        `${import.meta.env.VITE_GOSTOPS_BE_BASEURL}/api/v1/send-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMode("otp");
        setError("");
        setSuccess("OTP sent successfully!");
      } else {
        setError("We're having trouble connecting. Please try again.");
      }
    } catch (error) {
      setError("We're having trouble connecting. Please try again.");
    }
  }

  const handleVerify = async (otp) => {
    if(!otp.join("").length)
    {
      setError("Enter OTP!");
      return;
    }

    try {
      const payload = { email: email, otp: otp.join("") };
      console.log(otp);
      console.log(payload);

      const response = await fetch(
        `${import.meta.env.VITE_GOSTOPS_BE_BASEURL}/api/v1/verify-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        console.log("Verified successfully");
        const userData = {
          name: "",
          email: email,
        };

        login(userData);
        navigate("/", { replace: true });
      } else {
        setError(`${jsonResponse.message}`);
      }
    } catch (error) {
      setError(error?.message || "Something wrong while verifying");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // logged in then redirect to "/"
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full shrink-0 flex-col items-center justify-center bg-[#F9FAFB] p-4">
      <div className="flex flex-col items-center justify-center gap-6 rounded-[0.875rem] border border-[rgba(0,0,0,0.10)] bg-white p-6 shadow-sm md:min-w-[28rem]">

        {mode === "email" ? (
          <EmailView
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmitEmail}
            error={error}
            setError={setError}
          />
        ) : (
          <OTPView
            email={email}
            onBack={() => setMode("email")}
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
            handleVerify={handleVerify}
            handleResend={handleSubmitEmail}
          />
        )}

      </div>
    </div>
  );
};

export default LoginPage;