import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/jobs/${job._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        toast.success("Job deleted successfully!");
        onDelete(job._id); // Remove from UI
      }
    } catch {
      toast.error("Failed to delete the job.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${job._id}`);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md mb-4 border border-slate-200">
      <h3 className="text-xl font-semibold text-emerald-600">{job.role}</h3>
      <p className="text-slate-700">Company: <strong>{job.company}</strong></p>
      <p className="text-sm text-slate-500 mb-2">Status: {job.status}</p>
      <p className="text-sm text-slate-500 mb-2">
        Date Applied: {new Date(job.date).toLocaleDateString()}
      </p>
      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm"
        >
          View Job Posting
        </a>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleEdit}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
