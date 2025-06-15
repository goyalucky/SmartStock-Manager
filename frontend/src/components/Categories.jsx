import React from 'react';

const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Category Management</h1>

      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-center text-xl font-bold mb-4'>Add Category</h2>
            <form className='space-y-4' onSUbmit={handleSubmit}> 
              <div>
                <input
                  type="text"
                  placeholder='Category Name'
                  className='border w-full p-2 rounded-md'
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
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
      </div> {/* <-- closed this div */}
    </div>
  );
}

export default Categories;
