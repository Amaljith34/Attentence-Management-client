import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const userContext=createContext()
const AuthContext = ({children}) => {
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const verifyUser=async()=>{
          try {
            const response=await axios.get(' ') [1];
            
            
          } catch (error) {
            if(error.response && error.response.data.success){
              setE
            }
          }
        }
    },[])




    const login=(user)=>{
         setUser(user)
    }
    const logout=()=>{
      setUser(null)
      localStorage.removeItem("token")

    }
  return (
    <userContext.Provider value={{user,login,logout}}>
       {children}
    </userContext.Provider>
  )
}
export const useAuth=()=>useContext(userContext)
export default AuthContext
