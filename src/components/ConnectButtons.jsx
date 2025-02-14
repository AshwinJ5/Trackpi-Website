import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/connectButton.css";


import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ChatBox from "../components/User/ChatGreetings";

function ConnectButtons() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const chatboxRef = useRef(null);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleClickOutside = (event) => {
    if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
      setIsChatboxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    }, 300);
  };

  return (
    <>
      <div className="wrapper">
        <NavLink
          data-tooltip-id="signal-tooltip"
          data-tooltip-content="News Updates"
          data-tooltip-place="left"
          to="https://www.instagram.com/business_flash_news?igsh=eng2anQ4bjNmY3l4"
          target="_blank"
          className="button"
        >
          <div className="icons">
            <img src="/assets/svg/signal.svg" alt="Signal" />
          </div>
        </NavLink>
        <NavLink
          data-tooltip-id="whatsapp-tooltip"
          data-tooltip-content="Whatsapp"
          data-tooltip-place="left"
          to="https://wa.me/+918078179646/ "
          target="_blank"
          className="button"
        >
          <div className="icons">
            <img src="/assets/svg/whatsapp.svg" alt="Whatsapp" />
          </div>
        </NavLink>
        <div
          data-tooltip-id="connectus-tooltip"
          data-tooltip-content="Connect Us"
          data-tooltip-place="left"
          onClick={() => handleNavigation("/contact-us", "#connectUsContainer")}
          className="button"
        >
          <div className="icons">
            <img src="/assets/svg/hand.svg" alt="Connect Us" />
          </div>
        </div>
        <div
          data-tooltip-id="bot-tooltip"
          data-tooltip-content="Bot"
          data-tooltip-place="left"
          className="button"
          onClick={toggleChatbox}
        >
          <div className="icons">
            <img src="/assets/svg/bot.svg" alt="Bot" />
          </div>
        </div>
      </div>

      {isChatboxOpen && (
        <ChatBox isChatOpen={isChatboxOpen} toggleChatbox={toggleChatbox} />
      )}

      <Tooltip id="signal-tooltip" />
      <Tooltip id="whatsapp-tooltip" />
      <Tooltip id="connectus-tooltip" />
      <Tooltip id="bot-tooltip" />
    </>
  );
}

export default ConnectButtons;
