import React, { useEffect, useState } from 'react'

const EditPopupProductData = ({ Product, isOpen, onClose, onSubmit }) => {
    const [editedProduct, setEditedProduct] = useState(Product);

  useEffect(() => {
    setEditedProduct(Product);
  }, [Product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

//  Product_title, category, price, Product_description, product_type, count
  
  return (
    isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white w-96 p-6 rounded-lg z-10 my-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(editedProduct); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="Product_title"
                  value={editedProduct.Product_title}
                  onChange={handleChange}
                  
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input
                  type="text"
                  name="Product_description"
                  value={editedProduct.Product_description}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  value={editedProduct.image}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            
              <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Product Price
            </label>
                    <input
          className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
          name="price"
          id="price"
          type='text'
          placeholder='price'
          value={editedProduct.price}
          onChange={handleChange}
           required
        />
          </div>
            

          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Product count
            </label>
                    <input
          className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
          name="count"
          id="count"
          type='text'
          placeholder='count'
          value={editedProduct.count}
          onChange={handleChange}
           required
        />
          </div>

          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Product type
            </label>
            <select
                className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                name="product_type"
                id="product_type"
                value={editedProduct.product_type}
                onChange={handleChange}
                required
            >
                <option value="" disabled>Select Product State</option>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Winter">Winter</option>
                <option value="Christmas">Christmas</option>
                {/* Add more options as needed */}
            </select>
          </div>


          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
            Product category
            </label>
            <select
                className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                name="category"
                id="category"
                value={editedProduct.category}
                onChange={handleChange}
                required
            >
                <option value="" disabled>Select Product State</option>
                <option value="1">Gifts</option>
                <option value="2">Packges</option>
                <option value="3">Cards</option>
                <option value="4">Cake and sweets</option>
                {/* Add more options as needed */}
            </select>
          </div>


              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-teal-400 focus:outline-none focus:shadow-outline-blue"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };
  

  

export default EditPopupProductData