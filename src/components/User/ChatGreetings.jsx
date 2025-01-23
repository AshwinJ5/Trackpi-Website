import React, { useState, useEffect, useRef } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import { IoCallSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import '../../CSS/User/ChatBox.css'; // Import the CSS file for animations

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(true); // State to track chatbox visibility
  const chatboxRef = useRef(null);

  const companyMessages = [
    'Hi there! How can we assist you?',
    'Contact: +91 80781 79646',
    'Email: operations@trackpi.in',
  ];

  useEffect(() => {
    if (!isChatOpen) return;

    // Reset messages every time the chatbox opens
    setMessages([companyMessages[0]]);
    let index = 1; // Start from the second message

    const interval = setInterval(() => {
      if (index < companyMessages.length) {
        setMessages(prevMessages => [...prevMessages, companyMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Delay between each message (2 seconds)

    return () => clearInterval(interval);
  }, [isChatOpen]);

  // Close chatbox when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isChatOpen) return null; // Hide chatbox if closed

  return (
    <div
      ref={chatboxRef}
      className="chatbox relative rounded-lg shadow-lg w-80 h-80 py-4 mx-auto flex flex-col items-center"
    >
      {/* Chatbot Icon */}
      <div className="absolute -top-6 bg-white rounded-full p-2 shadow-md">
        <TbMessageChatbot color="#419129" className="w-12 h-12" />
      </div>

      {/* Chatbox Content */}
      <div className="mt-8 w-full px-4 overflow-y-auto max-h-96">
        {messages.map(
          (message, index) =>
            message && (
              <div
                key={index}
                className={`message bg-green-100 p-3 mb-2 rounded-lg shadow-md text-black text-sm ${
                  index === messages.length - 1 ? 'slide-in-inside' : ''
                }`}
              >
                {message.includes('Contact') ? (
                  <div className="flex items-center">
                    <IoCallSharp color="#419129" size={20} className="mr-2" />
                    {message}
                  </div>
                ) : message.includes('Email') ? (
                  <div className="flex items-center">
                    <MdEmail color="#419129" size={20} className="mr-2" />
                    {message}
                  </div>
                ) : (
                  message
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Chatbox;
