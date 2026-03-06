import React, { useState } from 'react';

const LockRequests = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying 2FA code:", code);
    // Add your verification logic here
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-2">2FA Verification</h1>
        <p className="text-gray-600 mb-6">Please enter the security code sent to your device.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="000000"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#030213] text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Verify Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockRequests;