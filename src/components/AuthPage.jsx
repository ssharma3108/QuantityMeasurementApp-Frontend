import { useState } from "react";
import React from "react";
import API from "../utils/api";


function AuthPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data);

      onLoginSuccess(); // switch to dashboard
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;


    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };
  return (
    <div className="auth-page">
      <div className="container">
        <div className="left-panel">
          <div className="branding">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="ruler-icon">📏</div>
            <h1>Quantity Measurement App</h1>
            <p>Measure, Convert and Compare Units Easily</p>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <div className="tabs">
              <span
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                LOGIN
              </span>

              <span
                className={`tab ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                SIGNUP
              </span>
            </div>

            {activeTab === "login" ? (
                <form className="form" onSubmit={handleLoginSubmit}>
                  <label htmlFor="loginEmail">Email Id</label>
                  <input
                      type="email"
                      id="loginEmail"
                      placeholder="Enter your email"
                  />

                  <label htmlFor="loginPassword">Password</label>
                  <div className="password-wrapper">
                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="Enter your password"
                    />
                    <span className="eye-icon">👁️</span>
                  </div>

                  <button type="submit">Login</button>
                  <div className="divider">
                    <span>OR</span>
                  </div>
                  <button
                      type="button"
                      className="google-btn"
                      onClick={() =>
                          (window.location.href =
                              "http://localhost:8080/oauth2/authorization/google")
                      }
                  >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="google"
                        className="google-icon"
                    />
                    Continue with Google
                  </button>

                </form>
            ) : (
                <form className="form" onSubmit={handleSignupSubmit}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                      type="text"
                      id="fullName"
                      placeholder="Enter your full name"
                  />

                  <label htmlFor="signupEmail">Email Id</label>
                  <input
                      type="email"
                      id="signupEmail"
                      placeholder="Enter your email"
                  />

                  <label htmlFor="signupPassword">Password</label>
                  <div className="password-wrapper">
                    <input
                        type="password"
                        id="signupPassword"
                        placeholder="Enter your password"
                    />
                    <span className="eye-icon">👁️</span>
                  </div>

                  <button type="submit">Signup</button>

                  <div className="divider">
                    <span>OR</span>
                  </div>
                  <button
                      type="button"
                      className="google-btn"
                      onClick={() =>
                          (window.location.href =
                              "http://localhost:8080/oauth2/authorization/google")
                      }
                  >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="google"
                        className="google-icon"
                    />
                    Continue with Google
                  </button>

                </form>

            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;