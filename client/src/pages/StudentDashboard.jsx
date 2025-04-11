// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCardUser from "../components/JobCardUser";
import ApplyModal from "../components/ApplyModal";
import { useNavigate } from "react-router-dom";


const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const fetchJobs = async () => {
  //   const res = await axios.get("https://workbridge-upda.onrender.com/api/jobs/");
  //   setJobs(res.data);
  // };
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://workbridge-upda.onrender.com/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Available Jobs</h1>
      <button
          onClick={() => navigate("/applications")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          🎯 My Applications
        </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCardUser key={job._id} job={job} onApply={handleApply} />
        ))}
      </div>
      {showModal && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setShowModal(false)}
          onSubmitted={() => {
            setShowModal(false);
            // Optional: refresh applied list
          }}
        />
      )}
    </div>
  );
};

export default StudentDashboard;