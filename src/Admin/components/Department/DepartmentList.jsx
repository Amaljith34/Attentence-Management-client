import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search by dept Name' className='PX-4 py-0.5 border' />
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Dept</Link>
      </div>
    </div>
  )
}

export default DepartmentList
