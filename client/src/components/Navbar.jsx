import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import AccountDropdown from "./ProfileDropdown";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userDataString = localStorage.getItem("persist:root");
      if (userDataString) {
        // Parse the stringified JSON to an object
        const persistedData = JSON.parse(userDataString);
        // Access the user object and then the currentUser's _id
        const userData = JSON.parse(persistedData.user);
        setUserId(userData.currentUser._id);
      }
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await axios.get('/auth/signout', { withCredentials: true });
      dispatch(signOut());
      navigate("/sign-in");
      toast.info("Sign Out Successful");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center px-2 space-x-4">
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

          <div className="flex items-center space-x-4 max-h-1">
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
            <Link to="/about" className="text-sm font-medium text-gray-800 cursor-pointer hover:underline">
              About
            </Link>
            <Link to="/help" className="text-sm font-medium text-gray-800 cursor-pointer hover:underline">
              Help Center
            </Link>
            {!currentUser ? (
              <>
                <Link to="/sign-in" className="text-sm font-medium text-gray-800 cursor-pointer hover:underline">
                  Sign In
                </Link>
                <Link to="/sign-up" className="text-sm font-medium text-gray-800 cursor-pointer hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to={`/newchat/${userId}`} className="text-sm font-medium text-gray-800 cursor-pointer hover:underline">
                  Messages
                </Link>
                <AccountDropdown />
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-800 rounded-md hover:bg-gray-200"
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
        <div className="bg-white shadow-md lg:hidden">
          <div className="flex flex-col items-start px-4 py-6 space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Type in City, address, or ZIP code"
                className="block w-full px-4 py-2 pl-10 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-200"
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
            <Link to="/help" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
              Help Center
            </Link>
            
            {!currentUser ? (
              <>
                <Link to="/sign-in" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
                  Log In
                </Link>
                <Link to="/sign-up" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
                  Dashboard
                </Link>
                <Link to="/settings" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
                  Settings
                </Link>
                <Link to="/support" className="w-full text-sm font-medium text-center text-gray-800 cursor-pointer hover:underline">
                  Support
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-sm font-medium text-center text-red-500 cursor-pointer hover:underline"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
