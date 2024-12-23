import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard.jsx'
import {  FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'


const EmployeeHomePage=()=>{
  const [details,setDetails]=useState([])


  const id=localStorage.getItem("id")
console.log(id);

  useEffect(()=>{
     const Totals=async()=>{
      try {
         const employeeDetails=await axios.get(`https://attentence-management-server.onrender.com/api/admin/employee/${id}`)
         setDetails(employeeDetails.data.data);
         
       } catch (error) {
        console.log(error);
       }
     }
   Totals()
  },[])
  const EmployeeName=details.name
  // console.log(EmployeeName);
  
  return (
    <div className='p-6'>
      {/* <EmployeeNavbar EmployeeName={EmployeeName} /> */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers/>} text="Welcome Back" number={EmployeeName} color="bg-teal-600"/>
        {/* <SummaryCard icon={<FaBuilding/>} text="Total Department" number={totalDepartment} color="bg-yellow-600"/> */}
        {/* <SummaryCard icon={<FaUsers/>} text="Total Revenue" number={"$2500"} color="bg-red-600"/> */}

      </div>
      {/* <div className='mt-12'>
      <h4 className='text-2xl font-bold text-center '>Leave Details</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={5} color="bg-teal-600"/>
        <SummaryCard icon={<FaCheckCircle/>} text="Leave Approved" number={2} color="bg-yellow-600"/>
        <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending" number={4} color="bg-red-600"/>
        <SummaryCard icon={<FaTimesCircle/>} text="Leave Rejected" number={1} color="bg-red-600"/> 
      </div>
      </div> */}

     
    </div>
  )
}

export default EmployeeHomePage



