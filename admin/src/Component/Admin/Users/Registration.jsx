import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import RegValidate from './RegValidate';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
 const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const [values,setValues]=useState({ user_username:'' , user_email:'', user_password:''});

// Handle the change in inputs
const handleInputs=(e)=>{
    setValues({...values, [e.target.name]: e.target.value}) ;       
   console.log("values",values)
}

// Handle submit for the form 
const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if there are any validation errors before sending the data
    try {
      console.log("first");
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:8080/adminLogin', values)
        // Registration was successful
        console.log('Registration successful:', response.data);
        document.cookie = `accessToken=${response.data}; path=/`;
        navigate('/dashboard')
    } catch (error) {
      // Handle network or other errors
      console.error('Registration error:', error);
    }
}

  return (
    <>
    
    <div className=" mx-auto flex justify-center h-[45rem] max-w-lg flex-col md:max-w-none md:flex-row  md:pr-10 md:my-10 lg:my-10 my-96 ">

  <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-900 px-4 py-20 text-white sm:px-10 md:m-6 md:mr-8"
>
    <p className="mb-28 font-bold tracking-wider">Giftify</p>
    <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
  Welcome back<br />
  Manage your gifts with ease
</p>
<p className="mb-28 leading-relaxed text-gray-200">
Streamline your tasks,
  analyze data effortlessly, and make informed decisions for a seamless gift
  management experience.
</p>
  
  </div>
  <form onSubmit={handleSubmit} className=" px-4 py-20 ">
    <h2 className="mb-2 text-3xl font-bold">Login</h2>
    <p className="mb-1 font-medium text-gray-500">Email</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="email"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your email"
          name='user_email'
        />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Password</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-[#219C90] relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input
          type="password"
          onChange={handleInputs}
          className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Choose a password (minimum 8 characters)"
          name='user_password'
        />
      </div>
    </div>
    <button
  type="submit"
  className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 px-10 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
>
  Login
</button>
  </form></div>
    </>
  )
}

export default Registration