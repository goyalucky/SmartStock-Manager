import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/category', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        },
      });
      console.log(response.data.categories);
      setCategories(response.data.categories);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('stock-token');

    try {
      let response;
      if (editCategory) {
        // Update category
        response = await axios.put(
          `http://localhost:3001/api/category/${editCategory}`,
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          alert("Category updated successfully");
        } else {
          alert("Failed to update category");
        }
      } else {
        // Add new category
        response = await axios.post(
          "http://localhost:3001/api/category/add",
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          alert("Category added successfully");
        } else {
          alert("Failed to add category");
        }
      }

      setCategoryName("");
      setCategoryDescription("");
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category", error);
      alert("An error occurred. Check console.");
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  const handleCancel = () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      const token = localStorage.getItem('stock-token');
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/category/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          alert("Category deleted successfully");
          fetchCategories();
        } else {
          alert("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category", error);
        alert("An error occurred. Check console.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Category Management</h1>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>
              {editCategory ? 'Edit Category' : 'Add Category'}
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <input
                type="text"
                value={categoryName}
                placeholder='Category Name'
                className='border w-full p-2 rounded-md'
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
              <input
                type="text"
                value={categoryDescription}
                placeholder='Category Description'
                className='border w-full p-2 rounded-md'
                onChange={(e) => setCategoryDescription(e.target.value)}
                required
              />
              <div className='flex space-x-2'>
                <button
                  type="submit"
                  className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'
                >
                  {editCategory ? 'Save Changes' : 'Add Category'}
                </button>
                {editCategory && (
                  <button
                    type='button'
                    className='w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600'
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
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
                  <th className='border border-gray-200 p-2'>Category Name</th>
                  <th className='border border-gray-200 p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category._id}>
                    <td className='border border-gray-200 p-2'>{index + 1}</td>
                    <td className='border border-gray-200 p-2'>{category.categoryName}</td>
                    <td className='border border-gray-200 p-2'>
                      <button
                        className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2'
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
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

export default Categories;
