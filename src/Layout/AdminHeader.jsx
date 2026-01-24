import React from "react";
import "./Sidebar.css"; // If you have common header styles here
import logo from "../assets/Images/logo.png"
const AdminHeader = () => {
    return (
        <header className="header position-relative headernwe">
            <div className="d-flex align-items-center justify-content-between px-3 py-2">
                {/* Logo */}
                <div>
                    <div className="">
                <h5 style={{ fontWeight: "700" }}>
                    Sahayya Admin
                </h5>
            </div>
                </div>

                {/* Static User Info */}
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                        style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                    >
                        S
                    </div>
                    <div className="text-dark">
                        <div className="fw-bold">Sahayya</div>
                        <div className="small">Admin</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
