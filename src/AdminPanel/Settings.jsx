import React, { useState } from "react";
import axiosInstance from "../utiles/axiosInstance";

const Settings = () => {

  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // SUBMIT SETTINGS
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        settings: [
          {
            key: "points_per_action",
            value: points
          }
        ]
      };

      const res = await axiosInstance.post(
        "/admin/settings/store",
        payload
      );

      if (res.data) {
        setMessage("✅ Settings updated successfully!");
      }

    } catch (error) {
      console.log(error);
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4" style={{ minHeight: "100vh" }}>

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Settings</h2>
      </div>

      {/* CARD */}
      <div className="card p-4" style={{ maxWidth: "500px" }}>

        <form onSubmit={handleSubmit}>

          {/* INPUT */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Points Per Action
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter points..."
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <div className="mt-3 text-center fw-semibold">
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;