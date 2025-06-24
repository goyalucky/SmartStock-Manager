import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [addModal, setAddModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/supplier', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
        },
      });
      setSuppliers(response.data.suppliers);
      setFilteredSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      number: supplier.number,
      address: supplier.address,
    });
    setAddModal(true);
    setEditSupplier(supplier._id);
  };

  const closeModal = () => {
    setAddModal(false);
    setFormData({
      name: '',
      email: '',
      number: '',
      address: '',
    });
    setEditSupplier(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSupplier) {
        const response = await axios.put(
          `http://localhost:3001/api/supplier/${editSupplier}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
            },
          }
        );
        if (response.data.success) {
          fetchSuppliers();
          alert('Supplier updated successfully');
          closeModal();
        }
      } else {
        const response = await axios.post(
          'http://localhost:3001/api/supplier/add',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
            },
          }
        );
        if (response.data.success) {
          fetchSuppliers();
          alert('Supplier added successfully');
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error submitting supplier', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Supplier?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/supplier/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('stock-token')}` },
          }
        );
        if (response.data.success) {
          alert("Supplier deleted successfully");
          fetchSuppliers();
        }
      } catch (error) {
        console.error("Error deleting supplier", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleSearch = (e) => {
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Supplier Management</h1>
      <div className='flex justify-between items-center'>
        <input
          type="text"
          placeholder='Search'
          className='border p-1 bg-white rounded px-4'
          onChange={handleSearch}
        />
        <button
          className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer'
          onClick={() => setAddModal(true)}
        >
          Add Supplier
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div>
          <table className='w-full border-collapse border border-gray-300 mt-4'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border p-2'>S No</th>
                <th className='border p-2'>Supplier Name</th>
                <th className='border p-2'>Email</th>
                <th className='border p-2'>Phone Number</th>
                <th className='border p-2'>Address</th>
                <th className='border p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td className='border p-2'>{index + 1}</td>
                  <td className='border p-2'>{supplier.name}</td>
                  <td className='border p-2'>{supplier.email}</td>
                  <td className='border p-2'>{supplier.number}</td>
                  <td className='border p-2'>{supplier.address}</td>
                  <td className='border p-2'>
                    <button
                      className='px-2 py-1 bg-yellow-500 text-white rounded mr-2'
                      onClick={() => handleEdit(supplier)}
                    >
                      Edit
                    </button>
                    <button
                      className='px-2 py-1 bg-red-500 text-white rounded'
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSuppliers.length === 0 && <div>No Records</div>}
        </div>
      )}

      {addModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-md w-1/3 relative'>
            <h1 className='text-xl font-bold'>{editSupplier ? 'Edit Supplier' : 'Add Supplier'}</h1>
            <button
              className='absolute top-4 right-4 font-bold text-lg cursor-pointer'
              onClick={closeModal}
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
  );
};

export default Suppliers;
