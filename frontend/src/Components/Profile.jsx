import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    // Fetch admin data (replace with your API)
    axios
      .get("http://localhost:5000/admin/profile", { withCredentials: true })
      .then((res) => setAdmin(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src={admin.image ? `http://localhost:5000/Images/${admin.image}` : "/default-avatar.png"}
            alt={admin.name}
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{admin.name || "Admin Name"}</h2>
          <p className="text-gray-500 mb-4">{admin.role || "Administrator"}</p>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{admin.email || "admin@example.com"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Phone:</span>
            <span>{admin.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Joined:</span>
            <span>{admin.joined || "N/A"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
