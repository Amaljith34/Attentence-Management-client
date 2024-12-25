import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeavesTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isModal,setIsModal]=useState(false)
  const [pending,setPending]=useState([])
  
  const navigate=useNavigate()
  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://attentence-management-server.onrender.com/api/admin/leave-request?page=${page}&limit=${limit}`
      );
      const { data, pagination } = response.data;
      setLeaves(data);
      setFilteredLeaves(data); 
      setTotalPages(pagination.totalPages);
        const pending=data.filter(
        (leave) => leave.status.toLowerCase() === "pending"
      );
      setPending(pending)
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching leaves");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLeaves();
  }, [page]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = leaves.filter((leave) =>
      leave.employeeName.toLowerCase().includes(query)
    );
    setFilteredLeaves(filtered);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleRequest=()=>{
   navigate('/admin-dashboard/leave-request')
    // setIsModal(true)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leaves</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
      <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by employee name"
          className="p-2 border rounded shadow"
        />
        <div className="flex justify-end">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/441/015/original/notification-vector-icon.jpg"
            alt="Notification"
            className="w-10"
            onClick={handleRequest}
          />
        </div>
        
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <table className="table-auto w-full border-collapse border-2 border-gray-400">
            <thead>
              <tr className="bg-gray-100 border-2 border-gray-400">
                <th className="border-2 border-gray-400 px-4 py-2 text-left">No</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">Name</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">Reason</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">From</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">To</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">LeaveType</th>
                <th className="border-2 border-gray-400 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="bg-gray-100 border-2 border-gray-400"
                >
                  <td className="border-2 border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {leave.employeeName}
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {leave.description}
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {leave.from}
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.to}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {leave.leaveType}
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          {isModal && (
            <h1>hello</h1>
          )}
        </>
      )}
    </div>
  );
};
export default LeavesTable;
