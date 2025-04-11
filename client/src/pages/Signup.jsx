import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Signup failed");

      localStorage.setItem("token", result.token);
      toast.success("Signup successful 🚀");

      // Decode role from token if needed OR just check `data.role`
      if (data.role === "student") {
        navigate("/studashboard");
      } else if(data.role === 'recruiter') {
        navigate("/recdashboard");
      }else{
           navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">
          Sign Up
        </h2>

        <div className="mb-4">
          <input
            type="text"
            {...register("username", { required: "Name is required" })}
            placeholder="User Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-emerald-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
