// src/components/ApplyModal.jsx
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyModal = ({ job, onClose, onSubmitted }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/applications",
        {
          company: job.company,
          role: job.position || job.role || job.title,
          link: job.link,
          date,
          status: "applied",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Application submitted!");
      onSubmitted(); // trigger parent update
      onClose();     // close modal
    } catch (err) {
      console.error("Apply error:", err.response?.data || err.message);
      toast.error("❌ Failed to apply for the job");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] md:w-[400px] space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">Apply to {job.position || job.title}</h2>
        <p className="text-gray-600">{job.company}</p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
