import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function ProtectedDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("blogsite_jwt_token");

      // No token, redirect to login
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/auth/validate-token", {
          token,
        });

        // Check if the userType is valid (admin userType is 1)
        if (response.data.isValid && response.data.userType === 1) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthorized(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthorized === null) {
    // Show a loading spinner while checking authorization
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to={isAuthorized === false ? "/" : "/login"} replace />;
};

