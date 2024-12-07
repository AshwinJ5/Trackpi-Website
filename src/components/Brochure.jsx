//import React from "react";

const Brochure = () => {
  const pdfPath = "/images/Technical_Round_Assignment.pdf"; // Replace with actual path
  
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <a href={pdfPath} download="Technical_Round_Assignment.pdf" style={{ textDecoration: "none" }}>
        <button className=" mt-3 p-3 rounded-pill font-bold text-gray-800   hover:text-yellow-900 "
           style={{
          //  padding: "10px 20px",
          //   fontSize: "16px",
          //   color: "#000",
             backgroundColor: "#fde047",
          //   border: "none",
          //   borderRadius: "5px",
          //   cursor: "pointer",
           }}
        >
          
          Download Brochure
        </button>
      </a>
    </div>
  );
};

export default Brochure;
