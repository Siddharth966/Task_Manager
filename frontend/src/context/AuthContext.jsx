import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token will be automatically added by axios interceptor
      // Fetch current user data
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    setUser(res.data);
    localStorage.setItem('token', res.data.token);
  };

  const register = async (name, email, password) => {
    await axiosInstance.post('/auth/register', { name, email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};