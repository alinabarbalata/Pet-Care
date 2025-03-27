import React from "react";
import "./Navbar.css";

const Navbar = ({ showLoginForm }) => {
  return (
    <header>
      <h2 className="logo">Pet Care</h2>
      <nav className="navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button className="btnLogin-popup" onClick={showLoginForm}>
          Login
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
