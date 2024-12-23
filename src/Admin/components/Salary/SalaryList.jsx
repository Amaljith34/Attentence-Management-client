import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedSalary, setEditedSalary] = useState({
    employeeId: null,
    amound: 0,
    payDate: "",
  });
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get("https://attentence-management-server.onrender.com/api/admin/salary");
        if (response.status === 200) {
          setSalaries(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (salary) => {
    setEditedSalary(salary);
    setIsEdit(true);
  };
console.log(editedSalary);
  const handleSave = async () => {
    try {
      await axios.put(
        `https://attentence-management-server.onrender.com/api/admin/salary/${editedSalary._id}`,
        editedSalary
      );
      setSalaries((prev) =>
        prev.map((item) =>
          item.employeeId === editedSalary.employeeId ? { ...item, ...editedSalary } : item
        )
      );

      toast.success("Salary updated successfully", {style: { color: 'black', fontWeight: 'bold' }});

      setIsEdit(false);
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };


  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Salary</h3>
      </div>
      <div className="flex justify-between items-center mb-4 m-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded"
        />
      </div>
      <div>
        <table className="table-auto w-full border-collapse border-2 border-gray-400">
          <thead>
            <tr className="bg-gray-100 border-2 border-gray-400">
              <th className="border-2 border-gray-400 px-4 py-2">NO</th>
              <th className="border-2 border-gray-400 px-4 py-2">Name</th>
              <th className="border-2 border-gray-400 px-4 py-2">Salary</th>
              <th className="border-2 border-gray-400 px-4 py-2">Pay Date</th>
              <th className="border-2 border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((item, index) => (
              <tr
                className="bg-gray-100 border-2 border-gray-400 text-center"
                key={item.employeeId}
              >
                <td className="border-2 border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border-2 border-gray-400 px-4 py-2">
                  {item.employeeName}
                </td>
                <td className="border-2 border-gray-400 px-4 py-2">{item.amound}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{item.payDate}</td>
                <td className="border-2 border-gray-400 px-4 py-2 text-center">
                  <button
                    className="bg-teal-600 py-1 text-white px-4 rounded-md"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h3 className="text-lg font-bold mb-4">Edit Salary</h3>
              <label className="block mb-2">
                amound
                <input
                  type="number"
                  name="amound"
                  value={editedSalary.amound}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded"
                />
              </label>
              <label className="block mb-2">
                Pay Date
                <input
                  type="date"
                  name="payDate"
                  value={editedSalary.payDate}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded"
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-1 bg-gray-400 rounded text-white"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryList;
