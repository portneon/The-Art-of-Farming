import React, { useState } from "react";
import "./LoginPage.css"; 
import Navbar from "./navbar";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (loginData.password !== loginData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      const newUser = {
        name: loginData.name,
        email: loginData.email,
        password: loginData.password,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      console.log("Registered Users:", [...users, newUser]);
      alert("Signup Successful!");
    } else {
      
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );
      if (user) {
        alert(`Welcome back, ${user.name}!`);
      } else {
        alert("Invalid credentials or user not found. Please signup first!");
      }
    }

    setLoginData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setLoginData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
     

      <div className="outer-wrapper">
        
        
        <div className="form-wrapper">
          <h1 style={{textAlign:"center"}}>{(isSignup)? " HURRAY ! WE GOT A NEW MEMBER" : "It's a pleasure to have you here again!"}</h1>
      <h1 style={{textAlign:"center"}}>{(isSignup)? " SignUp" : "Login"}</h1>
        <form onSubmit={handleSubmit} className="form-style">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={loginData.name}
              onChange={handleChange}
              className="input-style"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            className="input-style"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="input-style"
            required
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={loginData.confirmPassword}
              onChange={handleChange}
              className="input-style"
              required
            />
          )}
          <button type="submit" className="button-style">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="link-container">
            <a href="#" className="link" onClick={toggleMode}>
              {isSignup
                ? "Already have an account? Login"
                : "New user? Sign Up"}
            </a>
          </div>
        </form>
      </div>
      </div>
      </>
      
  );
};

export default LoginPage;
