
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React,{useEffect,useState} from "react";
import { IoLogoInstagram } from "react-icons/io5";
// import { SlSocialYoutube } from "react-icons/sl";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
// import { IoMdClose } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { FaXTwitter } from "react-icons/fa6";
import "../../CSS/personnel.css";
import { Link } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../Api Services/serverUrl";
function Personel({ show, onHide,employee  }) {
  const [profileImage, setProfileImage] = useState(null);
     useEffect(() => {
        if (employee && employee.image) {
            // Construct the full image URL by concatenating SERVER_URL with the image path
            const imageUrl = `${SERVER_URL}${employee.image}`; // Use SERVER_URL directly here
            setProfileImage(imageUrl); // Set the image URL to state
        }
      }, [employee]);
      const[socialMediaLink,setSocialMediaLink]=useState({
        instagram:"",
        facebook:"",
        likedin:"",
        twitter:""
      })
      useEffect(() => {
        const newLinks = { ...socialMediaLink };
      
        for (let i = 1; i <= 4; i++) {
          const socialMediaKey = employee[`socialmedia${i}`];
          const platformKey = employee[`platform${i}`];
      
          if (socialMediaKey && platformKey) {
            newLinks[socialMediaKey] = platformKey;
          }
        }
      
        setSocialMediaLink(newLinks);
      }, [employee]);
 
  return (
    <Modal show={show} onHide={onHide} centered size="md" >
      <Modal.Header className="modhead backcolor px-1 py-1 text-center text-black" >
        <Modal.Title className="personnelfirst" >
          <h2>{employee.name}</h2>
          <p className="md:text-xl lg:text-xl xl:text-2xl font-normal desig">{employee.desig}</p>
          <button
            onClick={onHide}
            className="buttcross"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "none",
              borderRadius: "50%",
              color: "black",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              fontSize: "30px",
            }}
          >
            &times;
          </button>
          </Modal.Title>
          {profileImage && (
                <img
                  src={profileImage}
                  alt={employee.title || "Employee"}
                  className="rounded-xl w-54 h-52 personnelimg object-cover"
                  />
              )}
        
      </Modal.Header>
      <Modal.Body className="modbod px-2  py-4 flex gap-50  ">
        <div className="modb">
         
          <div className="  px-8 flex flex-col justify-center items-center ">
            
            <p className="mt-4 font-normal text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] xs:leading-2 sm:leading-4 lg:leading-5 xl:leading-5 2xl:leading-5"><br/><br/><br/>
            <span className="font-bold underline decoration-gray-300">SELF INTRODUCTION</span>
            &nbsp;
            {employee.selfIntroduction}</p>
          </div>
          <div className=" flex justify-evenly gap-20 md:mt-6 px-10">
          {socialMediaLink.facebook&&<Link target="_blank"  to={`${socialMediaLink.facebook}`} >
                                                       <RiFacebookCircleLine size={35} className="text-yellow-500 cursor-pointer" />
                                                   </Link>}
                                                   {socialMediaLink.instagram&&<Link target="_blank"  to={`${socialMediaLink.instagram}`} >
                                                       <IoLogoInstagram size={35} className="text-yellow-500 cursor-pointer" />
                                                       </Link>}
                                                      {socialMediaLink.likedin&& <Link target="_blank"  to={`${socialMediaLink.likedin}`} >
                 
                                                       <TbBrandLinkedin size={35} className="text-yellow-500 cursor-pointer" />
                                                       </Link>}
                                                       {socialMediaLink.twitter&&<Link target="_blank"  to={`${socialMediaLink.twitter}`} >
                 
                                                       <FaXTwitter   size={35} className="text-yellow-500 cursor-pointer" />
                                                       </Link>}
        </div>
        </div>
      </Modal.Body>
      
    </Modal>
  );
}

export default Personel;
