import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../style/LoginPage.css";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/reset-password", form);
      setMessage(res.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <h1>Reset Password</h1>
          <p className="login-subtitle">Enter your email, name, and new password</p>

          {message && <div className="login-success">{message}</div>}
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <input
                ref={emailRef}
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">Reset Password</button>
          </form>
        </div>

        <div className="login-visual-section">
          <div className="gradient-overlay"></div>
          <div className="login-message">
            <h2>Recover access</h2>
            <p>and get back on track</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
