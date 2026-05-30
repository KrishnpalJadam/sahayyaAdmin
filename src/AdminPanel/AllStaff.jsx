import React, { useEffect, useState } from "react";
import axiosInstance from "../utiles/axiosInstance";
import { toast } from "react-toastify";

const AllStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // ================= FETCH STAFF =================
  const fetchStaff = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/stafflist", {
        params: { page, search: searchTerm },
      });
      if (res.data.success) {
        setStaffList(res.data.data.data);
        setPagination(res.data.data);
        setCurrentPage(res.data.data.current_page);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchStaff(1, value);
  };

  // ================= DELETE =================
  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await axiosInstance.delete(`/admin/staff/${deleteTargetId}`);
      toast.success("Staff deleted successfully");
      setDeleteTargetId(null);
      fetchStaff(currentPage, search);
      // Close modal
      const modal = window.bootstrap?.Modal?.getInstance(document.getElementById("deleteModal"));
      modal?.hide();
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Delete failed: " + (error?.response?.data?.message || "Server error"));
    }
  };

  // ================= STATUS CHANGE =================
  const changeStatus = async (staff) => {
    const newStatus = staff.status === "active" ? "block" : "active";
    try {
      await axiosInstance.put(`/admin/staff/${staff.id}/status`, { status: newStatus });
      toast.success("Status updated");
      fetchStaff(currentPage, search);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">All Staff</h2>

      {/* SEARCH */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by name, phone or Aadhaar..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="card p-4">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Aadhaar</th>
                <th>Aadhaar Verified</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="text-center">Loading...</td></tr>
              ) : staffList.length === 0 ? (
                <tr><td colSpan="8" className="text-center">No Staff Found</td></tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <img
                        src={staff.image || "https://via.placeholder.com/40"}
                        width="40" height="40"
                        className="rounded-circle border" alt=""
                        onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
                      />
                    </td>
                    <td>
                      {staff.first_name && staff.last_name
                        ? `${staff.first_name} ${staff.last_name}`
                        : staff.name || "-"}
                    </td>
                    <td>{staff.email || "-"}</td>
                    <td>{(staff.phone_number_country_code || "") + (staff.phone_number || "-")}</td>
                    <td>{staff.aadhar_number || "-"}</td>
                    <td>
                      <span className={`badge ${staff.aadhar__verify ? "bg-success" : "bg-danger"}`}>
                        {staff.aadhar__verify ? "Verified" : "Not Verified"}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${staff.status === "active" ? "bg-success" : "bg-danger"}`}>
                        {staff.status || "active"}
                      </span>
                    </td>
                    <td className="text-end">
                      {/* VIEW — always opens modal with full profile */}
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#viewModal"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        View
                      </button>

                      {/* BLOCK / ACTIVATE */}
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => changeStatus(staff)}
                      >
                        {staff.status === "active" ? "Block" : "Activate"}
                      </button>

                      {/* DELETE — opens confirmation modal */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setDeleteTargetId(staff.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {pagination.last_page > 1 && (
          <div className="d-flex justify-content-end mt-3">
            <ul className="pagination mb-0">
              {[...Array(pagination.last_page)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 && "active"}`}>
                  <button className="page-link" onClick={() => fetchStaff(i + 1, search)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ===== VIEW MODAL — full profile, always opens ===== */}
      <div className="modal fade" id="viewModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Staff Profile</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            {selectedStaff && (
              <div className="modal-body">
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2 text-center">
                    <img
                      src={selectedStaff.image || "https://via.placeholder.com/80"}
                      width="80" height="80"
                      className="rounded-circle border" alt=""
                      onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
                    />
                  </div>
                  <div className="col-md-10">
                    <h5 className="mb-1">
                      {selectedStaff.first_name && selectedStaff.last_name
                        ? `${selectedStaff.first_name} ${selectedStaff.last_name}`
                        : selectedStaff.name || "—"}
                    </h5>
                    <p className="text-muted mb-0">{selectedStaff.email || "No email"}</p>
                    <p className="text-muted mb-0">📞 {selectedStaff.phone_number || "No phone"}</p>
                  </div>
                </div>
                <hr />
                <table className="table table-sm table-bordered">
                  <tbody>
                    <tr>
                      <th>Aadhaar No.</th>
                      <td>{selectedStaff.aadhar_number || "—"}</td>
                      <th>Aadhaar Verified</th>
                      <td>
                        <span className={`badge ${selectedStaff.aadhar__verify ? "bg-success" : "bg-danger"}`}>
                          {selectedStaff.aadhar__verify ? "Verified" : "Not Verified"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>{selectedStaff.gender || "—"}</td>
                      <th>Date of Birth</th>
                      <td>{selectedStaff.date_of_birth || selectedStaff.dob || "—"}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>
                        <span className={`badge ${selectedStaff.status === "active" ? "bg-success" : "bg-danger"}`}>
                          {selectedStaff.status || "active"}
                        </span>
                      </td>
                      <th>City / State</th>
                      <td>{selectedStaff.current_city || "—"} / {selectedStaff.current_state || "—"}</td>
                    </tr>
                    <tr>
                      <th>About</th>
                      <td colSpan="3">{selectedStaff.about_me || "—"}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 className="mt-3 mb-2 fw-bold">Documents</h6>
                {!selectedStaff.aadhar_front && !selectedStaff.aadhar_back && !selectedStaff.verification_certificate ? (
                  <div className="alert alert-warning py-2 mb-0">No documents uploaded by this staff member.</div>
                ) : (
                  <div className="row">
                    {selectedStaff.aadhar_front && (
                      <div className="col-md-6 mb-3">
                        <strong>Aadhaar Front</strong>
                        <img src={selectedStaff.aadhar_front} className="img-fluid border rounded mt-1 d-block" alt="" />
                      </div>
                    )}
                    {selectedStaff.aadhar_back && (
                      <div className="col-md-6 mb-3">
                        <strong>Aadhaar Back</strong>
                        <img src={selectedStaff.aadhar_back} className="img-fluid border rounded mt-1 d-block" alt="" />
                      </div>
                    )}
                    {selectedStaff.verification_certificate && (
                      <div className="col-md-12 mb-3">
                        <strong>Verification Certificate</strong>
                        <img src={selectedStaff.verification_certificate} className="img-fluid border rounded mt-1 d-block" alt="" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Delete</h5>
              <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Are you sure you want to <strong>permanently delete</strong> this staff member? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStaff;