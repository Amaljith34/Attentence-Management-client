import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Registration = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const handclick=async(e)=>{
      e.preventDefault();
        try {
            const response=await axios.post("https://attentence-management-server.onrender.com/api/registration",{email,password,name})
            if(response.status===201){
              toast.success('registration successfully', {style: { color: 'red', fontWeight: 'bold' }});
              navigate('/login')
            }
            
        } catch (error) {
            if(error.response && error.response.status===400){
              toast.error(error.response.data.message, {style: { color: 'red', fontWeight: 'bold' }});
              navigate('/login')
            }
            else{
              console.log(error); 
            }
        }
    }
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-300 to-50% space-y-6">
      <h2 className="text-6xl font-Sevillan   ">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <form >
            <div>
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input type="text" placeholder='Enter your name' className='w-full px-3 py-2 border' onChange={(e)=>setName(e.target.value)} required/>
            </div>
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
              type="text"
              placeholder="*********"
              className="w-full px-3 py-2 border"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-teal-600  py-2 text-white" onClick={handclick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
