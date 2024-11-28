import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './authControll/Login.jsx'

const App = () => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Navigate to='/admin-dashboard'/>}>
          
         </Route>
      </Routes>
    </BrowserRouter>
=======
    <div>
     
    </div>
>>>>>>> 9444b1086a398ce7693029992b108f4caaeebac0
  )
}

export default App
