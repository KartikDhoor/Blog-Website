// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jump to top whenever route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want animation
    });
  }, [pathname]);

  return null;
}
