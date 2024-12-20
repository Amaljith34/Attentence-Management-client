import React, { useState } from 'react'
import { FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt } from 'react-icons/fa'
import { FaMoneyBill1Wave, FaUsers } from 'react-icons/fa6'
import { NavLink, useNavigate } from 'react-router-dom'

const EmployeeSidebar = () => {
  const navigate=useNavigate()
  const [isActive,setIsActive]=useState(true)
  const handclick=()=>{
    setIsActive(false)
    if(isActive===true){
      navigate('/employee-dashboard')
    }
  }
  return (
    <div className='bg-gray-800 text-white  h-screen fixed left-0 bottom-0 space-y-2 w-64 '>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-Sevillan'>Employe MS</h3>
      </div>
      <div className='px-4  '>
        <NavLink to={'/employee-dashboard'}   className={`${isActive ? "bg-teal-500" : " "}  flex items-center  space-x-4  py-2.5 px-4 rounded focus:bg-teal-500 `}>
          <FaTachometerAlt/>
          <span >Dashboard</span>
        </NavLink>
        <NavLink to={'/employee-dashboard/profile'} className="flex items-center space-x-4 py-2.5 px-4 rounded focus:bg-teal-500 " onClick={handclick}>
          <FaUsers/>
          <span>My Profile</span>
        </NavLink>
        <NavLink to={'/employee-dashboard/leaves'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaBuilding/>
          <span>Leaves</span>
        </NavLink>
        <NavLink to={'/employee-dashboard/salary'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaCalendarAlt/>
          <span>Salary</span>
        </NavLink>
        <NavLink to={'/employee-dashboard/settings'} className="flex items-center space-x-4  py-2.5 px-4 rounded focus:bg-teal-500" onClick={handclick}>
          <FaCogs/>
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  )
}

export default EmployeeSidebar
