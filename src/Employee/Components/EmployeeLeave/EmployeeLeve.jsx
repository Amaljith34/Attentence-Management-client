import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const EmployeeLeve = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    description: "",
    leaveType: "casual",
  });
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  const fetchLeaves = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://attentence-management-server.onrender.com/api/employee/leave-request/${id}?page=${page}&limit=${limit}`
      );
      const { data, pagination } = response.data;
      setLeaves(data);
      setFilteredLeaves(data); 
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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = leaves.filter((leave) =>
      leave.employeeName.toLowerCase().includes(query)
    );
  
    setFilteredLeaves(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://attentence-management-server.onrender.com/api/employee/leave-request/${id}`,
        formData
      );
      toast.success("Leave request submitted successfully!")
      setFormData("")
      setIsModal(false);
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting leave request");
    }
  };

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
        <button
          onClick={() => setIsModal(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Request Leave
        </button>
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
                <tr key={leave._id} className="bg-gray-100 border-2 border-gray-400">
                  <td className="border-2 border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.employeeName}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.description}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.from}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.to}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{leave.leaveType}</td>
                  <td className="border-2 border-gray-400 px-4 py-2 font-bold">
                    {leave.status === "approved" ? (
                      <>
                        <FaCheckCircle className="text-green-500 inline mr-1" />Approved
                      </>
                    ) : leave.status === "rejected" ? (
                      <>
                        <FaTimesCircle className="text-red-500 inline mr-1" />Rejected
                      </>
                    ) : (
                      <>
                        <FaClock className="text-yellow-500 inline mr-1" />Pending
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Leave Request</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">From Date</label>
                <input
                  type="date"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">To Date</label>
                <input
                  type="date"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="casual">Casual</option>
                  <option value="sick">Sick</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeve;
