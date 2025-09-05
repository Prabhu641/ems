import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/detail/" + id)
      .then((res) => setEmployee(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/employee/logout")
      .then((res) => {
        if (res.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 shadow bg-white text-center">
        <h4 className="text-xl font-bold">Employee Management System</h4>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-6">
        {employee.image && (
          <img
            src={`http://localhost:5000/Images/${employee.image}`}
            alt={employee.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
        )}

        <div className="flex flex-col items-center space-y-2 text-gray-800">
          <h3 className="text-lg font-semibold">Name: {employee.name}</h3>
          <h3 className="text-lg font-semibold">Email: {employee.email}</h3>
          <h3 className="text-lg font-semibold">Salary: ${employee.salary}</h3>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Edit
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
