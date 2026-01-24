import React from 'react';

const Membership = () => {
  // Static Dummy Data
  const subscribers = [
    { id: 1, user: "Amitabh Bachchan", plan: "Professional", price: "₹999/mo", expiry: "2026-05-12", status: "Active" },
    { id: 2, user: "Deepika Padukone", plan: "Professional", price: "₹999/mo", expiry: "2026-08-20", status: "Active" },
    { id: 3, user: "Ranbir Kapoor", plan: "Free", price: "₹0/mo", expiry: "-", status: "Active" },
  ];

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
        .plan-card-pro {
          border: 2px solid #D98C7A;
          background-color: white;
        }
      `}</style>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Membership Plans</h2>
        <button className="btn sahayya-btn-primary px-4">
          <i className="bi bi-gear-fill me-2"></i>Manage Plan Settings
        </button>
      </div>

      {/* Plan Cards Row */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card sahayya-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="fw-bold mb-1">Free Tier</h4>
                <p className="text-muted small">For casual household needs</p>
              </div>
              <h3 className="fw-bold">₹0<small className="fs-6 text-muted">/mo</small></h3>
            </div>
            <ul className="list-unstyled mb-4">
              <li className="mb-2 small"><i className="bi bi-check2 text-success me-2"></i> Up to 2 Staff Members</li>
              <li className="mb-2 small"><i className="bi bi-check2 text-success me-2"></i> Basic KYC Check</li>
              <li className="mb-2 small text-muted text-decoration-line-through"><i className="bi bi-x text-danger me-2"></i> Priority Job Posting</li>
            </ul>
            <button className="btn btn-outline-secondary w-100 mt-auto" disabled>Default Plan</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card sahayya-card p-4 h-100 plan-card-pro">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="fw-bold mb-1" style={{ color: '#D98C7A' }}>Professional</h4>
                <p className="text-muted small">For busy households</p>
              </div>
              <h3 className="fw-bold">₹999<small className="fs-6 text-muted">/mo</small></h3>
            </div>
            <ul className="list-unstyled mb-4">
              <li className="mb-2 small"><i className="bi bi-check2 text-success me-2"></i> Unlimited Staff Members</li>
              <li className="mb-2 small"><i className="bi bi-check2 text-success me-2"></i> Advanced Background Verification</li>
              <li className="mb-2 small"><i className="bi bi-check2 text-success me-2"></i> Featured Job Postings</li>
            </ul>
            <button className="btn sahayya-btn-primary w-100 mt-auto">Edit Plan Pricing</button>
          </div>
        </div>
      </div>

      {/* User Subscriptions Table */}
      <div className="card sahayya-card p-4">
        <h5 className="fw-bold mb-4">Subscribed House Owners</h5>
        
        {/* Search + Filter Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search by owner name..." />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Plans</option>
              <option value="pro">Professional</option>
              <option value="free">Free</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table sahayya-table align-middle">
            <thead>
              <tr>
                <th>Owner Name</th>
                <th>Current Plan</th>
                <th>Price</th>
                <th>Next Billing</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id}>
                  <td className="fw-bold">{sub.user}</td>
                  <td>
                    <span className={`badge ${sub.plan === 'Professional' ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-light text-dark'}`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td>{sub.price}</td>
                  <td>{sub.expiry}</td>
                  <td>
                    <span className="badge rounded-pill bg-success-subtle text-success">{sub.status}</span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-outline-danger"><i className="bi bi-x-circle"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">Showing 3 of 124 owners</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled"><span className="page-link">Previous</span></li>
              <li className="page-item active"><span className="page-link" style={{backgroundColor: '#D98C7A', borderColor: '#D98C7A'}}>1</span></li>
              <li className="page-item"><span className="page-link text-dark">Next</span></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Membership;