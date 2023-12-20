import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../assets/logo.jpg';

const SignUp = () => {
  const [f_name, setfirstName] = useState("");
  const [l_name, setlastName] = useState("");

  const [userlocation, setlocation] = useState("");
  const [usernumber, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUp = async () => {

    const setCookie = (name, value) => {
        const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + '; path=/';
        document.cookie = cookieValue;
      };

    if (!agreeToTerms) {
      alert("You must agree to the terms of service.");
      return;
    }

    // if (password !== confirmPassword) {
    //   setPasswordError("Passwords do not match");
    //   return;
    // } else if (password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    //   setPasswordError("Password must be at least 8 characters and include numbers, lowercase and uppercase letters, and special characters.");
    //   return;
    // } else {
    //   setPasswordError("");
    // }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post("http://localhost:8080/register", {
       f_name,
       l_name,
        email,
        password,
        phone_number: usernumber,
      });
      setCookie('accessToken', response.data);
      console.log("success register", response.data);
      setRegistrationMessage("Register suceess");
      setShowSuccessModal(true);
      window.location.href= '/';
    } catch (error) {
      console.error("Regster Failed", error);
      setRegistrationMessage("Regster Failed");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

//   const signInWithGoogle = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/login');
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

// //   const handleGoogleSignUp = () => {
// //     window.location.href = "http://localhost:3001/google";
// //   };



// Function to handle sign up with Google
const handleGoogleSignUp = async () => {
  try {
    // إذا كنت تستخدم مكتبة react-google-login أو أي مكتبة أخرى لتسهيل عملية تسجيل الدخول باستخدام Google، يمكنك استخدامها هنا
    // استخدم مفتاح API الذي قمت بالحصول عليه من Google API Console
    const response = await axios.post("http://localhost:8080/google", {
      apiKey: "YOUR_GOOGLE_API_KEY",
    });

    // Handle Google sign up response if needed
    console.log("success with Google:", response.data);
  } catch (error) {
    console.error("Error signing up with Google:", error);
  }
};







return (
  <section className="bg-[#fffff]">
    <a href="#" className="flex items-center  mb-2 text-2xl font-semibold text-gray-900 md:mt-0">
      <img src={logo} className="w-[10rem] " alt=" Logo" />
    </a>  
    

    <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-screen lg:py-0 ">
      <div style={{ borderRadius: "8px", border: "3px solid #24315c", boxShadow: "0px 0px 10px rgb(255, 252, 252)", padding: "20px", background: "(#fffcfc)", width:"100%" }} 
          className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-16 ">
        <div className=" space-y-2 md:space-y-2 sm:p-2">
          <h1 style={{ color: "(#24315c)" }} className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign up for a new account
          </h1>
          <form className="space-y-2 md:space-y-2">
  <div className="flex space-x-4">
    <div className="flex-1">
      <label htmlFor="f_name" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
      <input
        type="text"
        name="f_name"
        id="f_name"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        value={f_name}
        onChange={(e) => setfirstName(e.target.value)}
        className="bg-(#24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="First Name"
        required
      />
    </div>
    <div className="flex-1">
      <label htmlFor="l_name" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
      <input
        type="text"
        name="l_name"
        id="l_name"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        value={l_name}
        onChange={(e) => setlastName(e.target.value)}
        className="bg-(#24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="Last Name"
        required
      />
    </div>
  </div>
  <div className="flex space-x-4">
    <div className="flex-1">
      <label htmlFor="email" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
      <input
        type="email"
        name="email"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-(#24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder="Email"
        required
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
    </div>
    <div className="flex-1">
      <label htmlFor="password" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
      <input
        type="password"
        name="password"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="bg-(#24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        required
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
    </div>
  </div>
  <div className="flex space-x-4">
    <div className="flex-1">
      <label htmlFor="confirm-password" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
      <input
        type="password"
        name="confirm-password"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        id="confirm-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        className="bg-(  #24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        required
      />
    </div>
    <div className="flex-1">
      <label htmlFor="phone" style={{ color: "rgb(92, 92, 66)" }} className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
      <input
        type="tel"
        name="phone"
        style={{ background: "white", border: "1px solid #A5A5A5", borderRadius: "8px", padding: "2.5px", height: "3rem", color: "rgb(92, 92, 66)" }}
        id="phone"
        value={usernumber}
        onChange={(e) => setphone(e.target.value)}
        className="bg-(#24315c) border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder="Phone Number"
        required
      />
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="agreeToTerms"
      name="agreeToTerms"
      checked={agreeToTerms}
      onChange={() => setAgreeToTerms(!agreeToTerms)}
      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
    />
    <label htmlFor="agreeToTerms" style={{ color: "rgb(36, 49, 92)" }} className="block text-sm font-medium text-gray-900">
      I agree to the <Link to="/terms" className="text-primary-600 hover:underline">terms of service</Link>
    </label>
  </div>
  <div className="flex space-x-4 flex-col items-center">
    <button
      type="button"
      onClick={handleSignUp}
      style={{ background: "rgb(247, 36, 87)", border: "2px solid #A5A5A5", borderRadius: "8px", color: "white", height: "3rem", width: "100%", cursor: "pointer" }}>
      Sign Up with Data
    </button>
  </div>
  <div className="flex space-x-4 flex-col items-center">
    <button
      type="button"
      onClick={handleGoogleSignUp}
      style={{ background: "rgb(36, 49, 92)", border: "2px solid #A5A5A5", borderRadius: "8px", color: "white", height: "3rem", width: "100%", cursor: "pointer" }}>
      Sign Up with Google
    </button>
  </div>
</form>
            {registrationMessage && (
              <div className={`mt-4 ${showSuccessModal ? "flex" : "hidden"}`}>
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full">
                  <p className="font-bold">Success</p>
                  <p>{registrationMessage}</p>
                  <button className="mt-2 text-sm underline" onClick={handleCloseSuccessModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
            <p className="text-sm font-light text-gray-500  text-center mt-4">
              Already have an account? <Link to="/signin" className="font-medium text-primary-600 hover:underline ">Sign in</Link>
            </p>
            </div>
      </div>
    </div>
  </section>
  );
};

export default SignUp;
