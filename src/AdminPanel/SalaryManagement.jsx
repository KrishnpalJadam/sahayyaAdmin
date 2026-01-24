import React from 'react';

const SalaryManagement = () => {
  // Static Dummy Data
  const salaries = [
    { id: 1,houseOwner: "Abhtab", staff: "Raju Prasad", role: "Driver", month: "January 2026", amount: "₹18,000", status: "Paid", date: "2026-01-05" },
    { id: 2,houseOwner: "Abhtab", staff: "Sunita Bai", role: "Cook", month: "January 2026", amount: "₹12,000", status: "Paid", date: "2026-01-05" },
    { id: 3,houseOwner: "Abhtab", staff: "Manoj Singh", role: "Security", month: "January 2026", amount: "₹15,000", status: "Paid", date: "2026-01-05" },
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
        <h2 className="fw-bold">Salary Management</h2>
       
      </div>

      {/* Main Container */}
      <div className="card sahayya-card p-4">
        
        {/* Search + Filter Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search staff..." />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Months</option>
              <option value="jan">January</option>
              <option value="dec">December</option>
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table sahayya-table align-middle">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>House Owner</th>
                <th>Staff Name</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {salaries.map((s, index) => (
                <tr key={s.id}>
                    <td>{index+1}</td>
                    <td>{s.houseOwner}</td>
                  <td>
                    <div className="fw-bold">{s.staff}</div>
                    <small className="text-muted">{s.role}</small>
                  </td>
                  <td>{s.month}</td>
                  <td className="fw-bold">{s.amount}</td>
                  <td>{s.date}</td>
                  <td>
                   
                     <span className={`badge rounded-pillbg-success-subtle text-success`}>
                      {s.status}
                    </span>
                  </td>
                  {/* <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#salaryDetailModal">
                      <i className="bi bi-file-earmark-text"></i>
                    </button>
                    
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">Showing 1 to 3 of 3 records</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled"><span className="page-link">Previous</span></li>
              <li className="page-item active"><span className="page-link" style={{backgroundColor: '#D98C7A', borderColor: '#D98C7A'}}>1</span></li>
              <li className="page-item"><span className="page-link text-dark">Next</span></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Salary Details Modal */}
      <div className="modal fade" id="salaryDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Salary Payslip Preview</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body px-4">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-0" style={{ color: '#D98C7A' }}>Sahayya</h4>
                <small className="text-muted text-uppercase letter-spacing-1">Monthly Statement</small>
              </div>
              <div className="border-bottom pb-2 mb-3">
                <div className="row small mb-1">
                  <div className="col-6 text-muted">Staff Name:</div>
                  <div className="col-6 text-end fw-bold">Raju Prasad</div>
                </div>
                <div className="row small">
                  <div className="col-6 text-muted">Period:</div>
                  <div className="col-6 text-end fw-bold">Jan 01 - Jan 31, 2026</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Basic Salary</span>
                  <span>₹16,000</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Allowances</span>
                  <span>₹2,500</span>
                </div>
                <div className="d-flex justify-content-between text-danger mb-2">
                  <span>Deductions (2 Leaves)</span>
                  <span>- ₹500</span>
                </div>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: '#FFF5F2' }}>
                <div className="d-flex justify-content-between fw-bold">
                  <span>Net Payable</span>
                  <span style={{ color: '#D98C7A' }}>₹18,000</span>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn sahayya-btn-primary"><i className="bi bi-printer me-2"></i>Print Payslip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;