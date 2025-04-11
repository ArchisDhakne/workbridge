import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // You need to install: npm install jwt-decode

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.name || decoded.username || "User");
      } catch (err) {
        console.error("Token decode failed", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-emerald-400 tracking-tight">
          JobTracker
        </h1>

        <div className="hidden md:flex items-center gap-6">
          <p className="text-sm text-white/80">Hi, <span className="font-semibold text-white">{username}</span></p>
          <button
            onClick={handleLogout}
            className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden mt-3 space-y-2 text-center border-t pt-3 border-slate-700">
          <p className="text-sm">Hi, <span className="font-semibold text-white">{username}</span></p>
          <button
            onClick={handleLogout}
            className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
