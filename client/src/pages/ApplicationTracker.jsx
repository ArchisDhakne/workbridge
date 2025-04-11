// src/pages/ApplicationTracker.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://workbridge-upda.onrender.com/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://workbridge-upda.onrender.com/api/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully!");
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://workbridge-upda.onrender.com/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Application deleted successfully!");
      fetchApplications();
    } catch (err) {
      console.error("Error deleting application:", err);
      toast.error("Failed to delete application.");
    }
  };

  const filteredApps =
    filterStatus === "All"
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold">📋 My Applications</h1>

      {/* Filter Dropdown */}
      <div>
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Grid of Applications */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-blue-600">{app.company}</h2>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Role:</span> {app.role}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Applied On:</span>{" "}
                {new Date(app.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                    app.status === "Interview"
                      ? "bg-yellow-200 text-yellow-800"
                      : app.status === "Offer"
                      ? "bg-green-200 text-green-800"
                      : app.status === "Rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {app.status}
                </span>
              </p>
              {app.link && (
                <p className="text-sm">
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    Application Link
                  </a>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <select
                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                defaultValue={app.status}
                className="text-sm border rounded px-2 py-1"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>

              <button
                onClick={() => handleDelete(app._id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm px-2 py-1 border rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
