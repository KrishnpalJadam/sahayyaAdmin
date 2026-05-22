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

  // ================= FETCH STAFF =================
  const fetchStaff = async (page = 1, searchTerm = "") => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/stafflist", {
        params: {
          page: page,
          search: searchTerm,
        },
      });

      if (res.data.success) {
        setStaffList(res.data.data.data);
        setPagination(res.data.data);
        setCurrentPage(res.data.data.current_page);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ================= SEARCH =================
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchStaff(1, value);
  };

  // ================= DELETE =================
  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff?")) return;

    try {
      await axiosInstance.delete(`/admin/staff/${id}`);
      toast.success("Staff deleted");
      fetchStaff(currentPage, search);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ================= STATUS CHANGE =================
  const changeStatus = async (staff) => {
    const newStatus = staff.status === "active" ? "block" : "active";

    try {
      await axiosInstance.put(`/admin/staff/${staff.id}/status`, {
        status: newStatus,
      });

      toast.success("Status updated");
      fetchStaff(currentPage, search);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  // ================= CHECK DOCUMENTS =================
  const hasDocuments = (staff) => {
    return (
      staff.aadhar_front ||
      staff.aadhar_back ||
      staff.verification_certificate
    );
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">All Staff</h2>

      {/* SEARCH */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by phone or Aadhaar..."
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
                <tr>
                  <td colSpan="8" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Staff Found
                  </td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <img
                        src={staff.image}
                        width="40"
                        height="40"
                        className="rounded-circle border"
                        alt=""
                      />
                    </td>

                    <td>
                      {staff.first_name && staff.last_name
                        ? `${staff.first_name} ${staff.last_name}`
                        : staff.name}
                    </td>

                    <td>{staff.email || "-"}</td>

                    <td>
                      {staff.phone_number_country_code || ""}
                      {staff.phone_number || "-"}
                    </td>

                    <td>{staff.aadhar_number || "-"}</td>

                    {/* AADHAAR VERIFIED BADGE */}
                    <td>
                      <span
                        className={`badge ${
                          staff.aadhar__verify
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {staff.aadhar__verify ? "Verified" : "Not Verified"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`badge ${
                          staff.status === "active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-end">

                      {/* VIEW BUTTON */}
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        data-bs-toggle={
                          hasDocuments(staff) ? "modal" : ""
                        }
                        data-bs-target={
                          hasDocuments(staff) ? "#viewModal" : ""
                        }
                        // disabled={!hasDocuments(staff)}
                        onClick={() => {
                          if (!hasDocuments(staff)) {
                            alert("No documents available");
                          } else {
                            setSelectedStaff(staff);
                          }
                        }}
                      >
                        View
                      </button>

                      {/* STATUS BUTTON */}
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => changeStatus(staff)}
                      >
                        {staff.status === "active"
                          ? "Block"
                          : "Activate"}
                      </button>

                      {/* DELETE */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteStaff(staff.id)}
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
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 && "active"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchStaff(i + 1, search)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ================= VIEW MODAL ================= */}
      <div className="modal fade" id="viewModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Staff Documents</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {selectedStaff && (
              <div className="modal-body">
                <div className="row">

                  {selectedStaff.aadhar_front && (
                    <div className="col-md-6 mb-3">
                      <strong>Aadhaar Front</strong>
                      <img
                        src={selectedStaff.aadhar_front}
                        className="img-fluid border rounded"
                        alt=""
                      />
                    </div>
                  )}

                  {selectedStaff.aadhar_back && (
                    <div className="col-md-6 mb-3">
                      <strong>Aadhaar Back</strong>
                      <img
                        src={selectedStaff.aadhar_back}
                        className="img-fluid border rounded"
                        alt=""
                      />
                    </div>
                  )}

                  {selectedStaff.verification_certificate && (
                    <div className="col-md-12 mb-3">
                      <strong>Verification Certificate</strong>
                      <img
                        src={selectedStaff.verification_certificate}
                        className="img-fluid border rounded"
                        alt=""
                      />
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStaff;