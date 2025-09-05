import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminCount = () => {
    axios.get("http://localhost:5000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:5000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:5000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      }
    });
  };

  const adminRecords = () => {
    axios.get("http://localhost:5000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      }
    });
  };

  return (
    <div className="p-6">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Admin</h4>
          <hr className="my-3" />
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{adminTotal}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Employee</h4>
          <hr className="my-3" />
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{employeeTotal}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Salary</h4>
          <hr className="my-3" />
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{salaryTotal}</span>
          </div>
        </div>
      </div>

      {/* Admin List Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          List of Admins
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 text-gray-700">{admin.email}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center text-gray-500 py-4 italic"
                  >
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
