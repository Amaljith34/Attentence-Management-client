import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const fetchEmployees = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://attentence-management-server.onrender.com/api/admin/employee?page=${page}&limit=${itemsPerPage}`
      );
      setEmployees(response.data.data);
      setTotalPages(response.data.pages);
      
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);


  

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`https://attentence-management-server.onrender.com/api/admin/employee/${id}`);
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        toast.success("Delete success", {style: { color: 'black', fontWeight: 'bold' }});

      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  

  const handleBlock = async (emp) => {
    try {
      const response = await axios.patch(`https://attentence-management-server.onrender.com/api/admin/employee/block/${emp._id}`);
      toast.success(response.data.message || "Employee status updated successfully." , {style: { color: 'black', fontWeight: 'bold' }});

    } catch (error) {
      console.error("Error blocking/unblocking employee:", error);
      toast.error("An error occurred while updating the employee status.", {style: { color: 'red', fontWeight: 'bold' }});

    }
  };
  const handleMessage=()=>{
     
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-5">
      <div className="flex justify-end mr-5"><img src="https://static.vecteezy.com/system/resources/previews/000/441/015/original/notification-vector-icon.jpg" alt="" className="w-10 " onClick={handleMessage} /></div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employees</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search employees"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 border rounded"
        />
        <button
          onClick={() => navigate("/admin-dashboard/add-employee")}
          className="px-4 py-1 bg-teal-600 text-white rounded"
        >
          Add Employee
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border-2 border-gray-400">
          <thead>
            <tr className="table-auto w-full border-collapse border-2 border-gray-400">
              <th className="border-2 border-gray-400 px-4 py-2">#</th>
              <th className="border-2 border-gray-400 px-4 py-2">Name</th>
              <th className="border-2 border-gray-400 px-4 py-2">Email</th>
              <th className="border-2 border-gray-400 px-4 py-2">Department</th>
              <th className="border-2 border-gray-400 px-4 py-2">Phone</th>
              <th className="border-2 border-gray-400 px-4 py-2">JoinDate</th>
              <th className="border-2 border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp._id} className="table-auto w-full border-collapse border-2 border-gray-400 text-center">
                <td className="border-2 border-gray-400 px-4 py-2 ">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="border-2 border-gray-400 px-4 py-2">{emp.name}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{emp.email}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{emp.dept_name}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{emp.phone}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{emp.joinDate}</td>
                <td className="border-2 border-gray-400 px-4 py-2">
                  <button
                    className="px-2 py-1 bg-teal-500 text-white rounded"
                    onClick={() =>handleBlock(emp)}
                  >
                    {emp.isBlocked?"UnBlock":"Block"}
                  </button>
                  <button
                    className="ml-10 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(emp._id, emp.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-teal-600 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-teal-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
