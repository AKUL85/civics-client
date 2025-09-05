import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      // You could validate token here with API call
    }
  }, [token]);

  const loginStart = () => {
    setLoading(true);
  };

  const loginSuccess = (userData) => {
    setLoading(false);
    setIsAuthenticated(true);
    setUser(userData.user);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
  };

  const loginFailure = () => {
    setLoading(false);
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const setUserData = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    token,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUser: setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};