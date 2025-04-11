import React from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import Navbar from "../NavBar";

import { useState } from "react";

const LoginPage = () => {
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
};

export default LoginPage;
