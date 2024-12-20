import React, { useEffect } from 'react'

const EmployeeLeve = () => {
  const id=localStorage.getItem("id")
  useEffect(()=>{
    
  },[])
   
  return (
    <div>
      <div>
        <form action="">
        <h2>Manage Leaves</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                <td></td>
            </tbody>
          </table>
        </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLeve
