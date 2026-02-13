import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Reports = () => {
  const [filter, setFilter] = useState("monthly");

  const chartData = {
    labels:
      filter === "monthly"
        ? ["Week 1", "Week 2", "Week 3", "Week 4"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue (₹)",
        data:
          filter === "monthly"
            ? [18000, 22000, 25000, 30000]
            : [42000, 38000, 50000, 47000, 56000, 62000, 59000, 64000, 61000, 70000, 72000, 78000],
        backgroundColor: "#D98C7A",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="container-fluid p-4">
      <style>{`
        .sahayya-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* Header + Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Reports</h2>
          <small className="text-muted">
            Business overview based on staff, jobs & revenue
          </small>
        </div>

        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Total House Owners</small>
            <h4 className="fw-bold mt-2">12</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Total Staff</small>
            <h4 className="fw-bold mt-2">58</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Active Jobs</small>
            <h4 className="fw-bold mt-2">19</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card sahayya-card p-3">
            <small className="text-muted">
              {filter === "monthly" ? "This Month Revenue" : "This Year Revenue"}
            </small>
            <h4 className="fw-bold mt-2">
              {filter === "monthly" ? "₹95,000" : "₹8,20,000"}
            </h4>
          </div>
        </div>
      </div>

      {/* Extra Useful Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Salary Paid</small>
            <h5 className="fw-bold mt-2">₹4,50,000</h5>
            <small className="text-muted">Staff payments</small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Membership Revenue</small>
            <h5 className="fw-bold mt-2">₹1,20,000</h5>
            <small className="text-muted">House owners</small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card sahayya-card p-3">
            <small className="text-muted">Average Attendance</small>
            <h5 className="fw-bold mt-2">88%</h5>
            <small className="text-muted">Staff attendance</small>
          </div>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="card sahayya-card p-4">
        <h6 className="fw-bold mb-3">
          {filter === "monthly" ? "Monthly Revenue Overview" : "Yearly Revenue Overview"}
        </h6>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Reports;
