import React from 'react'
import {  BrowserRouter , Route, Routes } from 'react-router-dom'
import Login from './authControll/Login.jsx'
import EmployeeDashBoard from './User/Pages/EmployeeDashBoard.jsx'
import AdminDashboard from './Admin/components/Admindashboard/AdminDashboard.jsx'
import Registration from './authControll/Registration.jsx'
import AdminHomepage from './Admin/components/Admindashboard/AdminHomepage.jsx'
import DepartmentList from './Admin/components/Department/DepartmentList.jsx'
import AddDepartment from './Admin/components/Department/AddDepartment.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/registration' element={<Registration/>}></Route>
        <Route path='/' element={<Login/>}></Route>

        <Route path='/homepage' element={<EmployeeDashBoard/>}></Route>


        <Route path='/admin-dashboard' element={<AdminDashboard/>}>
        <Route path='/admin-dashboard' element={<AdminHomepage />} />
        <Route path='/admin-dashboard/department' element={<DepartmentList/>}/>
        <Route path='/admin-dashboard/add-department'element={<AddDepartment/>}/>        </Route>
          
         
      </Routes>
    </BrowserRouter>

  )
}

export default App
