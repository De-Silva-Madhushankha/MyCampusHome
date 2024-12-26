import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src="/campus-home-logo.svg" alt="RentNearUni Logo" className={`h-10 ${scrolled ? 'filter invert' : ''}`} />
            </Link>
            <div className="flex-shrink-0">
              <Link
                to="/"
                className={`text-2xl font-bold ${scrolled ? "text-gray-700" : "text-white"}`}>
                CampusHome
              </Link>
            </div>
          </div>

          {scrolled && (
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="text-gray-700" />
                </div>
                <input
                  type="text"
                  placeholder="City, address, or ZIP code"
                  className="block w-full pl-10 px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          )}

          <div className="hidden lg:flex items-center space-x-4">
          
            <Button
              href="/list-property"
              variant="outlined"
              color="primary"
              sx={{
                color: scrolled ? "#1976d2" : "white",
                fontWeight: 'bold',
                borderRadius: '8px',
                border: scrolled ? '1.5px solid #1976d2' : '1.5px solid white',
                padding: '5.5px 13.5px',
                textTransform: 'none',
              }}
            >
              List a Property
            </Button>
            <Link
              to="/help-center"
              className={`text-sm font-medium ${scrolled ? "text-gray-800" : "text-white"
                } hover:underline cursor-pointer`}
            >
              Help Center
            </Link>
            <Link
              to="/login"
              className={`text-sm font-medium ${scrolled ? "text-gray-800" : "text-white"
                } hover:underline cursor-pointer`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={`text-sm font-medium ${scrolled ? "text-gray-800" : "text-white"
                } hover:underline cursor-pointer`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-md ${scrolled
                ? "text-gray-800 hover:bg-gray-200"
                : "text-white hover:bg-gray-800"
                }`}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col items-start space-y-4 px-4 py-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="City, address, or ZIP code"
                className="block w-full pl-10 px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-grey-200"
              />
            </div>
            <div className="w-full">
              <Button
                href="/list-property"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#1976d2', // Blue color
                  '&:hover': {
                    backgroundColor: '#1565c0', // Darker blue on hover
                  },
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  textTransform: 'none',
                  width: '100%',
                }}
              >
                List a Property
              </Button>
            </div>
            <Link
              to="/help-center"
              className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
              Help Center
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;