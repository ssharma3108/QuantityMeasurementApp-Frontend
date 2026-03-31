import { useState, useEffect } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 🔥 Handle Google OAuth redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      // remove token from URL
      window.history.replaceState({}, document.title, "/");
    }

    // 🔥 Auto login if token exists
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <Routes>

          {/* Login */}
          <Route
              path="/"
              element={
                isLoggedIn ? (
                    <Dashboard onLogout={handleLogout} />
                ) : (
                    <AuthPage onLoginSuccess={handleLoginSuccess} />
                )
              }
          />

          {/* History Page */}
          <Route
              path="/history"
              element={
                isLoggedIn ? (
                    <HistoryPage />
                ) : (
                    <Navigate to="/" />
                )
              }
          />

        </Routes>
      </Router>
  );
}

export default App;