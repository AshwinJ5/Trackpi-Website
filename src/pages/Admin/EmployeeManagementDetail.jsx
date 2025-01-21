
import React,{useEffect,useState} from "react";

import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaRegEdit } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../Api Services/serverUrl";



function EmployeeManagementDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const employeeData  = location.state.rowDatas || {};
const[socialMediaLink,setSocialMediaLink]=useState({
  instagram:"",
  facebook:"",
  likedin:"",
  twitter:""
})
useEffect(() => {
  const newLinks = { ...socialMediaLink };

  for (let i = 1; i <= 4; i++) {
    const socialMediaKey = employeeData[`socialmedia${i}`];
    const platformKey = employeeData[`platform${i}`];

    if (socialMediaKey && platformKey) {
      newLinks[socialMediaKey] = platformKey;
    }
  }

  setSocialMediaLink(newLinks);
}, [employeeData]);

    const handleBack = () => {
      navigate(-1); // Go back to previous page
    };


    const handleEdit = () => {
      const employeeId = employeeData._id || employeeData.id; // Replace this with the actual intern's ID
     
      if (employeeId) {
        navigate(`/admin/employeeManagement-addEmployee/${employeeId}`, { state: { employeeData } }); // Navigate to the edit page with the internId
      }
    };
  
    useEffect(() => {
      if (employeeData && employeeData.image) {
          // Construct the full image URL by concatenating SERVER_URL with the image path
          const imageUrl = `${SERVER_URL}${employeeData.image}`; // Use SERVER_URL directly here
          setProfileImage(imageUrl); // Set the image URL to state
      }
    }, [employeeData]);

  // Log for debugging
  console.log("Employee Data:", employeeData);
  console.log("Image URL:", profileImage);
  
   if (!location.state?.rowDatas) {
         return (
           <div className="flex justify-center items-center ">
             <Puff
               visible={true}
               height={80}
               width={80}
               color="#FF9D00"
               ariaLabel="puff-loading"
             />
           </div>
         );
       }
  return (
    <div className="bg-white h-[auto]"> 
          <div className="bg-white w-full py-4 px-6 mx-auto flex justify-end items-end gap-3">
                <button 
                onClick={handleEdit} 
                className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center">
                  <FaRegEdit /> &nbsp; Edit
                </button>
                <button 
                  onClick={handleBack} 
                  className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center"
                >
                  <IoMdArrowBack /> &nbsp; Back
                </button>
          </div>
          <div className="flex justify-center items-center">
          <div className="w-[750px] border rounded-xl shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.58)]">
                <div className="mt-30 bg-white px-0 py-0 text-center text-black" >
                      <div className="personnelfirst" >
                          <h2>{employeeData.name}</h2>
                          <p className="text-2xl font-normal">{employeeData.desig}</p>
                          
                          {profileImage && (
                <img
                  src={profileImage}
                  alt={employeeData.title || "Employee"}
                  className="rounded-md w-52 h-52 personnelimg1 object-cover"
                />
              )}
                        </div>
                       
                </div>
                <div className="  py-4 flex justify-center gap-50 ">
                      <div className="  ">
                      
                                <div className="  px-8 flex flex-col justify-center items-center ">
                                  
                                      <p className="mt-4 font-medium text-justify"><br/><br/><br/>
                                      <span className="font-bold underline">SELF INTRODUCTION:</span>
                                      &nbsp;
                                      {employeeData.selfIntroduction}</p>
                                </div>
                                <div className=" flex justify-evenly gap-20 mt-6 px-10">
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

                                      <FaXTwitter  size={35} className="text-yellow-500 cursor-pointer" />
                                      </Link>}
                              </div>
                      </div>
                </div>
            </div> 
            </div>
     
    </div>
  )
}

export default EmployeeManagementDetail




