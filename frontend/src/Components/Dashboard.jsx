import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Layers,
  User,
  LogOut,
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:5000/auth/logout").then((result) => {

      if (result.data.Status) {
        localStorage.removeItem("valid")
        navigate("/");
      }
    });
  };

  // Utility for active link styling
  const linkClasses = (path) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
      location.pathname === path
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-700 flex justify-center items-center">
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            EMS
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-3">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </Link>

          <Link to="/dashboard/employee" className={linkClasses("/dashboard/employee")}>
            <Users className="w-5 h-5 mr-3" />
            <span>Manage Employees</span>
          </Link>

          <Link to="/dashboard/category" className={linkClasses("/dashboard/category")}>
            <Layers className="w-5 h-5 mr-3" />
            <span>Category</span>
          </Link>

          <Link to="/dashboard/profile" className={linkClasses("/dashboard/profile")}>
            <User className="w-5 h-5 mr-3" />
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300 mt-6 shadow-md"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-5 flex justify-between items-center sticky top-0 z-10">
          <h4 className="text-xl font-semibold text-gray-800 ">
            Employee Management System
          </h4>
          <span className="text-gray-500 text-sm">Admin Panel</span>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
