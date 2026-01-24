import React, { useState } from "react";

const Membership = () => {
  /* ================= PLAN STATE ================= */
  const [plan, setPlan] = useState({
    name: "Professional",
    price: "999",
    duration: "Monthly",
    features: [
      "Unlimited Staff",
      "Background Verification",
      "Featured Job Posts",
    ],
  });
const [selectedOwner, setSelectedOwner] = useState(null);

  const addFeature = () => {
    setPlan({ ...plan, features: [...plan.features, ""] });
  };

  const updateFeature = (i, value) => {
    const updated = [...plan.features];
    updated[i] = value;
    setPlan({ ...plan, features: updated });
  };

  const removeFeature = (i) => {
    const updated = plan.features.filter((_, idx) => idx !== i);
    setPlan({ ...plan, features: updated });
  };

  /* ================= SUBSCRIBERS ================= */
const subscribers = [
  {
    id: 1,
    name: "Amitabh Bachchan",
    profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",

    phone: "+91 98765 43210",
    dob: "12/05/2025",
    gender: "Male",

    address: {
      street: "Flat 402, Sunrise Apartments, MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },

    residence: {
      type: "Flat",
      rooms: 3,
    },

    occupants: {
      adults: 2,
      children: 1,
      elderly: 1,
    },

    pet: {
      type: "Dog",
      count: 1,
    },

    special:
      "Senior citizen in the house. Staff should be calm and experienced.",

    plan: "Professional",
    price: "₹999",
    duration: "Monthly",
    nextBilling: "12 May 2026",
    status: "Active",
  },
];


  return (
    <div className="container-fluid p-4">
      <style>{`
        .sahayya-btn-primary { background:#D98C7A; color:#fff; border:none }
        .sahayya-btn-primary:hover { background:#c47b6a }
        .sahayya-card { border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,.05); border:none }
      `}</style>

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bold">Membership Plans</h2>
        <button
          className="btn sahayya-btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#planModal"
        >
          + Add / Edit Plan
        </button>
      </div>

      {/* PLAN CARD */}
      <div className="row mb-5">
        <div className="col-md-6">
          <div className="card sahayya-card p-4 border">
            <h4 className="fw-bold">{plan.name}</h4>
            <p className="text-muted small">{plan.duration}</p>

            <h3 className="fw-bold">₹{plan.price}</h3>

            <ul className="small mt-3">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary w-100"
                data-bs-toggle="modal"
                data-bs-target="#planModal"
              >
                Edit
              </button>
              <button className="btn btn-outline-danger w-100">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSCRIBERS TABLE */}
      <div className="card sahayya-card p-4">
        <h5 className="fw-bold mb-3">Subscribed House Owners</h5>

        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Owner</th>
              <th>Plan</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Next Billing</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={s.profile}
                      width="36"
                      height="36"
                      className="rounded-circle"
                    />
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td>{s.plan}</td>
                <td>{s.price}</td>
                <td>{s.duration}</td>
                <td>{s.nextBilling}</td>
                <td>
                  <span className="badge bg-success-subtle text-success">
                    {s.status}
                  </span>
                </td>
                <td>
                  <button
  className="btn btn-sm btn-outline-secondary"
  data-bs-toggle="modal"
  data-bs-target="#viewOwnerModal"
  onClick={() => setSelectedOwner(s)}
>
  View
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT PLAN MODAL */}
      <div className="modal fade" id="planModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="fw-bold">Add / Edit Plan</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label className="fw-bold">Plan Name</label>
              <input
                className="form-control mb-3"
                value={plan.name}
                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
              />

              <div className="row">
                <div className="col-md-6">
                  <label className="fw-bold">Price</label>
                  <input
                    className="form-control"
                    value={plan.price}
                    onChange={(e) =>
                      setPlan({ ...plan, price: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Duration</label>
                  <select
                    className="form-select"
                    value={plan.duration}
                    onChange={(e) =>
                      setPlan({ ...plan, duration: e.target.value })
                    }
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>

              <label className="fw-bold mt-3">Features</label>
              {plan.features.map((f, i) => (
                <div key={i} className="d-flex gap-2 mb-2">
                  <input
                    className="form-control"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFeature(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                className="btn btn-outline-secondary mt-2"
                onClick={addFeature}
              >
                + Add Feature
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn sahayya-btn-primary">
                Save Plan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="viewOwnerModal" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content rounded-4">
      <div className="modal-header">
        <h5 className="fw-bold">House Owner Profile</h5>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {selectedOwner && (
        <div className="modal-body">
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <img
                src={selectedOwner.profile}
                className="rounded-circle mb-2"
                width="120"
                height="120"
              />
              <h6 className="fw-bold">{selectedOwner.name}</h6>
              <small className="text-muted">House Owner</small>
            </div>

            <div className="col-md-9">
              <h6 className="fw-bold text-muted">Basic Information</h6>
              <p><strong>Phone:</strong> {selectedOwner.phone}</p>
              <p><strong>DOB:</strong> {selectedOwner.dob}</p>
              <p><strong>Gender:</strong> {selectedOwner.gender}</p>

              <h6 className="fw-bold text-muted mt-3">Address</h6>
              <p>{selectedOwner.address.street}</p>
              <p>
                {selectedOwner.address.city},{" "}
                {selectedOwner.address.state} -{" "}
                {selectedOwner.address.pincode}
              </p>

              <h6 className="fw-bold text-muted mt-3">Residence</h6>
              <p>
                {selectedOwner.residence.type} •{" "}
                {selectedOwner.residence.rooms} Rooms
              </p>

              <h6 className="fw-bold text-muted mt-3">Occupants</h6>
              <p>
                Adults: {selectedOwner.occupants.adults}, Children:{" "}
                {selectedOwner.occupants.children}, Elderly:{" "}
                {selectedOwner.occupants.elderly}
              </p>

              <h6 className="fw-bold text-muted mt-3">Pet</h6>
              <p>
                {selectedOwner.pet.type} ({selectedOwner.pet.count})
              </p>

              <h6 className="fw-bold text-muted mt-3">
                Special Requirements
              </h6>
              <div className="bg-light p-3 rounded">
                {selectedOwner.special}
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Membership;
