import React from "react";
import './Voucherpage.css';

const ToolCard = ({ title, subtitle, description, isChecked, onCheckboxChange, logo }) => {
  const titleStyle = { // New style for the title
    fontSize: "18px", // Increased font size – adjust as needed
    fontWeight: "bold", // Keep it bold
    color: "black",
  };

  return (
    <div
      className="tool-card rounded-[40px] bg-gradient-to-r from-[#FEDC3F] to-[#FE8900] shadow-md flex flex-col relative p-4 sm:p-6 md:p-8 h-full" 
    >
      <div className="absolute top-3 right-3">
        <input 
          type="checkbox" 
          className="w-5 h-5 border rounded-[7px] border-black appearance-none checked:bg-black checked:border-black" 
          checked={isChecked} 
          onChange={onCheckboxChange} 
        />
      </div>

      <div className="flex items-center space-x-3"> 
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          {logo && <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />}
        </div>
        <h3 className="font-bold text-md text-black" style={titleStyle}>{title}</h3>
      </div>

      <div className="mt-2 flex-grow"> {/* Spacing added here */}
        <h4 className="font-bold text-sm sm:text-base md:text-lg text-black">{subtitle}</h4>
        <p className="text-xs sm:text-sm md:text-base text-black mt-2 leading-[1.2]">{description}</p>
      </div>

      <div className="absolute bottom-3 right-3 w-6 h-6 border border-white rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-bold">i</span>
      </div>
    </div>
  );
};

export default ToolCard;