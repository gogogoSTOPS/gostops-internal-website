import { useState } from 'react';
import EmailView from '../components/EmailView';
import OTPView from '../components/OTPView';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mode, setMode] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    console.log("Verified successfully");
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full shrink-0 flex-col items-center justify-center bg-[#F9FAFB] p-4">
      <div className="flex flex-col items-center justify-center gap-6 rounded-[0.875rem] border border-[rgba(0,0,0,0.10)] bg-white p-6 shadow-sm md:min-w-[28rem]">

        {mode === "email" ? (
          <EmailView
            email={email}
            setEmail={setEmail}
            onSubmit={() => setMode("otp")}
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