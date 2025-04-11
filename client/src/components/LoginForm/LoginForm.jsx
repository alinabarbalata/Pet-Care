import React, { useState, useContext } from "react";
import AppContext from "../../state/AppContext";
import { IonIcon } from "@ionic/react";
import { mail, lockClosed } from "ionicons/icons";
import UserStore from "../../state/stores/UserStore";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = ({ showRegisterForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const globalState = useContext(AppContext);
  const userStore = new UserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await userStore.login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error caught in handleSubmit:", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="form-box login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={mail} />
              </span>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosed} />
              </span>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="login-register">
              <p>
                Don't have an account?
                <a
                  href="#"
                  className="register-link"
                  onClick={showRegisterForm}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
