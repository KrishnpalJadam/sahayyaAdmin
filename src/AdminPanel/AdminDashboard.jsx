import React, { useEffect, useState } from "react";
import axiosInstance from "../utiles/axiosInstance";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/dashboard");

      if (res?.data?.status === "success") {
        setDashboardData(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ================= CHART DATA ================= */
  const attendanceChart = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        data: dashboardData
          ? [
            dashboardData.present_attendance_count,
            dashboardData.absent_attendance_count,
            dashboardData.leave,
          ]
          : [0, 0, 0],
        backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
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

      {/* HEADER */}
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* LOADER */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" />
        </div>
      )}

      {!loading && dashboardData && (
        <>
          {/* ================= SUMMARY CARDS ================= */}
          <div className="row mb-4">

            <div className="col-md-4">
              <div className="card sahayya-card p-3">
                <p className="text-muted small">Total House Owners</p>
                <h3 className="fw-bold">
                  {dashboardData.house_owner_count}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card sahayya-card p-3">
                <p className="text-muted small">Active Staff</p>
                <h3 className="fw-bold">
                  {dashboardData.staff_count}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card sahayya-card p-3">
                <p className="text-muted small">Open Jobs</p>
                <h3 className="fw-bold">
                  {dashboardData.job_count}
                </h3>
              </div>
            </div>

          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="row">

            {/* Attendance Summary */}
            <div className="col-md-6">
              <div className="card sahayya-card p-4 h-100">
                <h5 className="fw-bold mb-4">Today's Attendance</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Present</span>
                  <strong className="text-success">
                    {dashboardData.present_attendance_count}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Absent</span>
                  <strong className="text-danger">
                    {dashboardData.absent_attendance_count}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>On Leave</span>
                  <strong className="text-warning">
                    {dashboardData.leave}
                  </strong>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    Overall Attendance Rate
                  </small>
                  <h3 className="fw-bold text-primary">
                    {dashboardData.overall_attendance_rate}%
                  </h3>
                </div>
              </div>
            </div>

            {/* ================= PIE CHART ================= */}
            <div className="col-md-6">
              <div className="card sahayya-card p-4 h-100">
                <h5 className="fw-bold mb-4">Attendance Chart</h5>
                <Pie data={attendanceChart} />
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
