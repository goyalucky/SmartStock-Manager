import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchCategories = async () => {
         setLoading(true);
        try {
          const response = await axios.get('http://localhost:3001/api/category',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
            },
          });
          console.log(response.data.categories);
          setCategories(response.data.categories);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching categories", error);
          setLoading(false);
        }
      };
      fetchCategories();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/category/add',
        { categoryName, categoryDescription },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
          },
        }
      );

      if (response.data.success) {
        alert("Category Added Successfully");
        setCategoryName("");
        setCategoryDescription("");
      } else {
        console.log("Error adding category", response.data);
        alert("Error adding category. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred while adding the category.");
    }
  };

  if(loading) return <div>Loading...</div>

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Category Management</h1>

      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>Add Category</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={categoryName}
                  placeholder='Category Name'
                  className='border w-full p-2 rounded-md'
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={categoryDescription}
                  placeholder='Category Description'
                  className='border w-full p-2 rounded-md'
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className='w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
        <div className='lg:w-2/3'>
            <div className='bg-white shadow-md rounded-lg p-4'>
                <table className='w-full border-collapse border border-gray-200'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border border-gray-200 p-2'>Category Name</th>
                        <th className='border border-gray-200 p-2'>Description</th>
                        <th className='border border-gray-200 p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category._id}>
                            <td className='border border-gray-200 p-2'>{category.categoryName}</td>
                            <td className='border border-gray-200 p-2'>{category.categoryDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
