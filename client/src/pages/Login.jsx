import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode"; // ✅ correct named import

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Login failed");

      // ✅ Save token to localStorage
      localStorage.setItem("token", result.token);

      // ✅ Decode token to get role
      const decoded = jwtDecode(result.token);
      const role = decoded.role;

      toast.success("Login successful 🚀");
       console.log(decoded);
       console.log(role);
       
       
      // ✅ Navigate based on role
      if (role === "student") {
        window.location.href = "/studashboard";

      } else if (role === "recruiter") {
        window.location.href = "/recdashboard";
      } else {
        navigate("/abcd"); // fallback
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
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-emerald-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
