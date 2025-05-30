import axios from "axios";
import React, { useContext, useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login}=useAuth()
  const navigate=useNavigate()
  const handsubmit = async (e) => {
    e.preventDefault();
    try {
        const response=await axios.post("https://attentence-management-server.onrender.com/api/login",
            {email,password}
        );
        if(response.data.success){
          // alert('user login sucesfuly')
          // toast.success("User logged in successfully!");
          toast.success('Login successfully!', {style: { color: 'black', fontWeight: 'bold' }});
          console.log(response.data.data);
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("id",response.data.data._id)
          if(response.data.data.role==="admin"){
            setTimeout(() => {
              navigate('/admin-dashboard')
            }, 2000);
          }
          else{
            setTimeout(() => {
              navigate('/employee-dashboard')
            }, 2000);
          }
        }
        else{
          navigate('/')
        }
        
    } catch (error) {
      if(error.response && error.response.status===404){
        toast.error(error.response.data.message)
        navigate('/')
      }
      else if(error.response && error.response.status===400){
        // toast.error(error.response.data.message)
        toast.error(error.response.data.message, {style: { color: 'red', fontWeight: 'bold' }});

        setPassword('')
      }
      else if(error.response && error.response.status===401){
        setPassword('')
        setEmail('')
        toast.error(error.response.data.message, {style: { color: 'red', fontWeight: 'bold' }});
      }
      // console.log(error.response.status);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-300 space-y-6">
      {/* flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-300 to-50% space-y-6 */}
      <h2 className="text-6xl font-Sevillan   ">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 border"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-teal-600  py-2 text-white" onClick={handsubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
