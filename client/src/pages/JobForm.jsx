import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editMode && id) {
      axios
        .get(`https://workbridge-upda.onrender.com/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          setValue("company", data.company);
          setValue("position", data.position);
          setValue("location", data.location);
          setValue("jobType", data.jobType);
          setValue("status", data.status);
          setValue("description", data.description);
          setValue("link", data.link);
          setValue("salary", data.salary);
          setValue("deadline", data.deadline?.split("T")[0]);
        })
        .catch(() => toast.error("Failed to fetch job details"));
    }
  }, [editMode, id, setValue, token]);

  const onSubmit = async (formData) => {
    const url = editMode
      ? `https://workbridge-upda.onrender.com/api/jobs/${id}`
      : "https://workbridge-upda.onrender.com/api/jobs";
    const method = editMode ? "put" : "post";

    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(editMode ? "Job updated successfully" : "Job created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          {editMode ? "Edit Job Post" : "Create New Job"}
        </h2>

        {/* Company */}
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          {...register("company", { required: "Company name is required" })}
          className="w-full border p-2 mb-3 rounded"
          placeholder="e.g. Google"
        />
        {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}

        {/* Position */}
        <label className="block mb-1 font-medium">Job Position</label>
        <input
          {...register("position", { required: "Position is required" })}
          className="w-full border p-2 mb-3 rounded"
          placeholder="e.g. Frontend Developer"
        />
        {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}

        {/* Location */}
        <label className="block mb-1 font-medium">Location</label>
        <input
          {...register("location", { required: "Location is required" })}
          className="w-full border p-2 mb-3 rounded"
          placeholder="e.g. Bangalore / Remote"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

        {/* Job Type */}
        <label className="block mb-1 font-medium">Job Type</label>
        <select
          {...register("jobType", { required: "Job type is required" })}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="">Select</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
          <option value="contract">Contract</option>
        </select>
        {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}

        {/* Status */}
        <label className="block mb-1 font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border p-2 mb-3 rounded"
          defaultValue="open"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        {/* Salary */}
        <label className="block mb-1 font-medium">Salary (in ₹/year)</label>
        <input
          {...register("salary")}
          className="w-full border p-2 mb-3 rounded"
          placeholder="e.g. 1200000"
          type="number"
        />

        {/* Deadline */}
        <label className="block mb-1 font-medium">Application Deadline</label>
        <input
          {...register("deadline", { required: "Deadline is required" })}
          className="w-full border p-2 mb-3 rounded"
          type="date"
        />
        {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}

        {/* Link */}
        <label className="block mb-1 font-medium">Job Link</label>
        <input
          {...register("link")}
          className="w-full border p-2 mb-3 rounded"
          placeholder="https://company.com/careers/job-id"
        />

        {/* Description */}
        <label className="block mb-1 font-medium">Job Description</label>
        <textarea
          {...register("description")}
          className="w-full border p-2 mb-5 rounded"
          rows={4}
          placeholder="Write a short description about the role..."
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition"
        >
          {editMode ? "Update Job" : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
