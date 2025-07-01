import React,{useState,useEffect} from 'react'
import axios from 'axios'


const CustomerProducts = () => {
     const[categories,setCategories] = useState([]);
        const [products,setProducts] = useState([]);
        const [filteredProducts,setFilteredProducts] = useState([]);

         const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/products',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stock-token')}`,
            },
          });
          if(response.data.success){
            setCategories(response.data.categories);
            setProducts(response.data.products);
            setFilteredProducts(response.data.products);
          } else{
            console.error("Error fetching products",response.data.message);
            alert('Error fetching products. Please try again');
          }
        } catch (error) {
          console.error('Error fetching suppliers',error);
        }
    }

    useEffect(()=> {
        fetchProducts();
    },[]);

      const handleSearch = (e) => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <div>
        <div className='py-4 px-6'>
            <h2 className='font-bold text-xl'>Products</h2>
        </div>
        <div className='py-4 px-6 flex justify-between items-center'>
            <div>
                Select
            </div>
            <div>
                   <input
          type="text"
          placeholder='Search'
          className='border p-1 bg-white rounded px-4'
          onChange={handleSearch}
        />
            </div>
        </div>
            <div>
          <table className='w-full border-collapse border border-gray-300 mt-4'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>S No</th>
                <th className='border border-gray-300 p-2'>Product Name</th>
                <th className='border border-gray-300 p-2'>Category Name</th>
                <th className='border border-gray-300 p-2'>Price</th>
                <th className='border border-gray-300 p-2'>Stock</th>
                <th className='border border-gray-300 p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts && filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className='border border-gray-300 p-2'>{index + 1}</td>
                  <td className='border border-gray-300 p-2'>{product.name}</td>
                  <td className='border border-gray-300 p-2'>{product.categoryId.categoryName}</td>
                  <td className='border border-gray-300 p-2'>{product.price}</td>
                  <td className='border border-gray-300 p-2'>
                    <span className='rounded-full font-semibold'>
                      {product.stock == 0 ? (
                        <span className='bg-red-100 text-red-500 px-2 py-1 rounded-full'>{product.stock}</span>
                      ): product.stock < 5 ?(
                          <span className='bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full'>{product.stock}</span>
                      ):(<span className='bg-green-100 text-green-500 px-2 py-1 rounded-full'>{product.stock}</span>)}
                    </span>
                  </td>
                  <td className='border border-gray-300 p-2'>
                    <button
                      className='px-2 py-1 bg-yellow-500 text-white rounded mr-2'
                    >
                      Order
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         {filteredProducts.length === 0 && <div>No records</div>}
        </div>

    </div>
  )
}

export default CustomerProducts