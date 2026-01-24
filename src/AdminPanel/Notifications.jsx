import React from 'react';

const Notifications = () => {
  // Static Dummy Data
  const notifications = [
    { id: 1, message: "New Aadhaar KYC submission received from Raju Prasad", type: "Verification", date: "2026-01-22 10:30 AM", priority: "High" },
    { id: 2, message: "Job Posting 'Full-time Cook' has reached 10 applicants", type: "System", date: "2026-01-22 09:15 AM", priority: "Medium" },
    { id: 3, message: "Subscription for Amitabh Bachchan will expire in 3 days", type: "Billing", date: "2026-01-21 04:00 PM", priority: "Low" },
    { id: 4, message: "Attendance report for December 2025 is ready for download", type: "Report", date: "2026-01-20 11:00 AM", priority: "Medium" },
    { id: 5, message: "Server maintenance scheduled for 24th Jan 2026", type: "Alert", date: "2026-01-20 08:30 AM", priority: "High" },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'text-danger';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-info';
      default: return 'text-secondary';
    }
  };

  return (
    <div className="container-fluid p-4" style={{ minHeight: '100vh' }}>
      <style>{`
        .sahayya-btn-primary {
          background-color: #D98C7A !important;
          border-color: #D98C7A !important;
          color: white !important;
        }
        .sahayya-btn-primary:hover {
          background-color: #c47b6a !important;
          border-color: #c47b6a !important;
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
          border-bottom: 2px solid #eee;
        }
        .notification-unread {
          border-left: 4px solid #D98C7A;
        }
      `}</style>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Notifications Log</h2>
        <button className="btn sahayya-btn-primary px-4">
          <i className="bi bi-check2-all me-2"></i>Mark All as Read
        </button>
      </div>

      {/* Main Container */}
      <div className="card sahayya-card p-4">
        
        {/* Search + Filter Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search notification content..." />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Types</option>
              <option value="verification">Verification</option>
              <option value="billing">Billing</option>
              <option value="alert">Alert</option>
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>

        {/* Read-Only Table */}
        <div className="table-responsive">
          <table className="table sahayya-table align-middle">
            <thead>
              <tr>
                <th>Message</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Priority</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <tr key={notif.id} className={notif.id <= 2 ? 'notification-unread' : ''}>
                  <td className="w-50">
                    <div className="fw-semibold text-dark">{notif.message}</div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">{notif.type}</span>
                  </td>
                  <td className="text-muted small">
                    {notif.date}
                  </td>
                  <td>
                    <i className={`bi bi-circle-fill me-2 small ${getPriorityClass(notif.priority)}`}></i>
                    {notif.priority}
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-light border me-1"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">Showing 5 of 24 notifications</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled"><span className="page-link">Previous</span></li>
              <li className="page-item active"><span className="page-link" style={{backgroundColor: '#D98C7A', borderColor: '#D98C7A'}}>1</span></li>
              <li className="page-item"><span className="page-link text-dark">2</span></li>
              <li className="page-item"><span className="page-link text-dark">Next</span></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Notifications;