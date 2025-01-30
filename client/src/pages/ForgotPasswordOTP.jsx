import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New state for success
  const [cooldown, setCooldown] = useState(false); // State for cooldown
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false); // Reset success state

    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("OTP sent to your email & PhoneNumber");
      setSuccess(true); // Set success to true
      setCooldown(true); // Start cooldown
      setEmail("");

      // Set a 10-second timeout to reset the button and hide the message
      setTimeout(() => {
        setSuccess(false);
        setCooldown(false);
      }, 10000);

      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error(error.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
        <p className="text-gray-600">
          Enter your email address below, and we'll send you a one-time password (OTP) to reset your password.
        </p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="w-full px-4 py-3 text-gray-700 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || cooldown} // Disable button during cooldown
          className={`w-full py-3 font-semibold rounded-md ${
            loading
              ? "bg-gray-400"
              : success
              ? "bg-green-600"
              : cooldown
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          {loading
            ? "Sending..."
            : success
            ? "Sent!"
            : cooldown
            ? "Please wait 10 seconds..."
            : "Send OTP"}
        </button>
      </form>

      {/* Display the waiting message during the cooldown state */}
      {cooldown && (
        <p className="mt-5 text-gray-600">
          Please wait a few seconds before trying again...
        </p>
      )}

      {/* Back to Home button */}
      <button
        onClick={() => navigate("/")} // Navigate to the home page
        className="px-4 py-2 mt-5 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100"
      >
        Back to Home
      </button>
    </section>
  );
};

export default ForgotPassword;
