import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 flex-col justify-center items-center p-12">
        <img 
          src="/campus-home-logo.svg" 
          alt="Logo" 
          className="h-12 mb-8 filter invert"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome back to CampusHome
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          Find your perfect student accommodation near your university
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="lg:hidden flex flex-col items-center">
            <img 
              src="/campus-home-logo.svg" 
              alt="Logo" 
              className="h-10 mb-6"
            />
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-gray-600">
              New to CampusHome?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                variant="outlined"
              />
            </div>

            <div className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{
                  py: 1.5,
                  color: 'text.primary',
                  borderColor: 'grey.300',
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                Continue with Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}