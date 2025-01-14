import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/connectButton.css';
import Whatsapp from '../images/whatsapp.svg';
import signal from '../images/signal.svg';
import hand from '../images/hand.svg';
import bot from '../images/bot.svg';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { TbMessageChatbot } from 'react-icons/tb';
import { IoCallSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import ChatBox from "../components/User/ChatGreetings"

function ConnectButtons() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const chatboxRef = useRef(null);

  // Toggle chatbox
  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  // Close chatbox on outside click
  const handleClickOutside = (event) => {
    if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
      setIsChatboxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

      const navigate = useNavigate();
  
  const handleNavigation = (path, hash) => {    
    navigate(path);
    setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }, 100);
};

  return (
    <>
      <div className="wrapper">
        <NavLink
          data-tooltip-id="signal-tooltip"
          data-tooltip-content="News Updates"
          data-tooltip-place="left"
          to=""
          className="button"
        >
          <div className="icons">
            <img src={signal} alt="Signal" />
          </div>
        </NavLink>
        <NavLink
          data-tooltip-id="whatsapp-tooltip"
          data-tooltip-content="Whatsapp"
          data-tooltip-place="left"
          to="https://wa.me/+918078179646/ "  
          className="button"
        >
          <div className="icons">
            <img src={Whatsapp} alt="Whatsapp" />
          </div>
        </NavLink>
        <NavLink
  data-tooltip-id="connectus-tooltip"
  data-tooltip-content="Connect Us"
  data-tooltip-place="left"
  onClick={() => handleNavigation("/connect-us", "#connectUsContainer")}  className="button"
>

          <div className="icons">
            <img src={hand} alt="Connect Us" />
          </div>
        </NavLink>
        <div
          data-tooltip-id="bot-tooltip"
          data-tooltip-content="Bot"
          data-tooltip-place="left"
          className="button"
          onClick={toggleChatbox}
        >
          <div className="icons">
            <img src={bot} alt="Bot" />
          </div>
        </div>
      </div>

      {/* Chatbox */}
      {isChatboxOpen && (
       <ChatBox />
      )}

      <Tooltip id="signal-tooltip" />
      <Tooltip id="whatsapp-tooltip" />
      <Tooltip id="connectus-tooltip" />
      <Tooltip id="bot-tooltip" />
    </>
  );
}

export default ConnectButtons;
