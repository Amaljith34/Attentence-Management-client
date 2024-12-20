import React, { useState, useEffect } from "react";
import axios from "axios";

const LeavesTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaves data
  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/admin/leave-request?page=${page}&limit=${limit}`);

      const { data, pagination } = response.data;
      setLeaves(data);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaves</h1>
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
              {leaves.map((leave,index) => (
                <tr key={leave._id} className="bg-gray-100 border-2 border-gray-400">
                  <td className="border-2 border-gray-400 px-4 py-2">{index+1}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.employeeName}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.description}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.from}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.to}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.leaveType}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
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
        </>
      )}
    </div>
  );
};

export default LeavesTable;

