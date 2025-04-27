import React, { useState, useContext } from "react";
import AppContext from "../../state/AppContext";
import { IonIcon } from "@ionic/react";
import { mail, lockClosed } from "ionicons/icons";

import "./RegisterForm.css";

const RegisterForm = ({ showLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AppContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await user.register(email, password);
  };
  return (
    <>
      <div className="wrapper">
        <div className="form-box register">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
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
              Register
            </button>
            <div className="login-register">
              <p>
                Already have an account?
                <a href="#" className="login-link" onClick={showLoginForm}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
