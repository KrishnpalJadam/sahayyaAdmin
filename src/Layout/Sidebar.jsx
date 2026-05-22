import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const loginDetails = JSON.parse(localStorage.getItem("login_details")) || {};
  const email = loginDetails.email || "admin@sahayya.com";
  const role = loginDetails.role || "Admin";

  const handleMenuClick = (path) => {
    setActivePath(path);
    onLinkClick && onLinkClick();
  };

  const navItem = (to, iconClass, label) => (
    <li className="nav-item" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`sidebar-link ${activePath === to ? "active-link" : ""}`}
      >
        <span className="sidebar-icon">
          <i className={iconClass}></i>
        </span>
        <span className="sidebar-label">{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="sidebar-wrapper">
      {/* Brand / Logo area inside sidebar */}
      {/* <div className="sidebar-brand">
        <span className="sidebar-brand-icon">S</span>
        <span className="sidebar-brand-name">Sahayya</span>
      </div> */}

      {/* Nav Menu */}
      <nav className="sidebar-nav">
        <ul className="nav flex-column gap-1">
          {navItem("/admin/dashboard", "fas fa-tachometer-alt", "Dashboard")}
          {navItem("/admin/house-owners", "fas fa-home", "House Owners")}
          {navItem("/admin/allStaff", "fas fa-users", "Staff")}
          {navItem("/admin/jobs", "fas fa-briefcase", "Job Postings")}
          {navItem("/admin/addrole", "fas fa-user-tag", "Add Role")}
          {navItem("/admin/membership", "fas fa-crown", "Membership")}
          {/* {navItem("/admin/reports", "fas fa-chart-bar", "Reports")} */}
          {navItem("/admin/settings", "fas fa-cog", "Settings")}
          {navItem("/", "fas fa-sign-out-alt", "Logout")}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer-user">
        <img
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="Admin"
          className="sidebar-avatar"
        />
        <div className="sidebar-user-info">
          <div className="sidebar-user-email">{email}</div>
          <div className="sidebar-user-role">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
