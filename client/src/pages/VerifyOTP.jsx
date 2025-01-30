import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("OTP verified successfully.");
      navigate(`/reset-password-otp?email=${encodeURIComponent(email)}&otp=${otp}`);
    } catch (error) {
      toast.error(error.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">Verify OTP</h1>
        <p className="text-sm text-center text-gray-600">
          Enter the OTP sent to your email address.
        </p>
        
        <div className="relative">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
            className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/forgot-password-otp")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to Forgot Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default VerifyOTP;
