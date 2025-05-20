import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../utils/api";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      if (response.data.status) {
        if (response.data.status) {
          Cookies.set("admin-username", email, { expires: 1 }); // expires in 1 day
          navigate("/admin");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during login");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin Portal</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="email">Email Address</label>
            <div className="admin-input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-with-icon">
              <FaLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="admin-login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" disabled={loading} />
              <label htmlFor="remember">Remember me</label>
            </div>
            {/* <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a> */}
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? <span className="login-spinner"></span> : "Sign In"}
          </button>
        </form>

        {/* <div className="admin-login-footer">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="signup-link">
              Request access
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
