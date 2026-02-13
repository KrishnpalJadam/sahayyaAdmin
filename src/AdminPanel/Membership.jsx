import React, { useState, useEffect } from "react";
import axiosInstance from "../utiles/axiosInstance";
import { toast } from "react-toastify";

const Membership = () => {
  /* ================= STATE ================= */
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    subscription_name: "",
    description: "",
    price: "",
    validity: "",
    type: "Monthly",
    role_id: "2",
    extra: [{ feature: "" }],
  });

  const [selectedOwner, setSelectedOwner] = useState(null);


  /* ================= FETCH PLANS ================= */
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/subscriptions");
      if (res.data.status === true) {
        setPlans(res.data.data || []);
      }

    } catch (error) {
      toast.error("Failed to fetch plans");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleOpenModal = (planToEdit = null) => {
    if (planToEdit) {
      setSelectedPlan(planToEdit);
      setFormData({
        subscription_name: planToEdit.subscription_name || "",
        description: planToEdit.description || "",
        price: planToEdit.price || "",
        validity: planToEdit.validity || "",
        type: planToEdit.type.charAt(0).toUpperCase() + planToEdit.type.slice(1), // monthly -> Monthly
        role_id: planToEdit.role_id || "2",
        extra: planToEdit.extra && planToEdit.extra.length > 0
          ? planToEdit.extra
          : [{ feature: "" }],
      });
    } else {
      setSelectedPlan(null);
      setFormData({
        subscription_name: "",
        description: "",
        price: "",
        validity: "",
        type: "Monthly",
        role_id: "2",
        extra: [{ feature: "" }],
      });
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, extra: [...formData.extra, { feature: "" }] });
  };

  const updateFeature = (i, value) => {
    const updated = [...formData.extra];
    updated[i] = { feature: value };
    setFormData({ ...formData, extra: updated });
  };

  const removeFeature = (i) => {
    const updated = formData.extra.filter((_, idx) => idx !== i);
    setFormData({ ...formData, extra: updated });
  };

  /* ================= CRUD ACTIONS ================= */
  const handleSavePlan = async () => {
    // Validation
    if (!formData.subscription_name || !formData.price) {
      toast.warning("Please fill required fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        type: formData.type.toLowerCase(),
        // Validity Auto Mapping
        validity: formData.validity || (formData.type === "Monthly" ? 30 : formData.type === "Quarterly" ? 90 : 365),
      };

      if (selectedPlan) {
        await axiosInstance.put(`/admin/subscriptions/${selectedPlan.id}`, payload);
        toast.success("Plan updated successfully");
      } else {
        await axiosInstance.post("/admin/subscriptions", payload);
        toast.success("Plan created successfully");
      }

      // Close modal using bootstrap instance
      const modalElement = document.getElementById("planModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();

      fetchPlans();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await axiosInstance.delete(`/admin/subscriptions/${id}`);
      toast.success("Plan deleted successfully");
      fetchPlans();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /* ================= SUBSCRIBERS (STATIC) ================= */
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
      special: "Senior citizen in the house. Staff should be calm and experienced.",
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
          onClick={() => handleOpenModal()}
        >
          + Add Plan
        </button>
      </div>

      {/* LOADING SPINNER */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* PLAN CARDS */}
      {!loading && (
        <div className="row mb-5 g-4">
          {plans.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card sahayya-card p-4 border h-100">
                <h4 className="fw-bold">{p.subscription_name}</h4>
                <p className="text-muted small mb-1">{p.type.charAt(0).toUpperCase() + p.type.slice(1)} Plan</p>
                <p className="text-muted x-small mb-2">{p.description}</p>

                <h3 className="fw-bold">₹{p.price}</h3>

                <ul className="small mt-3 flex-grow-1">
                  {p.extra && p.extra.map((f, i) => (
                    <li key={i}>{f.feature}</li>
                  ))}
                </ul>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#planModal"
                    onClick={() => handleOpenModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleDeletePlan(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {plans.length === 0 && !loading && (
            <div className="col-12 text-center py-5 text-muted">
              No plans found. Click "+ Add Plan" to create one.
            </div>
          )}
        </div>
      )}

      {/* SUBSCRIBERS TABLE */}
      <div className="card sahayya-card p-4">
        <h5 className="fw-bold mb-3">Subscribed House Owners</h5>

        <div className="table-responsive">
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
                        alt={s.name}
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
      </div>

      {/* ADD / EDIT PLAN MODAL */}
      <div className="modal fade" id="planModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="fw-bold">{selectedPlan ? "Edit Plan" : "Add New Plan"}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="fw-bold">Plan Name</label>
                <input
                  className="form-control"
                  value={formData.subscription_name}
                  onChange={(e) => setFormData({ ...formData, subscription_name: e.target.value })}
                  placeholder="e.g. Professional"
                />
              </div>

              <div className="mb-3">
                <label className="fw-bold">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the plan..."
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-bold">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="999"
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Duration Type</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Validity (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                    placeholder="Leave blank for auto-assign"
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">Role ID</label>
                  <select
                    className="form-select"
                    value={formData.role_id}
                    onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                  >
                    <option value="2">House Owner (Default)</option>
                    <option value="3">Staff</option>
                  </select>
                </div>
              </div>

              <label className="fw-bold mt-4 mb-2">Features</label>
              {formData.extra.map((f, i) => (
                <div key={i} className="d-flex gap-2 mb-2">
                  <input
                    className="form-control"
                    value={f.feature}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder="Feature name"
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFeature(i)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                className="btn btn-sm btn-outline-secondary mt-1"
                onClick={addFeature}
                type="button"
              >
                + Add Feature
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn sahayya-btn-primary"
                onClick={handleSavePlan}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW OWNER MODAL */}
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
                      alt={selectedOwner.name}
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
