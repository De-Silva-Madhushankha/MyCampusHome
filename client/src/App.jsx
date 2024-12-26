import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';




export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>

      </Router>
  );
}