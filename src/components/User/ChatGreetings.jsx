import React, { useState, useEffect, useRef } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import "../../CSS/User/ChatBox.css";
const Chatbox = () => {
    const [messages, setMessages] = useState([]);

    const [isChatOpen, setIsChatOpen] = useState(true);
    const chatboxRef = useRef(null);

    const companyMessages = [
        "Hi there! How can we assist you?",
        "Contact: +91 80781 79646",
        "Email: operations@trackpi.in",
    ];
    useEffect(() => {
        if (!isChatOpen) return;

        setMessages([companyMessages[0]]);
        let index = 1;
        const interval = setInterval(() => {
            if (index < companyMessages.length) {
                setMessages([companyMessages[0], companyMessages[1], companyMessages[2]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isChatOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
                setIsChatOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isChatOpen) return null;

    return (
        <div
            ref={chatboxRef}
            className="chatbox relative rounded-lg shadow-lg w-80 h-80 py-4 mx-auto flex flex-col items-center"
        >
            <div className="absolute -top-6 bg-white rounded-full p-2 shadow-md">
                <TbMessageChatbot color="#419129" className="md:w-12 md:h-12 w-[40px] h-[40px] " />
            </div>

            <div className="md:mt-8 mt-[20px] w-full md:px-[24px] px-[5px] overflow-y-auto max-h-96 chatboxContent">
                {messages.map(
                    (message, index) =>
                        message && (
                            <div
                                key={index}
                                className={`message bg-green-100 md:p-3 p-[10px] mb-2 rounded-lg shadow-md text-black md:text-sm text-[10px]  ${
                                    index === messages.length - 1 ? "slide-in-inside" : "slide-in-outside"
                                }`}
                            >
                                {message.includes("Contact") ? (
                                    <div className="flex items-center">
                                        <IoCallSharp color="#419129" size={20} className="mr-2" />
                                        {message}
                                    </div>
                                ) : message.includes("Email") ? (
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
