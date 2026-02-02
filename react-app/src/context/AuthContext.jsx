// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   // FIX: Remove "/api" from the end
//   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (error) {
//         console.error('Token decode error:', error);
//         logout();
//       }
//     }
//     setLoading(false);
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       console.log('Login attempt to:', `${API_URL}/api/auth/login`);
      
//       const response = await axios.post(`${API_URL}/api/auth/login`, {
//         email,
//         password
//       });
      
//       console.log('Login response:', response.data);
      
//       const { access_token, user: userData } = response.data;
      
//       localStorage.setItem('token', access_token);
//       setToken(access_token);
//       setUser(userData);
      
//       // Set default axios header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
//       toast.success('Login successful!');
//       return { success: true };
//     } catch (error) {
//       console.error('Login error:', error);
//       console.error('Error details:', error.response?.data);
//       toast.error(error.response?.data?.detail || 'Login failed');
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setToken(null);
//     setUser(null);
//     toast.success('Logged out successfully');
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };



// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { API } from '../services/api';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  // Load user profile when token changes
  useEffect(() => {
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUserProfile = async () => {
    try {
      // Try to decode token first
      const decoded = jwtDecode(token);
      
      // Then fetch user profile from API
      const response = await API.auth.getProfile();
      
      setUser({
        ...decoded,
        ...response.data,
      });
      
      // Load permissions based on role
      loadPermissions(decoded.role || response.data.role);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // If token is invalid, clear it
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const loadPermissions = (role) => {
    const rolePermissions = {
      admin: [
        'view_dashboard',
        'manage_alerts',
        'manage_violations',
        'manage_evidence',
        'manage_reports',
        'manage_cameras',
        'manage_users',
        'system_settings'
      ],
      operator: [
        'view_dashboard',
        'manage_alerts',
        'view_violations',
        'manage_evidence',
        'view_reports',
        'view_cameras'
      ],
      viewer: [
        'view_dashboard',
        'view_alerts',
        'view_violations',
        'view_evidence',
        'view_reports'
      ]
    };
    
    setPermissions(rolePermissions[role] || rolePermissions.viewer);
  };

  // const login = async (email, password) => {
  //   try {
  //     const response = await API.auth.login({ email, password });
  //     const { access_token, refresh_token, user: userData } = response.data;
      
  //     // Store tokens
  //     localStorage.setItem('token', access_token);
  //     localStorage.setItem('refreshToken', refresh_token);
      
  //     // Set token in state (this triggers useEffect to load profile)
  //     setToken(access_token);
      
  //     toast.success('Login successful!');
  //     return { success: true, data: userData };
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.detail || error.message || 'Login failed';
  //     toast.error(errorMessage);
  //     return { success: false, error: errorMessage };
  //   }
  // };
// In AuthContext.jsx
const login = async (email, password) => {
  try {
    const response = await API.auth.login({ email, password });
    const { access_token, refresh_token, user: userData } = response.data;
    
    // Store tokens
    localStorage.setItem('token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    
    // Decode token to get user info
    const decoded = jwtDecode(access_token);
    
    // Set user immediately
    setUser({
      ...decoded,
      ...userData,
    });
    
    // Load permissions
    loadPermissions(decoded.role || userData.role);
    
    // IMPORTANT: Update token state to trigger useEffect
    setToken(access_token);
    
    toast.success('Login successful!');
    return { success: true, data: userData };
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message || 'Login failed';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};
  const register = async (userData) => {
    try {
      const response = await API.auth.register(userData);
      toast.success('Registration successful! Please login.');
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Reset state
    setToken(null);
    setUser(null);
    setPermissions([]);
    
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const updateProfile = async (data) => {
    try {
      const response = await API.auth.updateProfile(data);
      setUser(prev => ({ ...prev, ...response.data }));
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false };
    }
  };

  const resetPassword = async (data) => {
    try {
      await API.auth.resetPassword(data);
      toast.success('Password reset successful');
      return { success: true };
    } catch (error) {
      toast.error('Password reset failed');
      return { success: false };
    }
  };

  const value = {
    user,
    token,
    loading,
    permissions,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    hasPermission,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};