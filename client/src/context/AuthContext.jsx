import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Fetch current user from backend
    axios
      .get('/auth/current_user', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setLoadingAuth(false);
      })
      .catch((error) => {
        console.error('Auth Fetch Error:', error);
        setUser(null);
        setLoadingAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;