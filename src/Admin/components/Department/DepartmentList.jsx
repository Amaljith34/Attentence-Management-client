import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DepartmentList = () => {
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [deleted, setDeleted] = useState({
    id: "",
    dept_name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterdDepartment, setFilterdDepartment] = useState([]);
  const [search, setSerch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [edited, setEdited] = useState({
    _id: "",
    dept_name: "",
    description: "",
  });

  const fetchDepartment = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://attentence-management-server.onrender.com/api/admin/department?page=${page}&limit=8`
      );
      // console.log('Full Response:', response.data.data);
      setDepartment(response.data.data);
      setFilterdDepartment(response.data.data);

      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Error fetching department data:", error);
      setError("Failed to load department data.");
    }
  };
  useEffect(() => {
    fetchDepartment(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const filtered = department.filter((dept) =>
      dept.dept_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterdDepartment(filtered);
  }, [search, department]);

  const handEdit = (dept) => {
    setEdited(dept);
    setIsModalOpen(true);
  };

  const handchange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };
  // const handSearch=()=>{
  //   setIsSearch(true)
  // }

  const handlSave = async () => {
    try {
      await axios.put(
        `https://attentence-management-server.onrender.com/api/admin/department/${edited._id}`,
        edited
      );
      setDepartment((prev) =>
        prev.map((dept) =>
          dept._id === edited._id ? { ...dept, ...edited } : dept
        )
      );
      // alert("success");
      toast.success("Edited success", {style: { color: 'black', fontWeight: 'bold' }});

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching department data:", error);
      setError("Failed to load department data.");
    }
  };

  const handDelete = async (id,dept_name) => {
    setIsDelete(true);
    setDeleted({ id, dept_name });
  };
  const handCancal = async () => {
    setIsDelete(false);
  };
  const handClick = async () => {
    const id = deleted.id;
    const name = deleted.dept_name;
  
    try {
      await axios.delete(`https://attentence-management-server.onrender.com/api/admin/department/${id}`);
      toast.success(`Deleted department ${name}`, {style: { color: 'black', fontWeight: 'bold' }});

  
      // Update the department state to remove the deleted department
      setDepartment((prev) =>
        prev.filter((dept) => dept._id !== id)
      );
      
      // Close the delete confirmation modal
      setIsDelete(false);
    } catch (error) {
      console.error("Error deleting department:", error);
      setError("Failed to delete department.");
    }
  };
  
  

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by dept Name"
          className="px-4 py-0.5 border"
          onChange={(e) => setSerch(e.target.value)}
          // onClick={handSearch}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Dept
        </Link>
      </div>
      <div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto w-full border-collapse border-2 border-gray-400 ">
            <thead>
              <tr className="bg-gray-100 border-2 border-gray-400">
                <th className="border-2 border-gray-400 px-4 py-2">$No</th>
                <th className="border-2 border-gray-400 px-4 py-2">
                  Department Name
                </th>
                <th className="border-2 border-gray-400 px-4 py-2">
                  Discription
                </th>
                <th className="border-2 border-gray-400 px-4 py-2">Action</th>
                {/* <th className="border-2 border-gray-400 px-4 py-2">Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {filterdDepartment.length > 0 ? (
                filterdDepartment.map((dept, index) => (
                  <tr key={dept._id}>
                    <td className="border-2 border-gray-400 px-4 py-2 text-center">
                      {index + 1 + (currentPage - 1) * 8}{" "}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-2 text-center">
                      {dept.dept_name}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-2 text-center">
                      {dept.description}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-2 text-center">
                      <button
                        className="bg-teal-600 py-1 text-white px-4 rounded-md"
                        onClick={() => handEdit(dept)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 py-1 px-4 text-white rounded-md ml-10 "
                        onClick={() => handDelete(dept._id, dept.dept_name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {isdelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/4 flex text-center">
            <h1 className="font-bold">Are you sure delete ,department- {deleted.dept_name}:</h1>

            <div className="flex left-0 ml-20">
              <button
                className="bg-red-500 p-2 rounded-md"
                onClick={handCancal}
              >
                No
              </button>
              <button
                className="bg-green-500 p-2 ml-5 rounded-md"
                onClick={handClick}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-lg font-bold mb-4">Edit Department</h3>
            <label className="block mb-2">
              Department Name{" "}
              <input
                type="text"
                name="dept_name"
                value={edited.dept_name}
                onChange={handchange}
                className="w-full px-3 py-1 border rounded"
              />
            </label>
            <label className="block mb-2">
              {" "}
              Description
              <textarea
                type="text"
                name="description"
                value={edited.description}
                onChange={handchange}
                className="w-full px-3 py-1 border rounded"
              />
            </label>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-1 bg-gray-400 rounded text-white"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handlSave}
                className="px-4 py-1 bg-teal-600 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-1 bg-gray-300 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-teal-600 text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-teal-600 text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      
    </div>
  );
};

export default DepartmentList;
