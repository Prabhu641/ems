import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to EMS
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please select your login type to continue
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition transform hover:-translate-y-1"
            onClick={() => navigate("/employee_login")}
          >
            Employee
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium shadow hover:bg-green-700 transition transform hover:-translate-y-1"
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
