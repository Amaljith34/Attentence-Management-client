import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

import {  BrowserRouter , Route, Routes } from 'react-router-dom'
import Login from './authControll/Login.jsx'
import AdminDashboard from './Admin/components/Admindashboard/AdminDashboard.jsx'
import Registration from './authControll/Registration.jsx'
import AdminHomepage from './Admin/components/Admindashboard/AdminHomepage.jsx'
import DepartmentList from './Admin/components/Department/DepartmentList.jsx'
import AddDepartment from './Admin/components/Department/AddDepartment.jsx'
import EmployeeList from './Admin/components/Employee/EmployeeList.jsx'
import SalaryList from './Admin/components/Salary/SalaryList.jsx'
import LeaveList from './Admin/components/Leave/LeaveList.jsx'
import Settings from './Admin/components/Settings/Settings.jsx'
import AddEmployee from './Admin/components/Employee/AddEmployee.jsx'
import EmployeeDashBoard from './Employee/Components/EmployeeDashboard/EmployeeDashBoard.jsx'
import EmployeeHomePage from './Employee/Components/EmployeeDashboard/EmployeeHomePage.jsx'
import EmployeeSalary from './Employee/Components/EmployeeSalary/EmployeeSalary.jsx'
import EmployeeProfile from './Employee/Components/EmployeeProfile/EmployeeProfile.jsx'
import EmployeeSettings from './Employee/Components/EmployeeSettings/EmployeeSettings.jsx'
import EmployeeLeve from './Employee/Components/EmployeeLeave/EmployeeLeve.jsx'
import { ToastContainer } from 'react-toastify';
// import AdminChat from './Admin/components/AdminChat/AdminChat.jsx';
// import EmployeeChat from './Employee/Components/EmployeeChat/employeeChat.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" className="text-black" autoClose={3000} />
      <Routes>
        <Route  path='/registration' element={<Registration/>}></Route>
        <Route path='/' element={<Login/>}></Route>

        <Route path='/employee-dashboard' element={<EmployeeDashBoard/>}>
        <Route path='/employee-dashboard' element={<EmployeeHomePage/>}/>
        <Route path='/employee-dashboard/salary' element={<EmployeeSalary/>}/>
        <Route path='/employee-dashboard/profile' element={<EmployeeProfile/>}/>
        <Route path='/employee-dashboard/settings' element={<EmployeeSettings/>}/>
        <Route path='/employee-dashboard/leaves' element={<EmployeeLeve/>}/>
        {/* <Route path='/employee-dashboard/chat' element={<EmployeeChat />} /> */}

        
        </Route>


        <Route path='/admin-dashboard' element={<AdminDashboard/>}>
        <Route path='/admin-dashboard' element={<AdminHomepage />} />
        <Route path='/admin-dashboard/department' element={<DepartmentList/>}/>
        <Route path='/admin-dashboard/add-department'element={<AddDepartment/>}/>   
        <Route path='/admin-dashboard/employee' element={<EmployeeList/>}/>
        <Route path='/admin-dashboard/add-employee' element={<AddEmployee/>}/>
        <Route path='/admin-dashboard/salary' element={<SalaryList/>}/>
        <Route path='/admin-dashboard/leave' element={<LeaveList/>}/>
        <Route path='/admin-dashboard/setting' element={<Settings/>}/>
        {/* <Route path='/admin-dashboard/chat' element={<AdminChat />} /> */}

        </Route>     


       
          
         
      </Routes>
    </BrowserRouter>

  )
}

export default App
