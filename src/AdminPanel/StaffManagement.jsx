import React from 'react';
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
const StaffManagement = () => {
    const staffList = [
        {
            id: "STF-402",
            photo: "https://i.pravatar.cc/150?u=1",
            firstName: "Raju",
            lastName: "Prasad",
            role: "Driver",
            phone: "+91 98765 43210",
            email: "raju@gmail.com",
            gender: "Male",
            dob: "12-05-1995",

            address: {
                street: "MG Road, Andheri East",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400001"
            },

            emergency: {
                name: "Suresh Prasad",
                phone: "+91 9988776655",
                relation: "Brother"
            },

            work: {
                joiningDate: "01-01-2024",
                salary: "25000",
                payFrequency: "Monthly",
                workingDays: "Monday - Saturday"
            },

            kyc: {
                aadhaar: "7509 8064 6677",
                policeClearance: "Uploaded",
                staffPhoto: true
            },

            houseOwner: "Amitabh Bachchan",
            status: "Verified"
        }
    ];


    return (
        <div className="container-fluid p-4" style={{ minHeight: "100vh" }}>
            <style>{`
        .sahayya-btn-primary {
          background-color: #D98C7A !important;
          border-color: #D98C7A !important;
          color: #fff !important;
        }
        .sahayya-btn-primary:hover {
          background-color: #c47b6a !important;
        }
        .sahayya-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .staff-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Amitabh Bachchan Staff</h2>
                <Link to="/admin/house-owners">
                    <button className="btn sahayya-btn-primary" >
                        <IoChevronBack className="me-2" />Back
                    </button>
                </Link>
            </div>

            {/* Card */}
            <div className="card sahayya-card p-4">
                {/* Search + Filter */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Search staff or role..." />
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option>All Roles</option>
                            <option>Driver</option>
                            <option>Cook</option>
                            <option>Security</option>
                            <option>Maid</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>House Owner</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map((s) => (
                                <tr key={s.id}>
                                    <td><img src={s.photo} className="staff-img border" alt="" /></td>
                                    <td>
                                        <strong>{s.firstName}</strong><br />
                                        <small className="text-muted">Aadhaar No.: {s.id}</small>
                                    </td>
                                    <td>{s.role}</td>
                                    <td>{s.houseOwner}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${s.status === "Verified" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#viewStaffModal">
                                            View
                                        </button>

                                        <button className="btn btn-sm btn-outline-danger" >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between mt-3">
                    <small className="text-muted">Showing 1 to 3 of 3 entries</small>
                    <ul className="pagination pagination-sm mb-0">
                        <li className="page-item active">
                            <span className="page-link" style={{ backgroundColor: "#D98C7A", borderColor: "#D98C7A" }}>1</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* View Modal */}
            <div className="modal fade" id="viewStaffModal" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content border-0 rounded-4">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Staff Profile</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body px-4">
                            <div className="row g-4">

                                {/* LEFT PROFILE */}
                                <div className="col-md-3 text-center">
                                    <img
                                        src="https://i.pravatar.cc/150?u=1"
                                        className="rounded-circle border mb-3"
                                        width="120"
                                        height="120"
                                    />
                                    <h6 className="fw-bold mb-0">Raju Prasad</h6>
                                    <small className="text-muted">Driver</small>

                                    <span className="badge bg-success-subtle text-success mt-2">
                                        Verified
                                    </span>
                                </div>

                                {/* RIGHT DETAILS */}
                                <div className="col-md-9">

                                    {/* PERSONAL */}
                                    <h6 className="fw-bold text-muted mb-2">Personal Details</h6>
                                    <div className="row mb-3">
                                        <div className="col-md-4"><small>Email</small><div className="fw-bold">raju@gmail.com</div></div>
                                        <div className="col-md-4"><small>Phone</small><div className="fw-bold">+91 98765 43210</div></div>
                                        <div className="col-md-4"><small>Gender</small><div className="fw-bold">Male</div></div>
                                    </div>

                                    {/* ADDRESS */}
                                    <h6 className="fw-bold text-muted mt-3 mb-2">Address</h6>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <small>Street</small>
                                            <div className="fw-bold">MG Road, Andheri East</div>
                                        </div>
                                        <div className="col-md-4 mt-2"><small>City</small><div className="fw-bold">Mumbai</div></div>
                                        <div className="col-md-4 mt-2"><small>State</small><div className="fw-bold">Maharashtra</div></div>
                                        <div className="col-md-4 mt-2"><small>Pincode</small><div className="fw-bold">400001</div></div>
                                    </div>

                                    {/* EMERGENCY */}
                                    <h6 className="fw-bold text-muted mt-3 mb-2">Emergency Contact</h6>
                                    <div className="row mb-3">
                                        <div className="col-md-4"><small>Name</small><div className="fw-bold">Suresh Prasad</div></div>
                                        <div className="col-md-4"><small>Relation</small><div className="fw-bold">Brother</div></div>
                                        <div className="col-md-4"><small>Phone</small><div className="fw-bold">+91 9988776655</div></div>
                                    </div>

                                    {/* WORK */}
                                    <h6 className="fw-bold text-muted mt-3 mb-2">Work Details</h6>
                                    <div className="row mb-3">
                                        <div className="col-md-4"><small>Joining Date</small><div className="fw-bold">01-01-2024</div></div>
                                        <div className="col-md-4"><small>Salary</small><div className="fw-bold">₹25,000</div></div>
                                        <div className="col-md-4"><small>Working Days</small><div className="fw-bold">Mon - Sat</div></div>
                                    </div>

                                    {/* KYC */}
                                    <h6 className="fw-bold text-muted mt-3 mb-2">KYC Documents</h6>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="badge bg-success-subtle text-success">
                                                Aadhaar Verified
                                            </span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="badge bg-success-subtle text-success">
                                                Police Clearance Uploaded
                                            </span>
                                        </div>
                                    </div>
{/* STAFF DOCUMENTS */}
<h6 className="fw-bold text-muted mt-4 mb-3">Staff Documents</h6>

<div className="row g-3">

  {/* Aadhaar */}
  <div className="col-md-4">
    <div className="border rounded p-3 d-flex justify-content-between align-items-center">
      <div>
        <div className="fw-bold">Aadhaar Card</div>
        <small className="text-muted">Verified</small>
      </div>
      <button
        className="btn btn-sm btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#docPreviewModal"
      >
        View
      </button>
    </div>
  </div>

  {/* Police Clearance */}
  <div className="col-md-4">
    <div className="border rounded p-3 d-flex justify-content-between align-items-center">
      <div>
        <div className="fw-bold">Police Clearance</div>
        <small className="text-muted">Uploaded</small>
      </div>
      <button
        className="btn btn-sm btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#docPreviewModal"
      >
        View
      </button>
    </div>
  </div>



</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>


{/* DOCUMENT PREVIEW MODAL */}
<div className="modal fade" id="docPreviewModal" tabIndex="-1">
  <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content border-0 rounded-4">

      <div className="modal-header">
        <h5 className="modal-title fw-bold">Aadhaar Card Preview</h5>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body text-center">

        {/* Aadhaar Image */}
        <img
          src="https://i.pinimg.com/736x/1c/fb/4e/1cfb4eca9083a70e4d0a60963bb729d9.jpg"
          alt="Aadhaar Card"
          className="img-fluid rounded border"
        />

        <p className="text-muted small mt-2">
          Uploaded Aadhaar Card (Front)
        </p>

      </div>

      <div className="modal-footer">
        <button className="btn btn-light" data-bs-dismiss="modal">
          Close
        </button>
      </div>

    </div>
  </div>
</div>



        </div>
    );
};

export default StaffManagement;
