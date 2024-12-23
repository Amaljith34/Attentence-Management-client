// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io("https://attentence-management-server.onrender.com"); // Connect to the backend server

// const EmployeeChat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Listen for messages from the admin
//     socket.on("admin-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off("admin-message");
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       const messageData = { text: message, time: new Date().toLocaleTimeString() };
//       socket.emit("employee-message", messageData); // Send message to the server
//       setMessages((prevMessages) => [...prevMessages, messageData]); // Update local chat
//       setMessage(""); // Clear input
//     }
//   };

//   return (
//     <div className="chat-container p-4 border border-gray-300 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4">Employee Chat</h2>
//       <div className="chat-box bg-gray-50 p-4 rounded-md border overflow-y-auto mb-4" style={{ maxHeight: '400px' }}>
//         {messages.map((msg, index) => (
//           <div key={index} className="chat-message mb-2">
//             <span className="font-semibold">{msg.time}: </span>{msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className="chat-form flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="p-2 border border-gray-300 rounded-md flex-grow"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Send</button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeChat;
