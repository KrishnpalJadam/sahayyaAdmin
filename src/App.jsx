import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./Layout/ScrollToTop";
// Auth
import MainLogin from "./Auth/MainLogin";
// Admin
import AdminDashboard from "./AdminPanel/AdminDashboard";
import MainLayout from "./Layout/MainLayout";

import HouseOwners from "./AdminPanel/HouseOwners";
import StaffManagement from "./AdminPanel/StaffManagement";
import AttendanceManagement from "./AdminPanel/AttendanceManagement";
import AadhaarKyc from "./AdminPanel/AadhaarKyc";
import JobPostings from "./AdminPanel/JobPostings";
import LeaveManagement from "./AdminPanel/LeaveManagement";
import SalaryManagement from "./AdminPanel/SalaryManagement";
import Membership from "./AdminPanel/Membership";
import Notifications from "./AdminPanel/Notifications";
import Support from "./AdminPanel/Support";


// Vendor


const AppWrapper = () => {
  const location = useLocation();

  // Conditions
  const isAdminLoginRoute = location.pathname === "/mainLogin";
  const isAdminLayoutRoute = location.pathname.startsWith("/admin/");
  const isVendorLayoutRoute = location.pathname.startsWith("/vendor/");

  return (
    <>
      <ScrollToTop />

      <Routes>
       

        {/* Admin Login */}
        <Route path="/" element={<MainLogin />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<MainLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="house-owners" element={<HouseOwners />} />
          <Route path="staffManagement" element={<StaffManagement />} />
          <Route path="attendanceManagement" element={<AttendanceManagement />} />
          <Route path="kyc" element={<AadhaarKyc />} />
          <Route path="jobs" element={<JobPostings />} />
          <Route path="leaves" element={<LeaveManagement />} />
          <Route path="membership" element={<Membership />} />
          <Route path="salary" element={<SalaryManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
        
          
        </Route>

      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
