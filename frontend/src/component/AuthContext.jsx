import React, { createContext, useState, useEffect, useContext } from "react";
import AxiosInstance from "./utils/AxiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("blogsite_jwt_token"));
  const [user, setUser] = useState(null);

  // Fetch user data when token changes
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        localStorage.setItem("blogsite_jwt_token", token);
        await fetchUserData(token);
      } else {
        localStorage.removeItem("blogsite_jwt_token");
        setUser(null);
      }
    };

    fetchData();
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await AxiosInstance.post("/customer/find/user", { token });
      console.log("Fetched User Data:", response.data); // Debugging

      if (response.data && response.data.data) {
        setUser(response.data.data);
      } else {
        console.error("User data not found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateToken = async (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("blogsite_jwt_token", newToken);
      await fetchUserData(newToken);
    } else {
      localStorage.removeItem("blogsite_jwt_token");
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, token, updateToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
