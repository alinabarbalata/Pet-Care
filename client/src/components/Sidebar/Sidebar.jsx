import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../state/AppContext";

import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useContext(AppContext);
  const role = user?.data?.role;

  const handleDeleteAccount = async () => {
    await user.deleteAccount();
    window.location.reload();
  };
  return (
    <div className="sidebar">
      <ul className="menu">
        {(role === "owner" || role === "admin") && (
          <>
            <li>
              <Link to="/dashboard/mypets">🐾 My Pets</Link>
            </li>
            <li>
              <Link to="/dashboard/appointments">📅 Appointments</Link>
            </li>
            <li>
              <Link to="/dashboard/healthtracker">❤️ Health Tracker</Link>
            </li>
            <li>
              <Link to="/dashboard/community">💬 Community</Link>
            </li>
            <li>
              <button className="menu-button" onClick={handleDeleteAccount}>
                🗑️ Delete account
              </button>
            </li>
          </>
        )}

        {role === "vet" && (
          <>
            <li>
              <Link to="/dashboard/appointments">📅 Appointments</Link>
            </li>
            <li>
              <button className="menu-button" onClick={handleDeleteAccount}>
                🗑️ Delete account
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
