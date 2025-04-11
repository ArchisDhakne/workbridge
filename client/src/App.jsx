import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReqDashboard from "./pages/ReqDashboard";
import JobForm from "./pages/JobForm";
import StudentDashboard from "./pages/StudentDashboard";
import ApplicationTracker from "./pages/ApplicationTracker";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const AppContent = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 add loading state
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch  {
        localStorage.removeItem("token");
        setRole(null);
      }
    } else {
      setRole(null);
    }
  
    setLoading(false);
  }, [location.pathname]);

  const isAuthenticated = !!localStorage.getItem("token");
  const isRecruiter = role === "recruiter";
  const isStudent = role === "student";

  if (loading) return null; // 👈 block rendering while checking role

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800">
      <ToastContainer position="top-center" />
      {!["/login", "/signup"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Recruiter Routes */}
        <Route
          path="/recdashboard"
          element={isRecruiter ? <ReqDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-job"
          element={isRecruiter ? <JobForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isRecruiter ? <JobForm editMode /> : <Navigate to="/login" />}
        />

        {/* Student Routes */}
        <Route
          path="/studashboard"
          element={isStudent ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/applications"
          element={isStudent ? <ApplicationTracker /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            isAuthenticated
              ? role === "student"
                ? <Navigate to="/studashboard" />
                : role === "recruiter"
                ? <Navigate to="/recdashboard" />
                : <Navigate to="/login" />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
