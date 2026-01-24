import React from 'react';
import { Link } from 'react-router-dom';

const HouseOwners = () => {
  // Static Dummy Data
  const owners = [
    { id: 1, profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", name: "Amitabh Bachchan", phone: "+91 98765 43210", dob: "12/05/2025", gender: "Male", familyCount: 4, staffCount: 3, status: "Active" },
    { id: 2, profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", name: "Deepika Padukone", phone: "+91 98765 00000", dob: "12/05/2025", gender: "Male", familyCount: 2, staffCount: 5, status: "Active" },
    { id: 3, profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", name: "Ranbir Kapoor", phone: "+91 91234 56789", dob: "12/05/2025", gender: "Male", familyCount: 3, staffCount: 2, status: "Inactive" },
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
      `}</style>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">House Owners</h2>

      </div>

      {/* Main Container */}
      <div className="card sahayya-card p-4">

        {/* Search + Filter Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control border-start-0" placeholder="Search by name or phone..." />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table sahayya-table align-middle">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Family Count</th>
                <th>Staff Count</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id}>
                  <td ><img width={50} className='rounded-2' src={owner.profile} alt="" /></td>
                  <td className="fw-bold">{owner.name}</td>
                  <td>{owner.phone}</td>
                  <td>{owner.dob}</td>
                  <td>{owner.gender}</td>
                  <td>{owner.familyCount} Members</td>
                  <td>{owner.staffCount} Staff</td>
                  <td>
                    <span className={`badge rounded-pill ${owner.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                      {owner.status}
                    </span>
                  </td>
                  <td className="text-end">
                     <Link to="/admin/staffManagement">
                    <button
                      className="btn btn-sm btn-primary me-2"
                     
                    >
                      <i className="bi bi-eye me-2"></i>View Staff
                    </button>
                   </Link>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                        data-bs-toggle="modal"
                      data-bs-target="#viewOwnerModal"
                    >
                      <i className="bi bi-eye me-2"></i>View
                    </button>
                    <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">Showing 1 to 3 of 3 entries</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled"><span className="page-link">Previous</span></li>
              <li className="page-item active"><span className="page-link" style={{ backgroundColor: '#D98C7A', borderColor: '#D98C7A' }}>1</span></li>
              <li className="page-item"><span className="page-link text-dark">Next</span></li>
            </ul>
          </nav>
        </div>
      </div>


      <div className="modal fade" id="viewOwnerModal" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0" style={{ borderRadius: '15px' }}>

            {/* Header */}
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">House Owner Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-4">

                {/* PROFILE */}
                <div className="col-md-3 text-center">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt="profile"
                    className="rounded-circle mb-3 border"
                    width="120"
                    height="120"
                  />
                  <h6 className="fw-bold mb-0">Amitabh Bachchan</h6>
                  <small className="text-muted">House Owner</small>
                </div>

                <div className="col-md-9">

                  {/* BASIC INFO */}
                  <h6 className="fw-bold text-muted mb-2">Basic Information</h6>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <small className="text-muted">Phone</small>
                      <div className="fw-bold">+91 98765 43210</div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted">Date of Birth</small>
                      <div className="fw-bold">12/05/2025</div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted">Gender</small>
                      <div className="fw-bold">Male</div>
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <h6 className="fw-bold text-muted mb-2 mt-3">Address Details</h6>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <small className="text-muted">Street Address</small>
                      <div className="fw-bold">
                        Flat 402, Sunrise Apartments, MG Road
                      </div>
                    </div>
                    <div className="col-md-4 mt-2">
                      <small className="text-muted">City</small>
                      <div className="fw-bold">Mumbai</div>
                    </div>
                    <div className="col-md-4 mt-2">
                      <small className="text-muted">State</small>
                      <div className="fw-bold">Maharashtra</div>
                    </div>
                    <div className="col-md-4 mt-2">
                      <small className="text-muted">Pincode</small>
                      <div className="fw-bold">400001</div>
                    </div>
                  </div>

                  {/* RESIDENCE */}
                  <h6 className="fw-bold text-muted mb-2 mt-3">Residence Details</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <small className="text-muted">Residence Type</small>
                      <div className="fw-bold">Flat</div>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">Number of Rooms</small>
                      <div className="fw-bold">3</div>
                    </div>
                  </div>

                  {/* OCCUPANTS */}
                  <h6 className="fw-bold text-muted mb-2 mt-3">Occupants</h6>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <small className="text-muted">Adults</small>
                      <div className="fw-bold">2</div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted">Children</small>
                      <div className="fw-bold">1</div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted">Elderly</small>
                      <div className="fw-bold">1</div>
                    </div>
                  </div>

                  {/* PET DETAILS */}
                  <h6 className="fw-bold text-muted mb-2 mt-3">Pet Details</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <small className="text-muted">Pet Type</small>
                      <div className="fw-bold">Dog</div>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">Pet Count</small>
                      <div className="fw-bold">1</div>
                    </div>
                  </div>

                  {/* SPECIAL REQUIREMENTS */}
                  <h6 className="fw-bold text-muted mb-2 mt-3">Special Requirements</h6>
                  <div className="border rounded p-3 bg-light">
                    Senior citizen in the house. Staff should be calm and experienced.
                  </div>

                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HouseOwners;