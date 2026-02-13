import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isMobile, onLinkClick }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const loginDetails = JSON.parse(localStorage.getItem("login_details")) || {};
  const email = loginDetails.email || "admin@sahayya.com";
  const role = loginDetails.role || "admin";

  const handleCloseSidebar = () => {
    const sidebar = document.getElementById("mobileSidebar");
    const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
    if (offcanvas) offcanvas.hide();
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const sidebar = document.getElementById("mobileSidebar");
      const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
      if (offcanvas) offcanvas.hide();
    }
    onLinkClick && onLinkClick();
  };

  const navItem = (to, iconClass, label) => (
    <li className="nav-item" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link sidebar-link ${
          activePath === to ? "active-link" : ""
        }`}
      >
        <i className={`me-2 ${iconClass}`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="sidebar d-flex flex-column  position-fixed start-0 shadow-sm" style={{height: "100vh"}}>
      {/* Mobile Close Button */}
      <div className="d-flex justify-content-between align-items-center py-2">
        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none text-black"
          onClick={handleCloseSidebar}
          style={{ padding: "4px 10px", borderRadius: "6px" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* MENU LIST */}
      <div className="flex-grow-1">
        <ul className="nav flex-column ">

          {navItem("/admin/dashboard", "fas fa-tachometer-alt", "Dashboard")}

          {navItem("/admin/house-owners", "fas fa-home", "House Owners")}

          {/* {navItem("/admin/staffManagement", "fas fa-users", "Staff")} */}

          {/* {navItem("/admin/kyc", "fas fa-id-card", "Aadhaar / KYC")} */}

          {navItem("/admin/jobs", "fas fa-briefcase", "Job Postings")}

          {/* {navItem("/admin/leaves", "fas fa-calendar-alt", "Leave Management")} */}

          {navItem("/admin/addrole", "fas fa-clock", "Add Role")}

          {navItem("/admin/salary", "fas fa-wallet", "Salary Transection")}

          {navItem("/admin/membership", "fas fa-crown", "Membership")}

          {navItem("/admin/reports", "fas fa-bell", "Reports")}

          {navItem("/", "fas fa-sign-out-alt", "Logout")}
        </ul>
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer px-3 py-3 mt-auto border-top d-flex align-items-center gap-2">
        <img
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="Admin"
          className="rounded-circle"
          width="40"
          height="40"
        />
        <div className="small">
          <div className="fw-bold">{email}</div>
          <div>{role}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
