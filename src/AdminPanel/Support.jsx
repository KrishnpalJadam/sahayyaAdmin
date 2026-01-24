import React, { useState } from "react";

const Support = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: 1,
      owner: "Amitabh Bachchan",
      profile:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
      category: "Staff Related",
      subject: "Staff verification pending",
      message:
        "Mere driver ka police verification abhi tak approve nahi hua hai.",
      date: "22 Jan 2026",
      status: "Open",
    },
    {
      id: 2,
      owner: "Deepika Padukone",
      profile:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      category: "Payment",
      subject: "Payment deducted twice",
      message:
        "Membership payment do baar deduct ho gaya hai, please check.",
      date: "18 Jan 2026",
      status: "In Progress",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <style>{`
        .sahayya-card {
          border-radius:12px;
          border:none;
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
        }
        .sahayya-btn-primary {
          background:#D98C7A;
          color:#fff;
          border:none;
        }
        .sahayya-btn-primary:hover {
          background:#c47b6a;
        }
      `}</style>

      {/* HEADER */}
      <div className="mb-4">
        <h4 className="fw-bold">Support Requests</h4>
        {/* <p className="text-muted">
          House Owner se aaye hue support tickets
        </p> */}
      </div>

      {/* TICKETS TABLE */}
      <div className="card sahayya-card p-4">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>House Owner</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={t.profile}
                      width="36"
                      height="36"
                      className="rounded-circle"
                    />
                    <strong>{t.owner}</strong>
                  </div>
                </td>
                <td>{t.category}</td>
                <td className="fw-bold">{t.subject}</td>
                <td>{t.date}</td>
                <td>
                  <span
                    className={`badge ${
                      t.status === "Open"
                        ? "bg-warning-subtle text-warning"
                        : t.status === "Resolved"
                        ? "bg-success-subtle text-success"
                        : "bg-info-subtle text-info"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#ticketModal"
                    onClick={() => setSelectedTicket(t)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW / REPLY MODAL */}
      <div className="modal fade" id="ticketModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="fw-bold">Support Ticket</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {selectedTicket && (
              <div className="modal-body">
                <div className="mb-3">
                  <strong>House Owner:</strong>{" "}
                  {selectedTicket.owner}
                </div>
                <div className="mb-3">
                  <strong>Category:</strong>{" "}
                  {selectedTicket.category}
                </div>
                <div className="mb-3">
                  <strong>Issue:</strong>
                  <div className="border rounded p-3 mt-1 bg-light">
                    {selectedTicket.message}
                  </div>
                </div>

                <hr />

                <label className="fw-bold">Admin Reply</label>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Type solution / reply for house owner..."
                />

                <label className="fw-bold">Update Status</label>
                <select className="form-select">
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            )}

            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn sahayya-btn-primary">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
