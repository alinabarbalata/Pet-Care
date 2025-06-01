import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import AppContext from "../../state/AppContext";

const Navbar = ({ showLoginForm }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    user.logout();
    navigate("/");
  };
  return (
    <header>
      <h2 className="logo">Pet Care</h2>
      <nav className="navigation">
        <a onClick={() => navigate("/dashboard")}>Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        {user.data.token ? (
          <button className="btnLogin-popup" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="btnLogin-popup" onClick={showLoginForm}>
            LOGIN
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
