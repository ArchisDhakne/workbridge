import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const JobCardUser = ({ job }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (applied || loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const today = new Date().toISOString().split("T")[0];

      await axios.post(
        "https://workbridge-upda.onrender.com/api/applications",
        {
          company: job.company,
          role: job.position || job.role || job.title,
          link: job.link,
          date: today,
          status: "applied",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Application submitted!");
      setApplied(true);
    } catch (err) {
      console.error("Apply error:", err.response?.data || err.message);
      toast.error("❌ Failed to apply for the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200 border border-gray-200">
      <h2 className="text-xl font-semibold text-blue-600">{job.company}</h2>
      <p className="text-gray-700 mt-1">
        <span className="font-medium">Role:</span> {job.position}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Location:</span> {job.location}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Salary:</span> ₹{job.salary} P.A
      </p>
      <p className="text-gray-600">
        <span className="font-medium">End Date:</span> {job.deadline}
      </p>

      <div className="mt-4">
        <button
          onClick={handleApply}
          disabled={applied || loading}
          className={`px-4 py-2 rounded-lg transition ${
            applied
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {applied ? "Applied" : loading ? "Applying..." : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default JobCardUser;
