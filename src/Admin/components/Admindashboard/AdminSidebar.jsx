import React, { useState } from 'react'
import { FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt } from 'react-icons/fa'
import { FaMoneyBill1Wave, FaUsers } from 'react-icons/fa6'
import { NavLink, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const navigate=useNavigate()
  const [isActive,setIsActive]=useState(true)
  const handclick=()=>{
    setIsActive(false)
    if(isActive===true){
      navigate('/admin-dashboard')
    }
  }
  return (
    <div className='bg-gray-800 text-white  h-screen fixed left-0 bottom-0 space-y-2 w-64 '>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-Sevillan'>Employe MS</h3>
      </div>
      <div className='px-4  '>
        <NavLink to={'/admin-dashboard'}   className={`${isActive ? "bg-teal-500" : " "}  flex items-center  space-x-4  py-2.5 px-4 rounded focus:bg-teal-500 `}>
          <FaTachometerAlt/>
          <span >Dashboard</span>
        </NavLink>
        <NavLink to={'/admin-dashboard/employee'} className="flex items-center space-x-4 py-2.5 px-4 rounded focus:bg-teal-500 " onClick={handclick}>
          <FaUsers/>
          <span>Employee</span>
        </NavLink>
        <NavLink to={'/admin-dashboard/department'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaBuilding/>
          <span>Department</span>
        </NavLink>
        <NavLink to={'/admin-dashboard/leave'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaCalendarAlt/>
          <span>Leave</span>
        </NavLink>
        <NavLink to={'/admin-dashboard/salary'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaMoneyBill1Wave/>
          <span>Salary</span>
        </NavLink>
        <NavLink to={'/admin-dashboard/setting'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaCogs/>
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
