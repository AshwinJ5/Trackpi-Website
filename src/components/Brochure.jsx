import React from "react";
import { RiDownload2Fill } from "react-icons/ri";

const Brochure = () => {

  const pdfPath = "/images/Technical_Round_Assignment.pdf"; // Replace with actual path
  
  // return (
  //   <div style={{ textAlign: "center", position:"absolute",zIndex:"2",marginTop:"92px",marginLeft:"1250px"}}>
  //     <a href={pdfPath} download="Technical_Round_Assignment.pdf" style={{ textDecoration: "none" }}>

  //       <button className=" px-3 py-2 font-bold text-white bg-gradient-to-r from-[#FFC100] to-[#FF9D00]  rounded-lg  hover:text-white">
       

          
  //             Company Brochure
  //             &nbsp;
  //             <i className="fa-solid fa-download me-2"></i>
  //       </button>
  //     </a>
  //   </div>
  // );

   

    return (
        <>
            <a href={pdfPath} download="Technical_Round_Assignment.pdf" style={{ textDecoration: "none" }}>
                <button className="bg-gradient-to-r from-[#FFC100] to-[#FF9D00]  text-white lg:rounded-[10px]  sm:rounded-[7.5px] rounded-[5px] px-[10px] py-[5px] sm:px-[12px] sm:py-[6px] md:px-[14px] md:py-[7px] lg:px-[16px] lg:py-[8px] xl:px-[18px] xl:py-[9px] 2xl:px-[20px] 2xl:py-[10px] font-bold flex items-center space-x-2 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[14px]">
                    <span>Company Brochure</span>
                    <RiDownload2Fill className="hidden sm:block" />
                </button>
            </a>
        </>
    );

};

export default Brochure;
