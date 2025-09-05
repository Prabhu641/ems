import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-6 mt-6">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Category Management
        </h3>
        <Link
          to="/dashboard/add_category"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Add Category
        </Link>
      </div>

      {/* Category Table Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((c, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6">{c.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="py-6 px-6 text-center text-gray-500 italic"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
