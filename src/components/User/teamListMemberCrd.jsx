
import EmployeeSales from "../../pages/User/EmployeeSales";
import Personel from "../../pages/User/Personel";
import MemberCard from "./memberCard";
import { useState,useRef} from "react";
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import "../../CSS/teamListMember.css";
import EmployeeManagementDetail from "../../pages/Admin/EmployeeManagementDetail";


const memberList = [
    {  
         id:1,
        image: ('src/images/personnel-1-400x310.jpg'),
        title: 'Paul Walker',
        designation: 'Chief Executive Officer',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',
    },
    {   id:2,
        image:( 'src/images/personnel-2-400x310.jpg'),
        title: 'Jeanette Kingston',
        designation: 'Vice President',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',

    },
    {   id:3,
        image: ('src/images/personnel-3-400x310.jpg'),
        title: 'John Smithy',
        designation: 'Chief Financial Officer',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:' dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',

    },
    {   id:4,
        image: ('src/images/personnel-4-400x310.jpg'),
        title: 'Linda Kloe',
        designation: 'Senior Engineer',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:'  dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',

    },
    {   id:5,
        image: ('src/images/personnel-5-400x310.jpg'),
        title: 'Ricardo Gomez',
        designation: 'HR Manager',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:' dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',

    },
    {   
        id:6,
        image: ('src/images/personnel-6-400x310.jpg'),
        title: 'Jeneth Kings',
        designation: 'Chief Technology Officer',
        ph: '+1-334-3452-345',
        mail: 'Johnsm@financitytheme.com',
        titleLink: '/personnel',
        selfIntroduction:' dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor',

    },
];

 function TeamListMemberCrd() {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    
    const scrollRef = useRef(null);
   
  
    const handleCardClick = (member) => {
      setSelectedMember(member); // Set the clicked member's data
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
    
   
    return (
        <div className="md:mt-10 lg:mt-10 xl:mt-10 2xl:mt-10 w-full   ">
            <div>
                <div className=" max-w-full mx-auto  md:px-10 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
                   <div className="relative">
                        <div 
                            ref={scrollRef}
                            className="flex overflow-x-auto  space-x-0  scroll-snap-x scroll-snap-mandatory  md:grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-8">
                            {memberList.map((item, index) => (
                                <div className="min-w-[full] md:min-w-0 flex-shrink-0   scroll-snap-align-start">
                                <MemberCard key={index}  member={item} onCardClick={() => handleCardClick(item)} />
                                </div>
                                ))}
                                 
                                
                        </div>
                         {/* Scroll Buttons (Only for Mobile Screens) */}
                        <div className="md:hidden flex justify-between items-center mt-4">
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
          member={selectedMember}
        />
         
      )}


       
     
    
        </div>
    );
}
export default TeamListMemberCrd;