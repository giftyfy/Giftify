import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignIn = () => {
    const setCookie = (name, value) => {
        const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + '; path=/';
        document.cookie = cookieValue;
      };

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: formData.email,
        password: formData.password
      });
      setCookie('accessToken', response.data);
      console.log('Login Success', response.data);

      window.location.href = '/'; 
    } catch (error) {
      console.error('failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: `Invalid email or password. Please try again.`,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // إذا كنت تستخدم مكتبة react-google-login أو أي مكتبة أخرى لتسهيل عملية تسجيل الدخول باستخدام Google، يمكنك استخدامها هنا
      // استخدم مفتاح API الذي قمت بالحصول عليه من Google API Console
      const response = await axios.post("http://localhost:8080/auth/google", {
        apiKey: "YOUR_GOOGLE_API_KEY",
      });
  
      // Handle Google sign up response if needed
      console.log("success with Google:", response.data);
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  const formStyle = {
    border: "1px solid #000842",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  };

  const inputStyle = {
    border: "1px solid #A5A5A5",
    borderRadius: "8px",
    padding: "2.5px",
    height: "3rem",
    color: "rgb(92, 92, 66)",
  };

  return (
    <section className="bg-[#fffff]">
      <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <img src={logo} className="w-[12rem] self-center  whitespace-nowrap " alt=" Logo" />
        </a>
        <div style={formStyle} className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  style={inputStyle}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  style={inputStyle}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-4 flex-col items-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  style={{ background: "rgb(247, 36, 87)", border: "2px solid #A5A5A5", borderRadius: "8px", color: "white", height: "3rem", width: "100%" }}>
                  Sign in
                </button>
              </div>
            </form>
            <div className="flex space-x-4 flex-col items-center justify-center">
            <a href="http://localhost:8080/auth/google" style={{ background: "rgb(36, 49, 92)", border: "2px solid #A5A5A5", borderRadius: "8px", color: "white", height: "3rem", width: "100%", cursor: "pointer", textAlign: "center", alignContent: "center", justifyContent: "center" }}>Sign Up with Google</a>
                    {/* <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    style={{ background: "rgb(36, 49, 92)", border: "2px solid #A5A5A5", borderRadius: "8px", color: "white", height: "3rem", width: "100%", cursor: "pointer" }}>
                    Sign Up with Google
                    </button> */}
            </div>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
