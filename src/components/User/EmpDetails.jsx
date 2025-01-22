
import { GoDotFill } from "react-icons/go";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { useState,useEffect } from "react";
import { SERVER_URL } from "../../Api Services/serverUrl";
import "../../CSS/employeedet.css";
import { Link } from "react-router-dom";
import {Puff}  from 'react-loader-spinner'

const EmpDetails = ({ employeeData }) => {
   if (!employeeData) {
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  if (!employeeData) return <div>Loading...</div>;
   const [profileImage, setProfileImage] = useState(null);
   useEffect(() => {
    if (employeeData && employeeData.profileImage) {
      // Construct the full image URL by concatenating SERVER_URL with the image path
      const imageUrl = `${SERVER_URL}${employeeData.profileImage}`;
      setProfileImage(imageUrl); // Set the image URL to state
    }
  }, [employeeData]);

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

  return (
    <>
      <div className="custom-height h-[135px] py-2 flex flex-col md:flex-row justify-between items-center sm:text-lg md:text-2xl xl:text-xl xl:leading-5 2xl:leading-5 2xl:text-2xl flex-wrap">
        <div className="w-full flex flex-row justify-center items-center gap-4 md:gap-5">
        {profileImage && (
          <img
          src={profileImage}
          style={{
            borderRadius: "30px",
            width: "150px",  // Set the fixed width
            height: "120px", // Set the fixed height
            objectFit: "cover"  // Ensure the image maintains aspect ratio and doesn't stretch
            
          }}
            alt="employee image"
            height={200}
            width={180}
            className="empimg"
            
          />   )}
          <div className="hidden md:block w-full">
            <div className="flex flex-row justify-between items-center text-2xl xl:text-xl ">
              <div className=" flex flex-col flex-wrap justify-start">
                <p className="font-bold text-2xl break-words">{employeeData.name || "Paul Walker"} </p>
                <button
                  style={{ backgroundColor: "#019304", color: "white" }}
                  className="act rounded-pill w-[100px] px-3 py-1 flex flex-row justify-center items-center md:gap-1 text-xs md:text-sm"
                >
                  <GoDotFill size={8} />
                  Active
                </button>
              </div>

              <div>
                <p className="text-sm md:text-lg">Employee ID</p>
                <p className="font-bold text-sm md:text-lg">{employeeData.empID || "EMP001"}</p>
              </div>
              <div>
                <p className="email text-sm md:text-lg">Email</p>
                <p className="font-bold text-sm md:text-lg">{employeeData.email || "paulwalker@gmail.com"}</p>
              </div>
            </div>
          </div>
          <div className="md:hidden w-full flex flex-col justify-between items-start md:flex-row lg:flex-row md:text-2xl xl:text-xl">
            <div className="flex flex-row items-center gap-3" style={{ lineHeight: "1px" }}>
              <p className="font-bold text-sm" style={{ margin: 0 }}>
                {employeeData.name || "Paul Walker"}
              </p>
              <button
                style={{ backgroundColor: "#019304", color: "white", margin: "0px" }}
                className="active rounded-pill w-[100px] px-3 py-1 sm:py-0 sm:px-0 flex flex-row justify-center items-center md:gap-1 text-xs sm:text-xs md:text-sm"
              >
                <GoDotFill size={8} />
                Active
              </button>
            </div>

            <div className="div-1 flex flex-row md:flex-col lg:flex-col gap-2" style={{ lineHeight: "1px" }}>
              <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                Employee ID
              </p>
              <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                {employeeData.empID || "EMP001" }
              </p>
            </div>
            <div className="flex flex-row md:flex-col" style={{ lineHeight: "1px" }}>
              <p className="email text-sm md:text-sm" style={{ margin: 0 }}>
                Email
              </p>
              <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                {employeeData.email ||"paulwalker@gmail.com" }
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal" />
      <div className="custom-height2 h-[300px] mt-3 md:mt-10 flex flex-col md:flex-row md:gap-20 sm:gap-3 mb-4">
        <div className="div3 w-full h-[300px] flex flex-col gap-2 md:gap-4">
          <h5 className="connect-text-Color font-medium">Personal Information</h5>
          <div className="phone" style={{ lineHeight: "1px" }}>
            <p className="text-sm md:text-lg" style={{ margin: 0 }}>
              Phone
            </p>
            <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
              {employeeData.phone || "9876543210"}
            </p>
          </div>

          <div className="phone" style={{ lineHeight: "1px" }}>
            <p className="text-sm md:text-lg" style={{ margin: 0 }}>
              Address
            </p>
            <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
              {employeeData.fullAddress || "Church Street, Jude Town, Evasteen, 31562"}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex flex-row justify-between">
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-lg" style={{ margin: 0 }}>
                  Gender
                </p>
                <p className="font-bold text-lg" style={{ margin: 0 }}>
                  {employeeData.gender || "Male"}
                </p>
              </div>
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-lg" style={{ margin: 0 }}>
                  Date Of Birth
                </p>
                <p className="font-bold text-lg" style={{ margin: 0 }}>
                {employeeData.dob ? formatDate(employeeData.dob) : "10/03/2000"}

                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between md:hidden">
            <div className="phone" style={{ lineHeight: "1px" }}>
              <p className="text-sm" style={{ margin: 0 }}>
                Date Of Birth
              </p>
              <p className="font-bold text-sm" style={{ margin: 0 }}>
              {employeeData.dob ? formatDate(employeeData.dob) : "10/03/2000"}
              </p>
            </div>
            <div className="phone" style={{ lineHeight: "1px" }}>
              <p className="text-sm" style={{ margin: 0 }}>
                Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <p className="font-bold text-sm" style={{ margin: 0 }}>
                {employeeData.gender  || "Male"}
              </p>
            </div>
          </div>

          <div className="phone" style={{ lineHeight: "1px" }}>
            <p className="text-sm md:text-lg" style={{ margin: 0 }}>
              Blood Group
            </p>
            <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
              {employeeData.bloodGroup || "A+"}
            </p>
          </div>
        </div>

        <div className="vertical-line w-[1px] h-[300px] bg-gray-400"></div>

        <div className="div4 w-full h-[300px] flex flex-col gap-2 md:gap-4">
          <h5 className="connect-text-Color font-medium">Employment Overview</h5>
          <div className="hidden md:block">
            <div className="flex flex-col gap-2">
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Date Of Joining
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                 
                  {employeeData.dateOfJoining ? formatDate(employeeData.dateOfJoining) : "10/03/2000"}
                </p>
              </div>

              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Job Role
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.jobRole || "Sales Manager"}
                </p>
              </div>

              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Employment Status
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.employeeStatus || "Full Time"}
                </p>
              </div>

              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Job Level
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.jobLevel || "Entry Level"}
                </p>
              </div>
            </div>
          </div>

          <div className="md:hidden flex flex-row justify-between  mb-18">
            <div className="flex flex-col gap-2">
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Date Of Joining
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                {employeeData.dateOfJoining ? formatDate(employeeData.dateOfJoining) : "10/03/2000"}
                </p>
              </div>
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Employment Status
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.employeeStatus || "Full Time"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Job Role
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.jobRole || "Sales Manager"}
                </p>
              </div>
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Job Level
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.jobLevel || "Entry Level"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bot flex justify-center gap-12 mt-8 sm:mt-16  md:mt-3 2xl:mt-8 px-10 py-2 md:py-0 mb-3  sm:mb-5 md:mb-3 lg:mb-3 xl:mb-0 ">
        {socialMediaLink.facebook&&<Link target="_blank"  to={`${socialMediaLink.facebook}`}  className="flex justify-center items-center">
                                              <RiFacebookCircleLine size={24} className=" ico text-yellow-500 cursor-pointer" />
                                          </Link>}
                                          {socialMediaLink.instagram&&<Link target="_blank"  to={`${socialMediaLink.instagram}`}className="flex justify-center items-center" >
                                              <IoLogoInstagram  size={24} className=" ico text-yellow-500 cursor-pointer" />
                                              </Link>}
                                             {socialMediaLink.likedin&& <Link target="_blank"  to={`${socialMediaLink.likedin}`}className="flex justify-center items-center" >
        
                                              <TbBrandLinkedin size={24} className="ico text-yellow-500 cursor-pointer" />
                                              </Link>}
                                              {socialMediaLink.twitter&&<Link target="_blank"  to={`${socialMediaLink.twitter}`} className="flex justify-center items-center">
        
                                              <FaXTwitter  size={24} className=" ico text-yellow-500 cursor-pointer" />
                                              </Link>}
      </div>
    </>
  );
};

export default EmpDetails;
