

import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import EmpDetails from "../../components/User/EmpDetails";
import "../../CSS/employeeinternship.css";
function EmployeeInternship() {
  const location = useLocation();
  const employeeData = location.state?.rowDatas || {};

   const useScreenshotPrevention = () => {
      useEffect(() => {
        // Block context menu
        const handleContextMenu = (e) => {
          e.preventDefault();
          alert('Right-click is disabled.');
        };
    
           // Block keydown events
      const handleKeyDown = (e) => {
        // Prevent PrintScreen and Ctrl+P
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
          e.preventDefault();
          alert('Screenshots and printing are disabled.');
        }
      };
         // Block copy and paste
         const handleCopyPaste = (e) => {
          e.preventDefault();
          alert('Copying and pasting are disabled.');
        };
           // Block share menu (on mobile)
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
        alert('Sharing is disabled.');
      };
    
        // Attach event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('copy', handleCopyPaste);
      document.addEventListener('paste', handleCopyPaste);
      window.addEventListener('beforeunload', handleBeforeUnload);
  
    
        // Cleanup on component unmount
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('copy', handleCopyPaste);
          document.removeEventListener('paste', handleCopyPaste);
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
    };
    useScreenshotPrevention();

  return (
    <div className="pad mt-20 w-full py-6 md:py-10 md:px-6 lg:px-20 xl:px-24 2xl:px-32 mx-auto "
     >
       <EmpDetails employeeData={employeeData}/>
       <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-12 sm:text-lg md:text-xl xl:text-xl xl:leading-7 2xl:leading-7 2xl:text-2xl md:mt-4 2xl:mt-8 ">
                  <div>
                    <h5 className="connect-text-Color font-medium ">Feedback</h5>
                    <br/>
                    <ul className="feed list-disc text-justify text-sm sm:text-lg md:text-md xl:text-lg xl:leading-7 2xl:leading-9 2xl:text-xl leading-7  font-medium space-y-2">
                        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo a commodi minus! Repudiandae deleniti excepturi ad ducimus molestiae dicta recusandae nobis earum, quisquam magnam odio! Accusantium ducimus rem fuga optio.</li>
                        
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla deleniti nihil ad architecto? Corporis laborum impedit rerum expedita non nemo amet quas! Unde ratione sint laboriosam dolores qui repellendus beatae.</li>
                       
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti minus ad, beatae facere sint veniam error natus consectetur corrupti quasi omnis quis illo. Quidem, inventore omnis? Nesciunt officia possimus fugit.</li>
                    </ul>
                  </div>
                <div className="relative flex flex-col justify-center items-center ">
                        <div
                            className=" custom-height3 w-[326px] md:w-full h-[138px] md:h-[350px] xl:h-[360px] flex justify-center items-center rounded-t-md"
                            style={{  backgroundColor: "#2A2A2A" }}
                        >
                           {/* Dynamic Watermark */}
               <div
      className="absolute text-gray-500 opacity-30 text-[14px] sm:text-[19px] md:text-[21px] lg:text-[24px] font-bold"
      style={{
        transform: "rotate(-45deg)",
        top: "50%",
        left: "50%",
        transformOrigin: "center",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        whiteSpace: "nowrap", // Prevent line breaks
        pointerEvents: "none", // Ensure it doesn't block user interactions
        zIndex: 1, // Make sure the watermark appears over the certificate
      }}
    >
      {employeeData.name ||  "Paul Walker"} | {new Date().toLocaleString()}
    </div>
                            <h6 className="text-white text-center container w-50 ">
                            Internship Certificate
                            </h6>
                        </div>
                        <div className=" w-[326px] md:w-full h-[22px] md:h-[60px] xl:h-[70px] bg-yellow-400 flex items-center justify-start rounded-b-md" >
                            <p className="text-white px-4  mt-3 text-sm sm:text-lg md:text-xl xl:text-xl xl:leading-7 2xl:leading-10 2xl:text-xl">Employee Name</p>
                        </div>
                    </div>
                    
        </div>
                

    </div>
  );
}

export default EmployeeInternship;