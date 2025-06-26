import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';

const Products = () => {
    const[openModal,setOpenModal] = useState(false);
    const[categories,setCategories] = useState([]);
    const[suppliers,setSuppliers] = useState([]);

    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/products',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
            },
          });
          setSuppliers(response.data.suppliers);
          setCategories(response.data.categories);
        } catch (error) {
          console.error('Error fetching suppliers',error);
        }
    }

    useEffect(()=> {
        fetchProducts();
    },[]);

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
        <h1 className='text-2xl font-bold'> Product Management</h1>
      <div className='flex justify-between items-center'>
        <input
          type="text"
          placeholder='Search'
          className='border p-1 bg-white rounded px-4'
          
        />
        <button
          className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer'
          onClick={() =>setOpenModal(true)}
        >
          Add Product
        </button>
      </div>
      {openModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-md w-1/3 relative'>
            <h1 className='text-xl font-bold'>Add Product</h1>
            <button
              className='absolute top-4 right-4 font-bold text-lg cursor-pointer'
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
            <form className='flex flex-col gap-4 mt-4'>
              <input
                type='text'
                name='name'
                // value={formData.name}
                // onChange={handleChange}
                placeholder='Product Name'
                className='border p-1 bg-white rounded px-4'
                required
              />
              <input
                type='text'
                name='description'
                // value={formData.email}
                // onChange={handleChange}
                placeholder='Description'
                className='border p-1 bg-white rounded px-4'
                required
              />
              <input
                type='number'
                name='price'
                // value={formData.number}
                // onChange={handleChange}
                placeholder='Enter Price'
                className='border p-1 bg-white rounded px-4'
                required
              />
              <input
                type='number'
                name='stock'
                // value={formData.address}
                // onChange={handleChange}
                placeholder='Enter Stock'
                className='border p-1 bg-white rounded px-4'
                required
              />

              <div className='w-full border'>
                  <select name="category" className='w-full p-2'>
                    <option value="">Select Category</option>
                    {categories && categories.map((category) => (
                      <option key={category._id} value={category._id}>
                            {category.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div className='w-full border'>
                  <select name="supplier" className='w-full p-2'>
                    <option value="">Select Supplier</option>
                    {suppliers && suppliers.map((supplier) => (
                      <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                      </option>
                    ))}
                  </select>
              </div>

              <div className='flex space-x-2'>
                <button
                  type="submit"
                  className='w-full mt-2 rounded bg-green-500 text-white p-3 hover:bg-green-600'
                >
                  Add Product
                </button>
                
                <button
                  type='button'
                  className='w-full mt-2 rounded bg-red-500 text-white p-3 hover:bg-red-600'
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products