import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router';

const Users = () => {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        role: "",
    })
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        },
      });
      setUsers(response.data.users);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching users", error);
       setLoading(false);
    } 
  };

  useEffect(() => {
    // fetchUsers();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
       const response = await axios.post('http://localhost:3001/api/users/add', formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        }
    }
  };
  if(response.data.success){
    alert("Users added successfully");
    setFormData({
        name:"",
        email:"",
        password:"",
        address:"",
        role: "",
        })
  } else{
    console.log("Error adding user");
    alert("Error adding user. Please try again");
  }
};

 

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
    if (confirmDelete) {
      const token = localStorage.getItem('stock-token');
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          alert("User deleted successfully");
        //   fetchCategories();
        } else {
            console.error("Error deleting User");
          alert("Error deleting user. Please try again");
        }
      } catch (error) {
        console.error("Error deleting user", error);
        alert("Error deleting user. Please try again");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Users Management</h1>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>
              {editCategory ? 'Edit Category' : 'Add Category'}
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
              <input
                type="text"
                placeholder='Enter Name'
                name="name"
                className='border w-full p-2 rounded-md'
                onChange={handleChange}
                required
              />
                </div>
                <div>
              <input
                type="email"
                placeholder='Enter Email'
                name='email'
                className='border w-full p-2 rounded-md'
                onChange={handleChange}
              />
                </div>
                <div>
              <input
                type="password"
                placeholder='Enter Password'
                name='password'
                className='border w-full p-2 rounded-md'
                onChange={handleChange}
              />
                </div>
                <div>
              <input
                type="address"
                placeholder='Enter address'
                name='address'
                className='border w-full p-2 rounded-md'
                onChange={handleChange}
              />
                </div>
                <div>
              <input
                type="address"
                placeholder='Enter address'
                name='address'
                className='border w-full p-2 rounded-md'
                onChange={handleChange}
              />
                </div>
                <div>
                     <select name="role"  className='border w-full p-2 rounded-md' >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>

                    </select>   
                </div>
              <div className='flex space-x-2'>
                <button
                  type="submit"
                  className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='lg:w-2/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <table className='w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-200 p-2'>S No</th>
                  <th className='border border-gray-200 p-2'>Name</th>
                  <th className='border border-gray-200 p-2'>Email</th>
                  <th className='border border-gray-200 p-2'>Address</th>
                  <th className='border border-gray-200 p-2'>Role</th>
                  <th className='border border-gray-200 p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user, index) => (
                  <tr key={category._id}>
                    <td className='border border-gray-200 p-2'>{index + 1}</td>
                    <td className='border border-gray-200 p-2'>{user.name}</td>
                    <td className='border border-gray-200 p-2'>{user.email}</td>
                    <td className='border border-gray-200 p-2'>{user.address}</td>
                    <td className='border border-gray-200 p-2'>{user.role}</td>
                    <td className='border border-gray-200 p-2'>
                      <button
                        className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center p-4">No categories found</td>
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
