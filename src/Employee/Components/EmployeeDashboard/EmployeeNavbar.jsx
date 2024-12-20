import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EmployeeNavbar = () => {
  const [employee,setEmployee]=useState([])
  const id=localStorage.getItem("id")
  useEffect(()=>{
    const details= async()=>{
    const employeeDetails=await axios.get(`http://localhost:3000/api/admin/employee/${id}`)
    setEmployee(employeeDetails.data.data);
    }
    details()
  },[])
  const Name=employee.name

  return (
    <div className=' flex  items-center text-white justify-between h-12 bg-teal-600 px-5'>
        <p>Welcome {Name} </p>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded-md'>Logout</button>
    </div>
  )
}
export default EmployeeNavbar


