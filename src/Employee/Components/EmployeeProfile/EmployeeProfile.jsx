// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const EmployeeProfile = () => {
//   const [employee, setEmployee] = useState({});
//   const id = localStorage.getItem("id");
//   const [isModal, setIsModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const employeeDetails = await axios.get(
//           `https://attentence-management-server.onrender.com/api/admin/employee/${id}`
//         );
//         setEmployee(employeeDetails.data.data);
//         setFormData({
//           name: employeeDetails.data.data.name || "",
//           email: employeeDetails.data.data.email || "",
//           phone: employeeDetails.data.data.phone || "",
//         });
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   const { name, email, phone, position, dept_name, profilePicture } = employee;

//   const handleClick = () => {
//     setIsModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedData = await axios.patch(
//         `https://attentence-management-server.onrender.com/api/admin/employee/${id}`,
//         formData
//       );
//       toast.success(updatedData.data.message, {
//         style: { color: "black", fontWeight: "bold" },
//       });
//       setIsModal(false);
//       setEmployee(updatedData.data.data);
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   const handleCancel = () => {
//     setIsModal(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white shadow-2xl rounded-lg p-8">
//       <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
//         Employee Profile
//       </h2>
//       <div className="flex items-center justify-center">
//         <div className="bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
//           <div className="flex-shrink-0">
//             <img
//               src={
//                 profilePicture ||
//                 "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
//               }
//               alt={`${name}'s profile`}
//               className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300 shadow-md"
//             />
//           </div>
//           <div className="flex-grow">
//             <div className="mb-3">
//               <label className="font-semibold text-indigo-700">Name:</label>
//               <span className="ml-3 text-gray-800 text-lg">{name || "N/A"}</span>
//             </div>
//             <div className="mb-3">
//               <label className="font-semibold text-indigo-700">Email:</label>
//               <span className="ml-3 text-gray-800 text-lg">{email || "N/A"}</span>
//             </div>
//             <div className="mb-3">
//               <label className="font-semibold text-indigo-700">Phone:</label>
//               <span className="ml-3 text-gray-800 text-lg">{phone || "N/A"}</span>
//             </div>
//             <div className="mb-3">
//               <label className="font-semibold text-indigo-700">Position:</label>
//               <span className="ml-3 text-gray-800 text-lg">
//                 {position || "N/A"}
//               </span>
//             </div>
//             <div className="mb-3">
//               <label className="font-semibold text-indigo-700">Department:</label>
//               <span className="ml-3 text-gray-800 text-lg">
//                 {dept_name || "N/A"}
//               </span>
//             </div>
//             <button
//               className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow mt-4"
//               onClick={handleClick}
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModal && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">
//               Edit Employee Details
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="phone" className="block text-sm font-medium">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg shadow"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 p-2 rounded-lg shadow"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeProfile;

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState({})
  const id = localStorage.getItem("id")
  const [isModal, setIsModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const employeeDetails = await axios.get(
          `https://attentence-management-server.onrender.com/api/admin/employee/${id}`
        )
        setEmployee(employeeDetails.data.data)
        setFormData({
          name: employeeDetails.data.data.name || "",
          email: employeeDetails.data.data.email || "",
          phone: employeeDetails.data.data.phone || "",
        })
      } catch (error) {
        console.error("Error fetching employee details:", error)
      }
    }
    fetchDetails()
  }, [id])

  const { name, email, phone, position, dept_name, profilePicture } = employee

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedData = await axios.patch(
        `https://attentence-management-server.onrender.com/api/admin/employee/${id}`,
        formData
      )
      toast.success(updatedData.data.message, {
        style: { color: "black", fontWeight: "bold" },
      })
      setIsModal(false)
      setEmployee(updatedData.data.data)
    } catch (error) {
      console.error("Error updating employee:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">About Me</h1>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0 text-center">
              <img
                src={profilePicture || "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                alt="Profile"
                className="w-48 h-48 rounded-full mx-auto border-4 border-indigo-200"
              />
            </div>
            
            <div className="flex-grow space-y-6">
              <p className="text-gray-600 text-lg">
                A {position} based in the {dept_name} department.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Name</h3>
                  <p className="text-indigo-600">{name || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Email</h3>
                  <p className="text-indigo-600">{email || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
                  <p className="text-indigo-600">{phone || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Department</h3>
                  <p className="text-indigo-600">{dept_name || "N/A"}</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsModal(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-indigo-600">150+</div>
              <div className="text-sm text-gray-500">Days Present</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-indigo-600">15</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-indigo-600">95%</div>
              <div className="text-sm text-gray-500">Attendance</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-indigo-600">24</div>
              <div className="text-sm text-gray-500">Tasks Completed</div>
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModal(false)}
                  className="flex-1 rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
