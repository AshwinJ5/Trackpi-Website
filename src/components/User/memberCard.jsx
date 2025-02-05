// import { useNavigate } from "react-router-dom";
import "../../CSS/teamListMember.css";
import React,{useEffect,useState} from "react";
import { SERVER_URL } from "../../Api Services/serverUrl";
function MemberCard({ employee, onCardClick }) {
  const [profileImage, setProfileImage] = useState(null);
  // const navigate = useNavigate();

  // const handleNavigation = () => {
  //   navigate("/personnel", { state: props.setCmp }); // Pass data via 'state'
  // };
    useEffect(() => {
      if (employee && employee.image) {
          // Construct the full image URL by concatenating SERVER_URL with the image path
          const imageUrl = `${SERVER_URL}${employee.image}`; // Use SERVER_URL directly here
          setProfileImage(imageUrl); // Set the image URL to state
      }
    }, [employee]);
  return (
      <div
        className="me-[10px] sm:me-0
        bg-white shadow-sm transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={onCardClick} // Trigger the modal opening
      >
        <div className="relative overflow-hidden">
        {profileImage && (
                <img
                  src={profileImage}
                  
                  alt={employee.title || "Employee"}
                  className="w-full h-auto transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
              )}
          
        </div>
        <div className="p-2 md:p-6">
          <span className="text-[16px] sm:text-lg font-bold text-gray-800 hover:text-gray-600 cursor-pointer block md:mb-2">
            {employee.name}
          </span>
          <p className="text-[10px] sm:text-sm   text-gray-500 mb-1">
            {employee.desig}
          </p>
         
        </div>
      </div>
  );
}

export default MemberCard;
