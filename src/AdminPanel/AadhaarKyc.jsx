import React from 'react';

const AadhaarKyc = () => {
  // Static Dummy Data
  const kycList = [
    { id: 1, staffName: "Raju Prasad", maskedAadhaar: "XXXX XXXX 1234", status: "Pending", date: "2026-01-20" },
    { id: 2, staffName: "Sunita Bai", maskedAadhaar: "XXXX XXXX 5678", status: "Verified", date: "2026-01-18" },
    { id: 3, staffName: "Manoj Singh", maskedAadhaar: "XXXX XXXX 9012", status: "Rejected", date: "2026-01-15" },
  ];

  return (
    <div className="container-fluid p-4" style={{  minHeight: '100vh' }}>
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
      `}</style>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Aadhaar KYC Verification</h2>
        <button className="btn sahayya-btn-primary px-4">
          <i className="bi bi-arrow-repeat me-2"></i>Refresh List
        </button>
      </div>

      {/* Main Container */}
      <div className="card sahayya-card p-4">
        
        {/* Search + Filter Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search by staff name..." />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table sahayya-table align-middle">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Masked Aadhaar</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kycList.map((kyc) => (
                <tr key={kyc.id}>
                  <td className="fw-bold">{kyc.staffName}</td>
                  <td className="text-muted font-monospace">{kyc.maskedAadhaar}</td>
                  <td>{kyc.date}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      kyc.status === 'Verified' ? 'bg-success-subtle text-success' : 
                      kyc.status === 'Pending' ? 'bg-warning-subtle text-warning' : 
                      'bg-danger-subtle text-danger'
                    }`}>
                      {kyc.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#viewKycModal">
                      View Documents
                    </button>
                    <button className="btn btn-sm btn-success me-2"><i className="bi bi-check-lg"></i></button>
                    <button className="btn btn-sm btn-danger"><i className="bi bi-x-lg"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">Showing 1 to 3 of 3 submissions</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled"><span className="page-link">Previous</span></li>
              <li className="page-item active"><span className="page-link" style={{backgroundColor: '#D98C7A', borderColor: '#D98C7A'}}>1</span></li>
              <li className="page-item"><span className="page-link text-dark">Next</span></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* View KYC Modal UI (Static) */}
      <div className="modal fade" id="viewKycModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Aadhaar Document Preview</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center bg-light m-3 rounded">
              <div className="p-5 border border-dashed text-muted">
                <i className="bi bi-file-earmark-person display-1 d-block mb-3"></i>
                <p>Aadhaar Front/Back Image Preview Area</p>
                <small>(Static Placeholder)</small>
              </div>
              <div className="mt-3 text-start px-3">
                <h6>Verification Details:</h6>
                <p className="small text-muted mb-1"><strong>Name on Card:</strong> RAJU PRASAD</p>
                <p className="small text-muted mb-1"><strong>DOB:</strong> 01-01-1985</p>
                <p className="small text-muted"><strong>Address:</strong> 123, Sample Street, New Delhi</p>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-danger me-auto">Reject</button>
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn sahayya-btn-primary">Approve Verification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarKyc;