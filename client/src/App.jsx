import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import HelpCenter from './pages/HelpCenter';
import { NotFound } from './pages/NotFoundPage';
import AccommodationList from './pages/AccommodationListing';
import FAQ from './pages/FAQ';
import PropertySearchPage from './pages/SearchResultPage';




export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/list-property" element={<AccommodationList />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/search" element={<PropertySearchPage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>

      </Router>
  );
}