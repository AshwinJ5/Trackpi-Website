
import EmployeeSales from "../../pages/User/EmployeeSales";
import Personel from "../../pages/User/Personel";
import MemberCard from "./memberCard";
import { useState,useRef} from "react";
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import "../../CSS/teamListMember.css";


 function TeamListMemberCrd({ employees  }) {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    
    const scrollRef = useRef(null);
   
  
    const handleCardClick = (employee) => {
      setSelectedMember(employee); // Set the clicked member's data
      setShowModal(true);        // Open the modal
    
    };
    
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth, // Scroll by container width
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth, // Scroll by container width
        behavior: "smooth",
      });
    }
  };


  //    // Slice employees array to limit to 6 employees 
  // const displayedEmployees = employees?.slice(0, 6);


    return (
        <div className="md:mt-10 lg:mt-10 xl:mt-10 2xl:mt-10 w-full   ">
            <div >
                <div className=" max-w-full mx-auto px-0  md:px-10  lg:px-16 xl:px-20 2xl:px-24 ">
                   <div className="relative w-screen sm:w-full md:gap-8 ">
                        <div 
                            ref={scrollRef}
                            className="flex overflow-x-auto pe-10 sm:pe-0 space-x-0  scroll-snap-x scroll-snap-mandatory   sm:flex-wrap  sm:gap-[20px] xl:gap-[55px]  sm:justify-center">
                           {employees?.map((employee, index) => (
    <div key={employee._id || index}  className="w-[60%] sm:w-[calc(50%-10px)] md:w-[calc(33%-11px)] xl:w-[calc(33%-33px)]  flex-shrink-0 scroll-snap-align-start my-[5px]" >
        <MemberCard employee={employee} onCardClick={() => handleCardClick(employee)} />
    </div>
))}
                                 
                                
                        </div>
                         
                         {/* Scroll Buttons (Only for Mobile Screens) */}
                        <div className="sm:hidden flex justify-between items-center">
                        <button
                            onClick={scrollLeft}
                            className=" text-[#FF9D00] px-4 py-2 rounded-lg"
                        >
                            <FaAngleLeft size={18} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className=" text-[#FF9D00] px-4 py-2 rounded-lg"
                        >
                           <FaAngleRight size={18} />
                        </button>
                        </div>

                    </div>
                </div>
            </div>
             
      
    {/* Render modal */}
      {selectedMember && (
        <Personel
          show={showModal}
          onHide={() => setShowModal(false)}
          employee={selectedMember}
        />
         
      )}


       
     
    
        </div>
    );
}
export default TeamListMemberCrd;