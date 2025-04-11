import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    const res = await fetch("https://workbridge-upda.onrender.com/api/jobs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`https://workbridge-upda.onrender.com/api/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchJobs();
    }
  };

  const handleEditClick = () => {
    alert("🚧 Coming Soon: This service is not available yet!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-emerald-600 tracking-tight">
            Job Dashboard
          </h2>
          <Link
            to="/add-job"
            className="bg-emerald-500 hover:bg-emerald-600 transition text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Job
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-slate-200 transition-all"
            >
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-slate-800">
                  {job.role}{" "}
                  <span className="text-slate-500 font-normal">
                    @ {job.company}
                  </span>
                </h3>
                <p className="text-sm text-slate-400">{job.date?.split("T")[0]}</p>
              </div>

              <div
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium bg-${getStatusColor(job.status)}-100 text-${getStatusColor(job.status)}-700 capitalize`}
              >
                {job.status || "unknown"}
              </div>

              <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                {job.description}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleEditClick}
                  className="text-sm bg-yellow-300 text-white px-3 py-1 rounded opacity-60 cursor-not-allowed"
                  disabled
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getStatusColor(status) {
  switch (status) {
    case "applied":
      return "blue";
    case "interview":
      return "yellow";
    case "offer":
      return "green";
    case "rejected":
      return "red";
    default:
      return "gray";
  }
}

export default Dashboard;
