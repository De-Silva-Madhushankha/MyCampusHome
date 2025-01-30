import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const otp = new URLSearchParams(location.search).get("otp");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (passwordError || confirmPasswordError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Password reset successful.");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>

        <div>
          <h2 className="text-sm font-medium text-gray-700">New Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            required
            placeholder="Enter your new password"
            className={`w-full px-4 py-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-700">Confirm Password</h2>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter your new password"
            className={`w-full px-4 py-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              confirmPasswordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {confirmPasswordError && (
            <p className="mt-2 text-sm text-red-500">{confirmPasswordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Resetting...
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
