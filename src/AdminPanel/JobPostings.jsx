


import React, { useEffect, useState } from "react";
import axiosInstance from "../utiles/axiosInstance";
import { toast } from "react-toastify";

const JobPostings = () => {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [owners, setOwners] = useState([]);

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/admin/jobs/list");

      if (res.data.status === "success") {
        setJobs(res.data.data.data);
        setFilteredJobs(res.data.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const fetchOwners = async () => {
    try {

      const res = await axiosInstance.get("/admin/houseowners");

      if (res.data.success) {
        setOwners(res.data.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };
const getOwnerName = (id) => {
  const owner = owners.find(o => o.id === id);

  if (!owner) return "Unknown";

  return `${owner.first_name || ""} ${owner.last_name || ""}`.trim();
};

  // ================= STATUS CHANGE =================
  const changeStatus = async (job) => {

    const newStatus = job.status === "active" ? "paused" : "active";

    try {

      await axiosInstance.post(`/admin/jobs/${job.id}/status`, {
        status: newStatus
      });

      toast.success("Status Updated");
      fetchJobs();

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  };


  // ================= DELETE JOB =================
  const deleteJob = async (jobId) => {
    try {

      await axiosInstance.delete(`/admin/jobs/${jobId}`);

      toast.success("Job deleted");
      fetchJobs();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ================= SEARCH =================
  useEffect(() => {

    let data = [...jobs];

    if (search) {
      data = data.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredJobs(data);

  }, [search, jobs]);

  useEffect(() => {
    fetchJobs();
    fetchOwners();
  }, []);


  return (
    <div className="container-fluid p-4" style={{ minHeight: "100vh" }}>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Job Postings</h2>
      </div>

      <div className="card p-4">

        {/* SEARCH */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive" style={{ overflowX: "auto", overflowY: "auto" }}>
          <table className="table align-middle">

            <thead className="table-light">
              <tr>
                <th>House Owner</th>

                <th>Job Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Commitment</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    {getOwnerName(job.created_by)}
                  </td>

                  <td className="fw-bold">{job.title}</td>

                  <td>
                    {job.street_address}, {job.city}
                  </td>

                  <td>₹{job.compensation}</td>

                  <td>
                    <span className="badge bg-light text-dark">
                      {job.commitment_type}
                    </span>
                  </td>

                  <td>
                    <span className={`badge 
                      ${job.status === "active"
                        ? "bg-success-subtle text-success"
                        : "bg-secondary-subtle text-secondary"}`}>
                      {job.status}
                    </span>
                  </td>

                  <td className="text-end">

                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#viewJobModal"
                      onClick={() => setSelectedJob(job)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => changeStatus(job)}
                    >
                      {job.status === "active" ? "Pause" : "Activate"}
                    </button>


                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteJob(job.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* VIEW MODAL */}
        <div className="modal fade" id="viewJobModal">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">

              <div className="modal-header">
                <h5 className="modal-title fw-bold">Job Details</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              {selectedJob && (
                <div className="modal-body px-4">

                  <h6 className="fw-bold">{selectedJob.title}</h6>

                  <p>{selectedJob.description}</p>

                  <hr />

                  <h6 className="fw-bold">Compensation</h6>
                  <p>
                    ₹{selectedJob.expected_compensation} ({selectedJob.compensation_type})
                  </p>

                  <h6 className="fw-bold">Location</h6>
                  <p>
                    {selectedJob.street_address}, {selectedJob.city}, {selectedJob.state}
                  </p>

                  <h6 className="fw-bold">Schedule</h6>
                  <p>
                    {selectedJob.preferred_hours} ({selectedJob.preferred_days})
                  </p>

                  <h6 className="fw-bold">Skills</h6>
                  <p>{selectedJob.required_skills}</p>

                  <h6 className="fw-bold">Requirements</h6>
                  <p>{selectedJob.additional_requirements}</p>

                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default JobPostings;
