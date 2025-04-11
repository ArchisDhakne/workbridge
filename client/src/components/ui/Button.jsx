import React from "react";

const Button = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
