// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // FIX: Remove "/api" from the end
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Token decode error:', error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log('Login attempt to:', `${API_URL}/api/auth/login`);
      
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      
      console.log('Login response:', response.data);
      
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(userData);
      
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.detail || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};