// // Chatbot.js
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import "./Chatbot.css";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");

//   const chatboxRef = useRef(null);

//   const toggleChatbox = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (userInput.trim() === "") return;

//     setMessages([...messages, { text: userInput, type: "user" }]);
//     setUserInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/chatbot", {
//         user_input: userInput,
//       });
//       const botResponse = response.data.bot_response;
//       setMessages([...messages, { text: botResponse, type: "bot" }]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   //   useEffect(() => {
//   //     // Scroll chatbox to the bottom when new messages are added
//   //     if (chatboxRef.current) {
//   //       chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
//   //     }
//   //   }, [messages]);

//   return (
//     <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
//       <div className="chatbot-header" onClick={toggleChatbox}>
//         Chatbot
//       </div>
//       <div className="chatbot-content">
//         <div ref={chatboxRef} className="chatbox">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.type}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={userInput}
//             onChange={handleInputChange}
//             placeholder="Type your message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
