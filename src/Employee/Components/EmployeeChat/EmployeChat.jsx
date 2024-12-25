// // import React, { useState, useEffect } from "react";
// // import { io } from "socket.io-client";

// // const socket = io('http://localhost:3000');

// // const EmployeChat = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [message, setMessage] = useState("");
// //   const employee = localStorage.getItem("id");

// //   // Fetch messages on load
// //   useEffect(() => {
// //     if (employee) {
// //       socket.emit('fetchMessages', employee);

// //       socket.on('messages', (fetchedMessages) => {
// //         setMessages(fetchedMessages);
// //       });

// //       socket.on('noMessages', (data) => {
// //         console.log(data.message);
// //       });

// //       socket.on('receiveMessage', (newMessage) => {
// //         setMessages((prevMessages) => [...prevMessages, newMessage]);
// //       });

// //       socket.on('error', (error) => {
// //         console.error(error.message);
// //       });
// //     }
// //   }, [employee]);

// //   // Function to send a message
// //   const sendMessage = () => {
// //     if (message.trim()) {
// //       const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); 
// //       socket.emit('sendMessage', {
// //         senderId: employee,
// //         message,
// //         time: currentTime, // Send the current time with the message
// //       });
// //       setMessage(""); // Clear the input field
// //     }
// //   };

// // console.log(messages);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Chat Application</h2>
// //       <div style={{ border: "1px solid black", height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
// //         {messages.map((msg, index) => (
// //           <div key={index}>
// //             <strong>{msg.sender === employee ? "You" : "Admin"}:</strong> {msg.message} 
// //             <span style={{ fontSize: "0.8rem", color: "gray", marginLeft: "10px" }}>
// //             {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour12: false })}
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Type a message..."
// //       />
// //       <button onClick={sendMessage}>Send</button>
// //     </div>
// //   );
// // };

// // export default EmployeChat;



// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import "tailwindcss/tailwind.css";

// const socket = io("http://localhost:3000");

// const EmployeChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const employee = localStorage.getItem("id");
//   const adminId = "67515fa01d14f079ffda740f"; // Replace with your admin ID

//   // Fetch messages on load
//   useEffect(() => {
//     if (employee && adminId) {
//       socket.emit("fetchMessages", { userId: employee, adminId });

//       socket.on("messages", (fetchedMessages) => {
//         setMessages(fetchedMessages);
//       });

//       socket.on("noMessages", (data) => {
//         console.log(data.message);
//       });

//       socket.on("receiveMessage", (newMessage) => {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });

//       socket.on("messageSent", (sentMessage) => {
//         setMessages((prevMessages) => [...prevMessages, sentMessage]);
//       });

//       socket.on("error", (error) => {
//         console.error(error.message);
//       });
//     }
//   }, [employee, adminId]);

//   // Function to send a message
//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", {
//         senderId: employee,
//         receiverId: adminId,
//         message,
//       });
//       setMessage(""); // Clear the input field
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-xl font-bold mb-4">Chat with Admin</h2>
//       <div className="border rounded-lg bg-white p-4 h-80 overflow-y-scroll mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 ${
//               msg.sender === employee
//                 ? "text-right text-blue-500"
//                 : "text-left text-green-500"
//             }`}
//           >
//             <p className="text-sm">
//               <strong>{msg.sender === employee ? "You" : "Admin"}:</strong> {msg.message}
//             </p>
//             <span className="text-xs text-gray-500">
//               {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour12: false })}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-l-lg p-2 focus:outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeChat;

import React from 'react'

const EmployeChat = () => {
  return (
    <div>
      <h1>chat</h1>
    </div>
  )
}

export default EmployeChat

