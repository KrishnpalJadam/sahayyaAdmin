// import React from 'react';

// const JobPostings = () => {
//   // Static Dummy Data
//   const jobs = [
//     {
//       id: 1,
//       owner: {
//         name: "Amitabh Bachchan",
//         photo: "https://i.pravatar.cc/150?u=amitabh"
//       },
//       title: "Full-time Cook",
//       location: "Bandra West, Mumbai",
//       salary: "₹18,000 / month",
//       commitment: "Full-time",

//       status: "Active",
//       details: {
//         description: "Need experienced vegetarian cook",
//         street: "Bandra West",
//         zip: "400050",
//         schedule: "Morning + Evening",
//         skills: ["Cooking", "Hygiene"],
//         requirements: "North Indian food"
//       }
//     }
//   ];


//   return (
//     <div className="container-fluid p-4" style={{ minHeight: '100vh' }}>
//       <style>{`
//         .sahayya-btn-primary {
//           background-color: #D98C7A !important;
//           border-color: #D98C7A !important;
//           color: white !important;
//         }
//         .sahayya-btn-primary:hover {
//           background-color: #c47b6a !important;
//           border-color: #c47b6a !important;
//         }
//         .sahayya-card {
//           border: none;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.05);
//         }
//         .sahayya-table thead th {
//           background-color: #f8f9fa;
//           color: #555;
//           font-weight: 600;
//           border-bottom: 2px solid #eee;
//         }
//       `}</style>

//       {/* Page Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Job Postings</h2>

//       </div>

//       {/* Main Container */}
//       <div className="card sahayya-card p-4">

//         {/* Search + Filter Row */}
//         <div className="row g-3 mb-4">
//           <div className="col-md-4">
//             <div className="input-group">
//               <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
//               <input type="text" className="form-control border-start-0" placeholder="Search by job title..." />
//             </div>
//           </div>
//           <div className="col-md-2">
//             <select className="form-select">
//               <option value="">All Locations</option>
//               <option value="mumbai">Mumbai</option>
//               <option value="bangalore">Bangalore</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <table className="table sahayya-table align-middle">
//             <thead>
//               <tr>
//                 <th>House Owner</th>
//                 <th>Job Title</th>
//                 <th>Location</th>
//                 <th>Salary</th>
//                 <th>Commitment</th>

//                 <th>Status</th>
//                 <th className="text-end">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {jobs.map((job) => (
//                 <tr>
//                   {/* House Owner */}
//                   <td>
//                     <div className="d-flex align-items-center gap-2">
//                       <img
//                         src={job.owner.photo}
//                         className="rounded-circle"
//                         width="36"
//                         height="36"
//                       />
//                       <strong>{job.owner.name}</strong>
//                     </div>
//                   </td>

//                   {/* Job Title */}
//                   <td className="fw-bold">{job.title}</td>
//                   <td className="fw-bold">{job.location}</td>



//                   {/* Salary */}
//                   <td>{job.salary}</td>

//                   {/* Commitment */}
//                   <td>
//                     <span className="badge bg-light text-dark">
//                       {job.commitment}
//                     </span>
//                   </td>


//                   {/* Status */}
//                   <td>
//                     <span className={`badge ${job.status === "Active"
//                         ? "bg-success-subtle text-success"
//                         : "bg-secondary-subtle text-secondary"
//                       }`}>
//                       {job.status}
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td className="text-end">
//                     <button
//                       className="btn btn-sm btn-outline-secondary me-2"
//                       data-bs-toggle="modal"
//                       data-bs-target="#viewJobModal"
//                     >
//                       View
//                     </button>
//                     <button className="btn btn-sm btn-outline-warning me-2">Pause</button>
//                     <button className="btn btn-sm btn-outline-danger">Delete</button>
//                   </td>
//                 </tr>

//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* VIEW JOB MODAL */}
//         <div className="modal fade" id="viewJobModal" tabIndex="-1">
//           <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
//             <div className="modal-content border-0 rounded-4">

//               {/* HEADER */}
//               <div className="modal-header">
//                 <h5 className="modal-title fw-bold">Job Details</h5>
//                 <button className="btn-close" data-bs-dismiss="modal"></button>
//               </div>

//               {/* BODY */}
//               <div className="modal-body px-4">
//                 <div className="row g-4">

//                   {/* HOUSE OWNER INFO */}
//                   <div className="col-md-4">
//                     <div className="card p-3 h-100">
//                       <h6 className="fw-bold mb-3">House Owner</h6>
//                       <div className="d-flex align-items-center gap-3">
//                         <img
//                           src="https://i.pravatar.cc/150?u=owner"
//                           className="rounded-circle border"
//                           width="60"
//                           height="60"
//                         />
//                         <div>
//                           <div className="fw-bold">Amitabh Bachchan</div>
//                           <small className="text-muted">Mumbai, Maharashtra</small>
//                         </div>
//                       </div>
//                       <hr />
//                       <small className="text-muted">Contact</small>
//                       <div className="fw-bold">+91 98765 43210</div>
//                     </div>
//                   </div>

//                   {/* JOB DETAILS */}
//                   <div className="col-md-8">
//                     <div className="card p-3 h-100">

//                       {/* JOB DETAILS */}
//                       <h6 className="fw-bold mb-2">Job Details</h6>
//                       <div className="mb-3">
//                         <small className="text-muted">Job Role</small>
//                         <div className="fw-bold">Full-time Cook</div>
//                       </div>
//                       <div className="mb-3">
//                         <small className="text-muted">Job Description</small>
//                         <p className="mb-0">
//                           Looking for an experienced cook who can prepare North Indian meals
//                           for a family of four.
//                         </p>
//                       </div>

//                       {/* COMPENSATION */}
//                       <h6 className="fw-bold mt-4 mb-2">Compensation</h6>
//                       <div className="row">
//                         <div className="col-md-6">
//                           <small className="text-muted">Expected Salary</small>
//                           <div className="fw-bold">₹18,000 / month</div>
//                         </div>
//                         <div className="col-md-6">
//                           <small className="text-muted">Pay Type</small>
//                           <div className="fw-bold">Monthly</div>
//                         </div>
//                       </div>

//                       {/* LOCATION */}
//                       <h6 className="fw-bold mt-4 mb-2">Location Details</h6>
//                       <div className="mb-2">
//                         <small className="text-muted">Street Address</small>
//                         <div className="fw-bold">
//                           Flat 402, Sunrise Apartments, Bandra West
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-4">
//                           <small className="text-muted">City</small>
//                           <div className="fw-bold">Mumbai</div>
//                         </div>
//                         <div className="col-md-4">
//                           <small className="text-muted">State</small>
//                           <div className="fw-bold">Maharashtra</div>
//                         </div>
//                         <div className="col-md-4">
//                           <small className="text-muted">Zip Code</small>
//                           <div className="fw-bold">400050</div>
//                         </div>
//                       </div>

//                       {/* WORKING SCHEDULE */}
//                       <h6 className="fw-bold mt-4 mb-2">Working Schedule</h6>
//                       <div className="mb-2">
//                         <small className="text-muted">Preferred Hours / Days</small>
//                         <div className="fw-bold">8 AM – 6 PM (Monday – Saturday)</div>
//                       </div>

//                       {/* COMMITMENT */}
//                       <h6 className="fw-bold mt-4 mb-2">Commitment Type</h6>
//                       <span className="badge bg-success-subtle text-success">
//                         Full-time
//                       </span>

//                       {/* REQUIREMENTS */}
//                       <h6 className="fw-bold mt-4 mb-2">Additional Requirements</h6>
//                       <p className="mb-0">
//                         Experience with elderly family members preferred.
//                         Must be hygienic and punctual.
//                       </p>

//                       {/* SKILLS */}
//                       <h6 className="fw-bold mt-4 mb-2">Required Skills</h6>
//                       <div className="d-flex flex-wrap gap-2">
//                         <span className="badge bg-light text-dark">North Indian Cooking</span>
//                         <span className="badge bg-light text-dark">Vegetarian</span>
//                         <span className="badge bg-light text-dark">Kitchen Hygiene</span>
//                       </div>

//                     </div>
//                   </div>

//                 </div>
//               </div>

//               {/* FOOTER */}
//               <div className="modal-footer">

//                 <button className="btn btn-light" data-bs-dismiss="modal">
//                   Close
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center mt-4">
//           <span className="text-muted small">Showing 1 to 3 of 3 jobs</span>
//           <nav>
//             <ul className="pagination pagination-sm mb-0">
//               <li className="page-item disabled"><span className="page-link">Previous</span></li>
//               <li className="page-item active"><span className="page-link" style={{ backgroundColor: '#D98C7A', borderColor: '#D98C7A' }}>1</span></li>
//               <li className="page-item"><span className="page-link text-dark">Next</span></li>
//             </ul>
//           </nav>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default JobPostings;
















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
    return owner ? owner.name : "Unknown";
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
