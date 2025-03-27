import React from "react";
import Navbar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState } from "react";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(null);
  const showLoginForm = () => {
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setShowLogin(false);
  };
  return (
    <div>
      <Navbar showLoginForm={showLoginForm} />
      {showLogin === true && <LoginForm showRegisterForm={showRegisterForm} />}
      {showLogin === false && <RegisterForm showLoginForm={showLoginForm} />}
    </div>
  );
}

export default App;
