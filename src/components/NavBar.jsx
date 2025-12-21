import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-700">
          Public Infrastructure
        </Link>
        <div className="space-x-4">
          <Link to="/all-issues" className="hover:text-green-500">All Issues</Link>
          <Link to="/login" className="hover:text-green-500">Login</Link>
          <Link to="/signup" className="hover:text-green-500">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
