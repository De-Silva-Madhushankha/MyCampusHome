import axios from 'axios';
import data from './data.json';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';

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

import AuthProvider from './context/AuthContext';
import router from '../../server/routes/authRoutes';

axios.defaults.baseURL = data.REACT_APP_BASE_URL || 'http://localhost:4000/api';
axios.defaults.withCredentials = true;

Route

export default function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/list-property" element={<AccommodationList />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/search" element={<PropertySearchPage />} />
          <Route path="/accommodation/:id" element={<AccommodationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </AuthProvider>
  );
}