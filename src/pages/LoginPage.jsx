import { useState } from 'react';
import EmailView from '../components/EmailView';
import OTPView from '../components/OTPView';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  const [mode, setMode] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // logged in then redirect to "/"
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmitEmail = () => {
    console.log("Email submitted:", email);
    setMode("otp");
  }

  const handleVerify = () => {
    console.log("Verified successfully");
    const userData = {
      name: "",
      email: email,
    };

    login(userData);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen w-full shrink-0 flex-col items-center justify-center bg-[#F9FAFB] p-4">
      <div className="flex flex-col items-center justify-center gap-6 rounded-[0.875rem] border border-[rgba(0,0,0,0.10)] bg-white p-6 shadow-sm md:min-w-[28rem]">

        {mode === "email" ? (
          <EmailView
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmitEmail}
          />
        ) : (
          <OTPView
            email={email}
            onBack={() => setMode("email")}
            onVerify={handleVerify}
          />
        )}

      </div>
    </div>
  );
};

export default LoginPage;