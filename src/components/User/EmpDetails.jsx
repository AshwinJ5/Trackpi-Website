import { GoDotFill } from "react-icons/go";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";

import "../../CSS/employeedet.css";
import imagepersonnel1 from '../../images/personnel-1-400x286.jpg'
const EmpDetails = ({ employeeData }) => {
  if (!employeeData) return <div>Loading...</div>;

  return (
    <>
      <div className="custom-height h-[135px] py-2 flex flex-col md:flex-row justify-between items-center sm:text-lg md:text-2xl xl:text-xl xl:leading-5 2xl:leading-5 2xl:text-2xl">
        <div className="w-full flex flex-row justify-center items-center gap-4 md:gap-5">
          <img
            src={employeeData.image || imagepersonnel1}
            alt="employee image"
            height={200}
            width={180}
            className="empimg"
            style={{ borderRadius: "30px" }}
          />
          <div className="hidden md:block w-full">
            <div className="flex flex-row justify-between items-center text-2xl xl:text-xl w-full">
              <div>
                <p className="font-bold text-2xl">{employeeData.name || "Paul Walker"} </p>
                <button
                  style={{ backgroundColor: "#019304", color: "white" }}
                  className="act rounded-pill px-3 py-1 flex flex-row justify-center items-center md:gap-1 text-xs md:text-sm"
                >
                  <GoDotFill size={8} />
                  Active
                </button>
              </div>

              <div>
                <p className="text-sm md:text-lg">Employee ID</p>
                <p className="font-bold text-sm md:text-lg">{employeeData.employeeId || "EMP001"}</p>
              </div>
              <div>
                <p className="email text-sm md:text-lg">Email</p>
                <p className="font-bold text-sm md:text-lg">{employeeData.email || "paulwalker@gmail.com"}</p>
              </div>
            </div>
          </div>
          <div className="md:hidden w-full flex flex-col justify-between items-start md:flex-row lg:flex-row md:text-2xl xl:text-xl">
            <div className="flex flex-row items-center gap-3" style={{ lineHeight: "1px" }}>
              <p className="font-bold" style={{ margin: 0 }}>
                {employeeData.name || "Paul Walker"}
              </p>
              <button
                style={{ backgroundColor: "#019304", color: "white", margin: "0px" }}
                className="active rounded-pill px-3 py-1 sm:py-0 sm:px-0 flex flex-row justify-center items-center md:gap-1 text-xs sm:text-xs md:text-sm"
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
                {employeeData.employeeId || "EMP001" }
              </p>
            </div>
            <div className="flex flex-row md:flex-col" style={{ lineHeight: "1px" }}>
              <p className="email text-sm md:text-lg" style={{ margin: 0 }}>
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
      <div className="custom-height2 h-[300px] mt-3 md:mt-10 flex flex-col md:flex-row md:gap-20 sm:gap-3">
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
              {employeeData.address || "Church Street, Jude Town, Evasteen, 31562"}
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
                  {employeeData.dob || "10/03/2000"}
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
                {employeeData.dob || "10/03/2000"}
              </p>
            </div>
            <div className="phone" style={{ lineHeight: "1px" }}>
              <p className="text-sm" style={{ margin: 0 }}>
                Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                  {employeeData.doj || "1/12/20124"}
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
                  {employeeData.employmentStatus || "Full Time"}
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

          <div className="md:hidden flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Date Of Joining
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.doj ||"1/12/20124"}
                </p>
              </div>
              <div className="phone" style={{ lineHeight: "1px" }}>
                <p className="text-sm md:text-lg" style={{ margin: 0 }}>
                  Employment Status
                </p>
                <p className="font-bold text-sm md:text-lg" style={{ margin: 0 }}>
                  {employeeData.employmentStatus || "Full Time"}
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

      <div className="flex justify-center gap-20 mt-8 md:mt-3 2xl:mt-8 px-10 py-2 md:py-0 mb-3 md:mb-3 lg:mb-3 xl:mb-0 ">
        <a
          href={employeeData.instagram}
          target="_blank"
          className="social-link text-yellow-500  text-2xl md:text-3xl lg:text-4xl cursor-pointer"
        >
          <IoLogoInstagram />
        </a>
        <a href={employeeData.linkedin} target="_blank" className="social-link text-yellow-500  text-2xl md:text-3xl lg:text-4xl cursor-pointer">
          <TbBrandLinkedin  />
        </a>
        <a href={employeeData.facebook} target="_blank" className="social-link text-yellow-500  text-2xl md:text-3xl lg:text-4xl cursor-pointer">
          <RiFacebookCircleLine />
        </a>
      </div>
    </>
  );
};

export default EmpDetails;