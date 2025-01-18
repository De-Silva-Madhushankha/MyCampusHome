import React, { useState } from "react";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import AccountDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src="/campus-home-logo.svg"
                alt="RentNearUni Logo"
                className="h-10 filter invert"
              />
            </Link>
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-700">
                MyCampusHome
              </Link>
            </div>
          </div>

          <SearchBar />

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/list-property">
              <Button
                className="hover:bg-indigo-500 hover:text-white"
                variant="outlined"
                color="primary"
                sx={{
                  color: '#4f46e5',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: '1px solid #4f46e5',
                  padding: '8px 16px',
                  textTransform: 'none',
                }}
              >
                List an Accommodation
              </Button>

            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">
              About
            </Link>

            <Link to="/help" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">
              Help Center
            </Link>
            {!currentUser ? (
              <>
                <Link to="/sign-in" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">
                  Sign In
                </Link>
                <Link to="/sign-up" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <AccountDropdown />
                {/* <Link to="/dashboard" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">
                  <img src={currentUser.profilePicture} alt="User" className="w-9 h-9 rounded-full object-cover"></img>
                </Link> */}
                {/* <Button
                onClick={handleLogout}
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: "#e63946",
                  "&:hover": { backgroundColor: "#d62828" },
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  textTransform: "none",
                }}
              >
                Log Out
              </Button> */}
              </>

            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-800 hover:bg-gray-200"
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

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col items-start space-y-4 px-4 py-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Type in City, address, or ZIP code"
                className="block w-full pl-10 px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-grey-200"
              />
            </div>
            <div className="w-full">
              <Link to="/list-property">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#4e46e1',
                    '&:hover': {
                      backgroundColor: '#4e46e1',
                    },
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    width: '100%',
                  }}
                >
                  List an Accommodation
                </Button>
              </Link>
            </div>
            <Link to="/help" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
              Help Center
            </Link>
            {!currentUser ? (
              <>
                <Link to="/sign-in" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
                  Log In
                </Link>
                <Link to="/sign-up" className="text-sm font-medium text-gray-800 hover:underline cursor-pointer w-full text-center">
                  Register
                </Link>
              </>
            ) : (

              <AccountDropdown />
              // <Link to="/dashboard" className="text-sm flex justify-center font-medium text-gray-800 hover:underline cursor-pointer">
              //     <img src={currentUser.profilePicture} alt="User" className="w-9 h-9 rounded-full object-cover"></img>
              //   </Link>
              // <Button
              //   onClick={handleLogout}
              //   variant="contained"
              //   color="secondary"
              //   sx={{
              //     backgroundColor: "#e63946",
              //     "&:hover": { backgroundColor: "#d62828" },
              //     color: "white",
              //     fontWeight: "bold",
              //     borderRadius: "8px",
              //     padding: "8px 16px",
              //     width: "100%",
              //     textTransform: "none",
              //   }}
              // >
              //   Log Out
              // </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;