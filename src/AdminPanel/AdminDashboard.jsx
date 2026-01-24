import React from 'react';
import HouseOwners from './HouseOwners';
import Support from './Support';

const AdminDashboard = () => {
  // Static Dummy Data
  const recentActivities = [
    { id: 1, user: "John Doe", action: "Aadhaar Uploaded", time: "10 mins ago", status: "Pending" },
    { id: 2, user: "Ramesh Kumar", action: "Job Posted", time: "45 mins ago", status: "Active" },
    { id: 3, user: "Sita Sharma", action: "Salary Paid", time: "1 hour ago", status: "Success" },
  ];

  const summaryCards = [
    { title: "Total House Owners", value: "124", icon: "bi-house-heart" },
    { title: "Active Staff", value: "482", icon: "bi-people" },
    { title: "Open Jobs", value: "12", icon: "bi-briefcase" },
    // { title: "Pending KYC", value: "08", icon: "bi-shield-check" },
  ];

  return (
    <div className="container-fluid p-4" style={{  minHeight: '100vh' }}>
      <style>{`
        .sahayya-btn-primary {
          background-color: #D98C7A !calm;
          border-color: #D98C7A;
          color: white;
        }
        .sahayya-btn-primary:hover {
          background-color: #c47b6a;
          border-color: #c47b6a;
          color: white;
        }
        .sahayya-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .sahayya-table thead th {
          background-color: #f8f9fa;
          color: #555;
          font-weight: 600;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        {summaryCards.map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card sahayya-card p-3">
              <div className="d-flex align-items-center">
                <div className="rounded-circle p-3 me-3" style={{ backgroundColor: '#FFF5F2', color: '#D98C7A' }}>
                  <i className={`bi ${card.icon} fs-4`}></i>
                </div>
                <div>
                  <p className="text-muted mb-0 small">{card.title}</p>
                  <h4 className="fw-bold mb-0">{card.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Recent Activities */}
        <div className="col-md-8">
          <div className=" sahayya-card p-4 ">
            <h5 className="fw-bold mb-4">Recent Activities</h5>
         {/* <Support/> */}
            {/* Pagination UI */}
            <nav className="mt-auto">
              <ul className="pagination pagination-sm justify-content-end mb-0">
                <li className="page-item disabled"><span className="page-link">Prev</span></li>
                <li className="page-item active"><span className="page-link" style={{backgroundColor: '#D98C7A', borderColor: '#D98C7A'}}>1</span></li>
                <li className="page-item"><span className="page-link text-dark">2</span></li>
                <li className="page-item"><span className="page-link text-dark">Next</span></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Today's Attendance Summary */}
        <div className="col-md-4">
          <div className="card sahayya-card p-4 h-100">
            <h5 className="fw-bold mb-4">Today's Attendance</h5>
            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
              <span>Present</span>
              <span className="fw-bold text-success">342</span>
            </div>
            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
              <span>Absent</span>
              <span className="fw-bold text-danger">45</span>
            </div>
            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
              <span>On Leave</span>
              <span className="fw-bold text-warning">12</span>
            </div>
            <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#FFF5F2', border: '1px dashed #D98C7A' }}>
              <small className="text-muted d-block">Overall Attendance Rate</small>
              <h3 className="fw-bold mb-0" style={{ color: '#D98C7A' }}>88%</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;