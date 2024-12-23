import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddEmployee = () => {
  const navigate=useNavigate()
  const [department,setDepartment]=useState([])
  const [details,setDetails]=useState({
    name:'',
    password:'',
    email:'',
    department:'',
    phone:'',
    salary:''
  
  })

  useEffect(()=>{
     const fetchDepartment=async()=>{
      try {
        const response=await axios.get('https://attentence-management-server.onrender.com/api/admin/departments')
        setDepartment(response.data.data)
      } catch (error) {
        console.log(error); 
      }
     }
     fetchDepartment()
  },[])
  const handChange=(e)=>{
      const {name,value}=e.target
      setDetails({...details,[name]:value})
  }
console.log(details);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      console.log('hello');
      const response=await axios.post("https://attentence-management-server.onrender.com/api/admin/employee",details)
      console.log(response.data.data._id);
      const employeeId=response.data.data._id
      const amound=response.data.data.salary
      const addSalary=await axios.post("https://attentence-management-server.onrender.com/api/admin/salary",{employeeId,amound})
      toast.success(response.data.message, {style: { color: 'black', fontWeight: 'bold' }});
      setTimeout(() => {
        navigate('/admin-dashboard/employee')
      }, 2000);
      // console.log('success');
      
    } catch (error) {

      if(error.response.status===400){
        toast.error(error.response.data.message, {style: { color: 'red', fontWeight: 'bold' }});
       setTimeout(() => {
        navigate('/admin-dashboard/employee')  
       }, 2000);
      }
      
    }
  }

    
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Add Employee</h2>
        <form action=""  onSubmit={handleSubmit} >
            <div>
                <label htmlFor="name" className='text-sm font-medium text-gray-700'>Employee Name:</label>
                <input type="text" placeholder='enter a emp_name' className='mt-1 w-full p-2 border border-gray-300 rounded-md' name='name' onChange={handChange} required   />
            </div>
            <div className='mt-3'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email:</label>
                <input type="email" placeholder='email' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='email' onChange={handChange} required  />
            </div>
            <div className='mt-3'>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password:</label>
                <input type="text" placeholder='password' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='password' onChange={handChange} required  />
            </div>
            <div className='mt-3'>
                <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone:</label>
                <input type="text" placeholder='phone' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='phone' onChange={handChange} required  />
            </div>
            <div className='mt-3'>
                <label htmlFor="department" className='block text-sm font-medium text-gray-700'>Department:</label>
                <select className='mt-1 w-full p-2 border border-gray-300 rounded-md  overflow-y-auto max-h-32' name='department' onChange={handChange} required value={details.department} >
                <option value=""   disabled> Select a department </option>
                {department.map((item)=>(
                  <option  key={item._id} value={item._id} >{item.dept_name}</option>
                ))}
                </select>
                {/* <input type="text" placeholder='department' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='department' onChange={handChange} required  /> */}
            </div>
            <div className='mt-3'>
                <label htmlFor="salary" className='block text-sm font-medium text-gray-700'>Salary:</label>
                <input type="text" placeholder='salary' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='salary' onChange={handChange} required  />
            </div>
            {/* <div className='mt-3'>
                <label htmlFor="position" className='block text-sm font-medium text-gray-700'>Position:</label>
                <input type="text" placeholder='position' className='mt-1 w-full p-2 block border border-gray-300 rounded-md' name='position' onChange={handChange} required  />
            </div> */}
            <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type='submit'>Add Employee</button>
        </form>
    </div>
  )
}

export default AddEmployee
