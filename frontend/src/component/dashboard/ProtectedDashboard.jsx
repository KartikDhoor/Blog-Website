import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

export default function ProtectedDashboard() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); // Use `null` to represent the initial loading state.

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("blogsite_jwt_token");

      if (!token) {
        // No token, redirect to login
        navigate("/login");
        return;
      }

      try {
        const response = await AxiosInstance.post("/customer/find/user",{}, {headers: { authorization: token }

        });

        if (response.data.success && response.data.data.userType === 1) {
          setIsAuthorized(true);
        } else {
          localStorage.removeItem("blogsite_jwt_token");
          navigate("/login"); // Explicitly redirect on failure
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("blogsite_jwt_token");
        navigate("/login");
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthorized === null) {
    // Show a loading spinner while checking authorization
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : null;
}
