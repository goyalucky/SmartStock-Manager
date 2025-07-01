import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        },
      });
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/add', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        },
      });

      if (response.data.success) {
        alert("User added successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "",
        });
        fetchUsers();
      } else {
        alert("Error adding user. Please try again");
      }
    } catch (error) {
      console.error("Error adding user", error);
      alert("Error adding user. Please try again");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
          },
        });

        if (response.data.success) {
          alert("User deleted successfully");
          fetchUsers();
        } else {
          alert("Error deleting user. Please try again");
        }
      } catch (error) {
        console.error("Error deleting user", error);
        alert("Error deleting user. Please try again");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Users Management</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Form */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">Add User</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                className="border w-full p-2 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                className="border w-full p-2 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="border w-full p-2 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                className="border w-full p-2 rounded-md"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                className="border w-full p-2 rounded-md"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
              <button
                type="submit"
                className="w-full mt-2 rounded-md bg-green-500 text-white p-3 hover:bg-green-600"
              >
                Add User
              </button>
            </form>
          </div>
        </div>

        {/* Users Table */}
        <div className="lg:w-2/3">
          <input
            type="text"
            placeholder="Search"
            className="p-2 bg-white w-full mb-4 rounded"
            onChange={handleSearch}
          />
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">S No</th>
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Email</th>
                  <th className="border border-gray-200 p-2">Address</th>
                  <th className="border border-gray-200 p-2">Role</th>
                  <th className="border border-gray-200 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td className="border border-gray-200 p-2">{index + 1}</td>
                      <td className="border border-gray-200 p-2">{user.name}</td>
                      <td className="border border-gray-200 p-2">{user.email}</td>
                      <td className="border border-gray-200 p-2">{user.address}</td>
                      <td className="border border-gray-200 p-2">{user.role}</td>
                      <td className="border border-gray-200 p-2">
                        <button
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
