import axios from 'axios';
import data from './data.json';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';

import ScrollToTop from './components/scrolltop';

import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import HelpCenter from './pages/HelpCenter';
import { NotFound } from './pages/NotFoundPage';
import AccommodationList from './pages/AccommodationListing';
import FAQ from './pages/FAQ';
import PropertySearchPage from './pages/SearchResultPage';
import AccommodationPage from './pages/AccommodationPage';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = data.REACT_APP_BASE_URL || 'http://localhost:7000/api';

export default function App() {
  return (
    <>
    <ScrollToTop/>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/search" element={<PropertySearchPage />} />
        <Route path="/accommodation/:id" element={<AccommodationPage />} />
        <Route path="*" element={<NotFound />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
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