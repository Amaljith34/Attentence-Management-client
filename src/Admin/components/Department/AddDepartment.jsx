import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddDepartment = () => {
    const navigate=useNavigate()
    const [department,setDepartment]=useState({
        dept_name:'',
        description :''
    })
    const handchange=(e)=>{
        
        const {name,value}=e.target
        setDepartment({...department,[name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await axios.post('https://attentence-management-server.onrender.com/api/admin/department',department)
            if(response.data.success){
                toast.success("department added successfully", {style: { color: 'black', fontWeight: 'bold' }});
                setTimeout(() => {
                    navigate('/admin-dashboard/department') 
                }, 2000);
            }  
        } catch (error) {
            if(error.response && !error.response.data.success){
                toast.error(error.response.data.message, {style: { color: 'red', fontWeight: 'bold' }});
                setTimeout(() => {
                    navigate('/admin-dashboard/department')    
                }, 2000);
              }

              else{
                alert(error)
              }
        }

    }
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
        <form action="" onSubmit={handleSubmit} >
            <div>
                <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
                <input type="text" placeholder='enter a dept_name' className='mt-1 w-full p-2 border border-gray-300 rounded-md' name='dept_name' required onChange={handchange}  />
            </div>
            <div className='mt-3'>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea type="description" placeholder='description' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='description' required onChange={handchange} ></textarea>
            </div>
            <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' >Add Dept</button>
        </form>
      
    </div>
  )
}

export default AddDepartment
