import React from 'react'
import AdminSidebar from './AdminSidebar.jsx'
import AdminNavbar from './AdminNavbar.jsx'
import AdminHomepage from './AdminHomepage.jsx'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
          <AdminNavbar/>
          {/* <AdminHomepage/> */}
          <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
