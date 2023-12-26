import React, { useState } from 'react';
const AddDriverForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
        // f_name: '',
        // l_name: '',
        email: '',
        driver_license: '',
        driver_location: '',
        plate_number: '',
       status:'available'
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring"
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
  
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-500" htmlFor="driver_license">
                Driver License
              </label>
              <input
                className="rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring"
                name="driver_license"
                id="driver_license"
                type="text"
                placeholder="+962"
                value={formData.driver_license}
                onChange={handleInputChange}
                required
              />
            </div>
  
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-500" htmlFor="driver_location">
                Driver Location
              </label>
              <input
                className="rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring"
                name="driver_location"
                id="driver_location"
                type="text"
                value={formData.driver_location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-500" htmlFor="plate_number">
              Plate Number
            </label>
            <input
              className="rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring"
              name="plate_number"
              id="plate_number"
              type="text"
              placeholder="Plate Number"
              value={formData.plate_number}
              onChange={handleInputChange}
              required
            />
          </div>
  
          <div className="flex justify-between">
            <button
              type="submit"
              className="group flex items-center justify-center rounded-lg bg-blue-900 py-2 text-white font-bold w-1/3 focus:ring"
            >
              ADD
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                required
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
  
            <button
              className="group flex items-center justify-center rounded-lg bg-gray-200 py-2 text-gray-600 font-bold w-1/2 focus:ring hover:bg-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverForm;