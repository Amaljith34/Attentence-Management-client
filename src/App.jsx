import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './authControll/Login.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Navigate to='/admin-dashboard'/>}>
          
         </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
