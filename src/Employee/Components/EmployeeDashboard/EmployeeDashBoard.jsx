import React from 'react'
import EmployeeSidebar from './EmployeeSidebar.jsx'
import EmployeeNavbar from './EmployeeNavbar.jsx'
import { Outlet } from 'react-router-dom'

const EmployeeDashBoard = () => {
  return (
    <div className='flex'>
          <EmployeeSidebar/>
          <div className='flex-1 ml-64 bg-gray-100 h-screen'>
            <EmployeeNavbar/>
            <Outlet/>
          </div>
        </div>
  )
}

export default EmployeeDashBoard
