import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
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
          <Link to="/dashboard/settings">⚙️ Settings</Link>
        </li>
        <li>
          <Link to="/logout" id="sidebar-logout">
            🚪 Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
