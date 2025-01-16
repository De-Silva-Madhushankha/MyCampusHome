// import axios from 'axios';
// import data from './data.json';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';

import ScrollToTop from './components/scrolltop';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HelpCenter from './pages/HelpCenter';
import { NotFound } from './pages/NotFound';
import AccommodationList from './pages/AccommodationListing';
import FAQ from './pages/FAQ';
import PropertySearch from './pages/SearchResult';
import Accommodation from './pages/Accommodation';
import Profile from './pages/Profile';

//axios.defaults.baseURL = data.REACT_APP_BASE_URL || 'http://localhost:4000/api';

export default function App() {
  return (
    <>
    <ScrollToTop/>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/accommodation/:id" element={<Accommodation />} />
        <Route path="/*" element={<NotFound />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/list-property" element={<AccommodationList />} />

          {/*
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
               */}
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}