import React from "react";

const Addrole = () => {
  const roleList = [
    { id: 1, name: "Driver" },
    { id: 2, name: "Cook" },
    { id: 3, name: "Security" },
    { id: 4, name: "Maid" },
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
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Role Management</h2>
        <button
          className="btn sahayya-btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addRoleModal"
        >
          + Add Role
        </button>
      </div>

      {/* Card */}
      <div className="card sahayya-card p-4">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Sr.</th>
                <th>Role Name</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {roleList.map((role, index) => (
                <tr key={role.id}>
                    <td>{index+1}</td>
                  <td>
                    <strong>{role.name}</strong>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (UI only) */}
        <div className="d-flex justify-content-between mt-3">
          <small className="text-muted">Showing 1 to 4 of 4 entries</small>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item active">
              <span
                className="page-link"
                style={{
                  backgroundColor: "#D98C7A",
                  borderColor: "#D98C7A",
                }}
              >
                1
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ADD ROLE MODAL (ONLY ADD) */}
      <div className="modal fade" id="addRoleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4">

            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add New Role</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label className="form-label fw-bold">Role Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter role name"
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn sahayya-btn-primary">
                Save Role
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Addrole;
