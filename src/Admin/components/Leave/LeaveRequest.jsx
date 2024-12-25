import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveRequest = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://attentence-management-server.onrender.com/api/admin/leave-request?page=${page}&limit=${limit}`
      );
      const { data, pagination } = response.data;
      setLeaves(data);
      setTotalPages(pagination.totalPages);
      
      
      const pending = data.filter(
        (leave) => leave.status.toLowerCase() === "pending"
      );
      console.log(pending);
      
      setFilteredLeaves(pending);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching leaves");
    } finally {
      setLoading(false);
    }
  };
  const paginatedLeaves = filteredLeaves.slice(
    (page - 1) * limit,
    page * limit
  );
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
    setPage(1);
  };

  const handleNextPage = () => {
    if (page <= totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleBack = () => {
    navigate("/admin-dashboard/leave");
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `https://attentence-management-server.onrender.com/api/admin/leave-request/${id}`,
        { status: false }
      );
      toast.success("Leave rejected successfully!", {
        style: { color: "black", fontWeight: "bold" },
      });
      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject leave request."
      );
    }
  };

  const handleApproval = async (id) => {
    try {
      await axios.patch(
        `https://attentence-management-server.onrender.com/api/admin/leave-request/${id}`,
        { status: true }
      );
      toast.success("Leave approved successfully!", {
        style: { color: "black", fontWeight: "bold" },
      });
      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve leave request."
      );
    }
  };

 
console.log(filteredLeaves);
console.log(totalPages);
console.log(filteredLeaves);


const totalpage=Math.ceil(paginatedLeaves.length/limit)
console.log(totalpage);


  return (
    <div className="container mx-auto p-4">
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
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
                <th className="border-2 border-gray-400 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="bg-gray-100 border-2 border-gray-400"
                >
                  <td className="border-2 border-gray-400 px-4 py-2">
                    {index + 1 + (page - 1) * limit}
                  </td>
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
                    <div className="flex justify-evenly">
                      <button
                        className="bg-red-500 px-4 py-1 rounded-sm"
                        onClick={() => handleReject(leave._id)}
                      >
                        Reject
                      </button>
                      <button
                        className="ml-5 bg-teal-500 px-5 py-1"
                        onClick={() => handleApproval(leave._id)}
                      >
                        Approve
                      </button>
                    </div>
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
              disabled={page === Math.ceil(filteredLeaves.length / limit)}
            >
              Next
            </button>
          </div>
        </>
      )}
      <div>
        <button className="px-4 py-2 bg-teal-600" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default LeaveRequest;
