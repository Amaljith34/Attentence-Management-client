

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const employee = localStorage.getItem("id");
//   console.log(employee);
 

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/chat/${employee}`);
//       setMessages(response.data.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };
//   useEffect(() => {
//     fetchMessages();
//   }, [employee]);

//   // Function to send a message
//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         await axios.post(`http://localhost:3000/api/chat/${employee}`,  message );
//         setMessage(""); 
//         fetchMessages(); 
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Chat Application</h2>
//       <div style={{ border: "1px solid black", height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.receiverId}:</strong> {msg.message}, {msg.timestamp}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default AdminChat;
import React from 'react'

const AdminChat = () => {
  return (
    <div>
      <h1>chat</h1>
    </div>
  )
}

export default AdminChat

