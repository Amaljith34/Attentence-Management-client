import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const id = localStorage.getItem("id");
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const employeeDetails = await axios.get(
          `http://localhost:3000/api/admin/employee/${id}`
        );
        setEmployee(employeeDetails.data.data);
        setFormData({
          name: employeeDetails.data.data.name || '',
          email: employeeDetails.data.data.email || '',
          phone: employeeDetails.data.data.phone || ''
        });
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  const { name, email, phone, position, dept_name, profilePicture } = employee;

  const handleClick = () => {
    setIsModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await axios.patch(
        `http://localhost:3000/api/admin/employee/${id}`,
        formData // Send the form data to update
      );
      alert(updatedData.data.message); // Show success message
      setIsModal(false); // Close the modal after saving changes
      setEmployee(updatedData.data.data); // Update the employee details
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="w-3/4 h-3/4 mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 ">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Employee Details
      </h2>
      <div className="flex items-center justify-center bg-gray-100 mt-14">
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex-shrink-0">
            <img
              src={profilePicture || "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
              alt={`${name}'s profile`}
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex-grow">
            <div className="mb-4">
              <label className="font-bold text-gray-600">Name:</label>
              <span className="ml-2 text-gray-800">{name || "N/A"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-600">Email:</label>
              <span className="ml-2 text-gray-800">{email || "N/A"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-600">Phone:</label>
              <span className="ml-2 text-gray-800">{phone || "N/A"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-600">Position:</label>
              <span className="ml-2 text-gray-800">{position || "N/A"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-gray-600">Department:</label>
              <span className="ml-2 text-gray-800">{dept_name || "N/A"}</span>
            </div>
            <button className="bg-teal-500 px-4 py-1 text-white ml-20" onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
      </div>
      {isModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
