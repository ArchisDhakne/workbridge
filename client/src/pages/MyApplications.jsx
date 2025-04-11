// src/pages/AppliedJobsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
const statusOptions = ["applied", "interview", "offer", "rejected"];

const AppliedJobsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchApplications = async () => {
    const res = await axios.get("https://workbridge-upda.onrender.com/api/applications", {
      params: filter ? { status: filter } : {},
    });
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const updateStatus = async (id, status) => {
    await axios.patch(`https://workbridge-upda.onrender.com/api/applications/${id}`, { status });
    fetchApplications();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Applications</h1>
      <select
        className="border p-2 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="grid md:grid-cols-2 gap-4">
        {applications.map((app) => (
          <div key={app._id} className="border p-4 rounded-xl shadow space-y-2">
            <h2 className="text-xl font-semibold">{app.role}</h2>
            <p className="text-gray-600">{app.company}</p>
            <p>Status: {app.status}</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <Button
                  key={s}
                  variant={app.status === s ? "default" : "outline"}
                  onClick={() => updateStatus(app._id, s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
