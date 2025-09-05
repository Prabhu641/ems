import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/employee")
      .then((result) => {
        console.log("Employee API Response:", result.data);
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          setEmployee(result.data); // if backend just returns array
        }
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(employee.filter((emp) => emp.id !== id));
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center mb-4">
        <h3 className="text-xl font-semibold">Employee List</h3>
      </div>

      <Link
        to="/dashboard/add_employee"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
      >
        Add Employee
      </Link>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-md shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Address</th>
              <th className="px-4 py-2 border-b text-left">Salary</th>
              <th className="px-4 py-2 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{e.name}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={`http://localhost:5000/Images/${e.image}`}
                    className="w-12 h-12 object-cover rounded-full border"
                    alt={e.name}
                  />
                </td>
                <td className="py-2 px-4 border-b">{e.email}</td>
                <td className="py-2 px-4 border-b">{e.address}</td>
                <td className="py-2 px-4 border-b">{e.salary}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/dashboard/edit_employee/${e.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs min-w-[60px] text-center"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs min-w-[60px] text-center"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
