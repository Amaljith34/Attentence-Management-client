import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard.jsx'
import {  FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const AdminHomepage = () => {
  const [totalEmployee,setTotalEmployee]=useState(0)
  const [totalDepartment,setTotalDdepartment]=useState(0)

  useEffect(()=>{
     const Totals=async()=>{
      try {
         const employee=await axios.get("https://attentence-management-server.onrender.com/api/admin/dashboard/employee")
         setTotalEmployee(employee.data.data);
         const department=await axios.get("https://attentence-management-server.onrender.com/api/admin/dashboard/department")
         setTotalDdepartment(department.data.data)
       } catch (error) {
        console.log(error);
       }
     }
   Totals()
  },[])
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold '>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers/>} text="Total Employees" number={totalEmployee} color="bg-teal-600"/>
        <SummaryCard icon={<FaBuilding/>} text="Total Department" number={totalDepartment} color="bg-yellow-600"/>
        <SummaryCard icon={<FaUsers/>} text="Total Revenue" number={"$2500"} color="bg-red-600"/>

      </div>
      <div className='mt-12'>
      <h4 className='text-2xl font-bold text-center '>Leave Details</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={5} color="bg-teal-600"/>
        <SummaryCard icon={<FaCheckCircle/>} text="Leave Approved" number={2} color="bg-yellow-600"/>
        <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending" number={4} color="bg-red-600"/>
        <SummaryCard icon={<FaTimesCircle/>} text="Leave Rejected" number={1} color="bg-red-600"/> 
      </div>
      </div>
    </div>
  )
}

export default AdminHomepage
