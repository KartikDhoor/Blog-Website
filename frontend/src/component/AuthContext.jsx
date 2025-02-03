import React, { createContext, useState, useEffect, useContext } from 'react';
import AxiosInstance from './utils/AxiosInstance';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('blogsite_jwt_token'));
  const [user, setUser] = useState(null);

  // Fetch user data when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('blogsite_jwt_token', token);
      fetchUserData(token);
    } else {
      localStorage.removeItem('blogsite_jwt_token');
      setUser(null);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await AxiosInstance.post('/customer/find/user', {token},);
      const data = await response.data.data;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ user, token, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
