import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const user = users.find((user) => user.username === username);

    if (user) {
      if (user.password === password) {
        navigate(`/auth/${username}`);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
      setError("User does not exist. Please sign up.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError("User already exists. Please log in.");
    } else {
      dispatch(addUser({ username, password }));
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <h1>{window.location.pathname === "/signup" ? "Sign Up" : "Login"}</h1>
      <form
        onSubmit={
          window.location.pathname === "/signup" ? handleSignup : handleLogin
        }
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">
          {window.location.pathname === "/signup" ? "Sign Up" : "Login"}
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(window.location.pathname === "/signup" ? "/" : "/signup")
          }
        >
          {window.location.pathname === "/signup" ? "Back to Login" : "Sign Up"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AuthPage;
