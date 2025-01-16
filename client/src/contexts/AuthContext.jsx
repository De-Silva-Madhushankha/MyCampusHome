import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

// Custom error class for auth errors
class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Custom axios instance for auth-related requests
export const authApi = axios.create({
    baseURL: "http://localhost:4000/api",
});

// Add auth token to requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    loading: true,
    isAuthenticated: false
  });
  const navigate = useNavigate();

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleAuthError = useCallback((error) => {
    const message = error.response?.data?.message || error.message;
    console.error("Auth error:", message);
    toast.error(message);
    return Promise.reject(new AuthError(message, error.response?.status));
  }, []);

  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        updateState({ loading: false });
        return;
      }

      const { data } = await authApi.get("/user/verify");
      updateState({
        user: data.user,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      handleLogout();
      handleAuthError(error);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new AuthError("Passwords do not match");
    }
    if (password.length < 8) {
      throw new AuthError("Password must be at least 8 characters long");
    }
  };

  const register = async (userData) => {
    try {
      validatePassword(userData.password, userData.passwordConfirmation);

      const { data } = await authApi.post("/user/register", userData);
      //localStorage.setItem("authToken", data.token);
      updateState({
        user: data.user,
        loading: false,
        isAuthenticated: true
      });
      
      navigate("/login");
      toast.success("Registration successful! Please Login!");
      return data;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await authApi.post("/user/login", credentials);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("logUser", data.user);
      // we can use user data like this
      console.log(data.user._id)
      //----
      updateState({
        user: data.user,
        loading: false,
        isAuthenticated: true
      });
      
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("logUser");
    
    updateState({
      user: null,
      loading: false,
      isAuthenticated: false
    });
    navigate("/login");
    toast.info("Logged out successfully.");
  }, [navigate]);

  const requestPasswordReset = async (email) => {
    try {
      await authApi.post("/user/reset-password-request", { email });
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authApi.post("/user/reset-password", { token, newPassword });
      toast.success("Password reset successful! Please login with your new password.");
      navigate("/login");
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const { data } = await authApi.put("/user/profile", userData);
      updateState({ user: data.user });
      toast.success("Profile updated successfully!");
      return data;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const value = {
    ...state,
    register,
    login,
    logout: handleLogout,
    requestPasswordReset,
    resetPassword,
    updateProfile
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;