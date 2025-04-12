import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserAuth.css";

export default function UserAuth() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // For button loading state
  const [errors, setErrors] = useState({}); // For form validation errors

  // Handle Signup Input Change
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Email Validation
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Password Validation (at least 6 characters long)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Validation for Signup Form
  const validateSignup = () => {
    if (!signupData.name) {
      alert("Name is required.");
      return false; // Stop further processing
    }
    if (!signupData.email || !validateEmail(signupData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!signupData.password || !validatePassword(signupData.password)) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true; // Validation passed
  };
  

  // Validation for Login Form
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email || !validateEmail(loginData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!loginData.password || !validatePassword(loginData.password)) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);

    // Validation before proceeding
    const newErrors = type === "signup" ? validateSignup() : validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const apiUrl = type === "signup"
      ? "http://localhost:8080/users"
      : "http://localhost:8080/users/login";

    const requestData = type === "signup"
      ? { name: signupData.name, email: signupData.email, password: signupData.password }
      : { email: loginData.email, password: loginData.password };

    try {
      const response = await axios.post(apiUrl, requestData);
      console.log(`${type === "signup" ? "Signup" : "Login"} successful:`, response.data);

      // Store user info in localStorage on successful login/signup
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      alert(`${type === "signup" ? "Signed Up" : "Logged In"} Successfully`);

      // Navigate to home page after success
      navigate("/");
    } catch (error) {
      console.error(`${type === "signup" ? "Signup" : "Login"} Error:`, error.response?.data || error.message);
      alert(error.response?.data?.error || `${type === "signup" ? "Signup" : "Login"} Failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subContainer">
      <div className="mainContainer">
        <input type="checkbox" id="chk" aria-hidden="true" className="checkboxInput" />

        {/* Signup Form */}
        <div className="signupContainer">
          <form onSubmit={(e) => handleSubmit(e, "signup")}>
            <label htmlFor="chk" aria-hidden="true" className="formLabel">Sign up</label>
            <input
              type="text"
              name="name"
              placeholder="User name"
              autoComplete="username"
              value={signupData.name}
              onChange={(e) => handleInputChange(e, "signup")}
              required
              className="textInput"
            />
            {/* {errors.name && <span className="error">{errors.name}</span>} */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={signupData.email}
              onChange={(e) => handleInputChange(e, "signup")}
              required
              className="textInput"
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={signupData.password}
              onChange={(e) => handleInputChange(e, "signup")}
              required
              className="textInput"
            />
            {errors.password && <span className="error" style={{ color: "red" }}>{errors.password}</span>}

            <button type="submit" className="submitButton" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="loginContainer">
          <form onSubmit={(e) => handleSubmit(e, "login")}>
            <label htmlFor="chk" aria-hidden="true" className="loginLabel">Login</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={loginData.email}
              onChange={(e) => handleInputChange(e, "login")}
              required
              className="textInput"
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "login")}
              required
              className="textInput"
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <button type="submit" className="submitButton" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
