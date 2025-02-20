import React from "react";
import './Voucherpage.css';

const ToolCard = ({ title, subtitle, description, isChecked, onCheckboxChange, logo }) => {
  return (
    <div className="tool-card rounded-[30px] bg-gradient-to-r from-[#FEDC3F] to-[#FE8900] shadow-md flex flex-col relative p-4">
      {/* Checkbox in top-right corner */}
      <div className="absolute top-2 right-2">
        <input 
          type="checkbox" 
          className="w-5 h-5 border rounded-[7px] border-black appearance-none checked:bg-black checked:border-black" 
          checked={isChecked} 
          onChange={onCheckboxChange} 
        />
      </div>

      {/* Logo & Title Section */}
      <div className="flex items-center space-x-3 mb-2"> 
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
          {/* ✅ Corrected image positioning */}
          <img src="/assets/images/trackpil.png" alt="Logo" className="w-10 h-10 object-contain rounded-full" />
        </div>
        <h3 className="font-bold text-lg text-black">{title}</h3>
      </div>

      {/* Description Section */}
      <div className="mt-2 flex-grow">
        <h4 className="font-bold text-md sm:text-lg text-black">{subtitle}</h4>
        <p className="text-sm sm:text-base text-black mt-2">{description}</p>
      </div>

      {/* Info Icon at Bottom Right */}
      <div className="absolute bottom-3 right-3 w-6 h-6 border border-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-white text-sm font-bold">i</span>
      </div>
    </div>
  );
};

export default ToolCard;


// import React from "react";
// import './Voucherpage.css';

// const ToolCard = ({ title, subtitle, description, isChecked, onCheckboxChange, logo }) => {
//   const titleStyle = { // New style for the title
//     fontSize: "20px", // Increased font size – adjust as needed
//     fontWeight: "bold", // Keep it bold
//     color: "black",
//   };

//   return (
//     <div className="tool-card rounded-[30px] bg-gradient-to-r from-[#FEDC3F] to-[#FE8900] shadow-md flex flex-col relative p-2 sm:p-4">
//       <div className="absolute top-2 right-2">
//         <input 
//           type="checkbox" 
//           className="w-5 h-5 border rounded-[7px] border-black appearance-none checked:bg-black checked:border-black" 
//           checked={isChecked} 
//           onChange={onCheckboxChange} 
//         />
//       </div>

//       <div className="flex items-center space-x-3"> 
//         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//           {/* ✅ Correct way to load image from public folder */}
//           <img src={`/assets/images/trackpi_logo/${logo}`} alt="Logo" className="w-8 h-8 rounded-full" />
//         </div>
//         <h3 className="font-bold text-md text-black" style={titleStyle}>{title}</h3>
//       </div>

//       <div className="mt-2 flex-grow">
//         <h4 className="font-bold text-lg sm:text-xl md:text-lg text-black">{subtitle}</h4>
//         <p className="text-sm sm:text-base md:text-lg text-black mt-2 leading-[1.4]">{description}</p>
//       </div>

//       <div className="absolute bottom-3 right-3 w-6 h-6 border border-white rounded-full flex items-center justify-center">
//         <span className="text-white text-sm font-bold">i</span>
//       </div>
//     </div>
//   );
// };

// export default ToolCard;
