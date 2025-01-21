

import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import EmpDetails from "../../components/User/EmpDetails";
import "../../CSS/employeeinternship.css";
import { SERVER_URL } from "../../Api Services/serverUrl";
function EmployeeInternship() {
  const location = useLocation();
  const employeeData = location.state?.rowDatas || {};
  console.log(employeeData);
  

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
                    {employeeData.feedback
                ? employeeData.feedback.split('\n').map((point, index) => (
                    <li key={index} className="text-base">{point}</li>
                  ))
                : <li>No feedback available for this employee.</li>}
                    </ul>
                  </div>
                  <div  className="relative flex flex-col justify-center items-center">
           
           <div 
           className="custom-height3 w-[326px] md:w-full h-[138px] md:h-[310px] xl:h-[320px] flex justify-center items-center rounded-t-md" style={{ backgroundColor: '#2A2A2A' }}
         >
         {employeeData.Certificate ? (
                   <>
                             <iframe
                               src={`${SERVER_URL}${employeeData.Certificate}#toolbar=0`}
                               title="Internship Certificate"
                               className="w-full h-full rounded-lg"
                               style={{
                                 border: 'none',
                                 overflow: 'auto', // Allow scrolling
                               }}
                               onContextMenu={(e) => {
                                 e.preventDefault(); // Prevent right-click
                                 alert('Right-click is disabled.');
                               }}
                             ></iframe>

                             {/* Transparent Overlay for Right-click Prevention */}
                             <div
                               className="absolute top-0 left-0 w-full h-full"
                               style={{
                                 backgroundColor: 'transparent',
                                 pointerEvents: 'auto', // Prevent right-click on the overlay, but allow scrolling
                               }}
                               onContextMenu={(e) => {
                                 e.preventDefault(); // Disable right-click on the overlay
                                 alert('Right-click is disabled.');
                               }}
                             ></div>

                           {/* Dynamic Watermark */}
                           <div
                             className="absolute text-gray-500 opacity-30 text-[14px] sm:text-[19px] md:text-[21px] lg:text-[24px] font-bold"
                             style={{
                               top: '50%',
                               left: '50%',
                               transform: 'translate(-50%, -50%) rotate(-45deg)',
                               whiteSpace: 'nowrap', // Prevent line breaks
                               pointerEvents: 'none', // Ensure it doesn't block user interactions
                             }}
                               >
                                 {employeeData.name} | {new Date().toLocaleString()}
                               </div>
                   </>
               ) : (
                   <div className="text-white text-center">Internship Certificate</div>
               )}</div>
<div className="w-[326px] md:w-full h-[22px] md:h-[29px] xl:h-[39px] bg-yellow-400 flex items-center justify-start rounded-b-md">
 <p className="text-white px-4 mt-3 text-sm sm:text-lg md:text-xl xl:text-xl xl:leading-7 2xl:leading-10 2xl:text-xl">
   {employeeData.name}
 </p>
</div>
</div>
                    
        </div>
                

    </div>
  );
}

export default EmployeeInternship;
