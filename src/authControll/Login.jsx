import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handsubmit = async (e) => {
    e.preventDefault();
    try {
        const response=await axios.post("http://localhost:3000/api/registration",
            {email,password}
        );
        console.log(response);
        
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-300 to-50% space-y-6">
      <h2 className="text-6xl font-Sevillan   ">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onClick={handsubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="text"
              placeholder="*********"
              className="w-full px-3 py-2 border"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-teal-600  py-2 text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
