import React from 'react'

const AdminNavbar = () => {
  return (
    <div className=' flex  items-center text-white justify-between h-12 bg-teal-600 px-5'>
        <p>Welcome Admin</p>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded-md'>Logout</button>
    </div>
  )
}

export default AdminNavbar
