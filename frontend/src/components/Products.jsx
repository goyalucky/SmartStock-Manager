import React from 'react'
import { useState } from 'react'

const Products = () => {
    const[openModal,setOpenModal] = useState(false)
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
              onClick={}
            >
              X
            </button>
            <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Supplier Name'
                className='border p-2 rounded'
                required
              />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Supplier Email'
                className='border p-2 rounded'
                required
              />
              <input
                type='number'
                name='number'
                value={formData.number}
                onChange={handleChange}
                placeholder='Supplier Phone Number'
                className='border p-2 rounded'
                required
              />
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Supplier Address'
                className='border p-2 rounded'
                required
              />
              <div className='flex space-x-2'>
                <button
                  type="submit"
                  className='w-full mt-2 rounded bg-green-500 text-white p-3 hover:bg-green-600'
                >
                  {editSupplier ? 'Save Changes' : 'Add Supplier'}
                </button>
                <button
                  type='button'
                  className='w-full mt-2 rounded bg-red-500 text-white p-3 hover:bg-red-600'
                  onClick={closeModal}
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