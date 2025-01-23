import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmpDetails from "../../components/User/EmpDetails";
import "../../CSS/employeeinternship.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { SERVER_URL } from "../../Api Services/serverUrl";

function EmployeeSales() {
const location = useLocation();
const employeeData = location.state?.rowDatas || {};

const businessCardURL = `${SERVER_URL}${employeeData.businessCard}`;

  const navigate=useNavigate()

  useEffect(() => {
    if (Object.keys(employeeData).length === 0) {
      console.log("Due to insufficient data, Redirecting...");
      navigate("/employee-verification"); 
    }
  }, [employeeData, navigate]);



  return (
    <div className="pad mt-20  w-full py-5 md:py-10 md:px-6 lg:px-20 xl:px-24 2xl:px-32 mx-auto "  >
       <EmpDetails employeeData={employeeData}/>
           <div className="  text-center flex justify-center mt-19 md:mt-19 2xl:mt-8 ">
                <div
                  className="w-[225px] md:w-[500px] h-[300px] rounded-lg flex justify-center items-center"
                  style={{ backgroundColor: '#2A2A2A' }}
                >    {employeeData.businessCard ? (
                  <img
                    src={`${SERVER_URL}${employeeData.businessCard}`}
                    className="w-full h-full rounded-lg"
                    style={{ border: 'none',objectFit:'cover' }}
                    title="Business Card"
                  />
            ) : (
                  <div
                    className="w-[225px] md:w-[500px] h-[121px] md:h-[300px] rounded-lg d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: '#2A2A2A' }}
                  >
                    <h6 className="text-white text-center container w-50">Business Card</h6>
                  </div>
            )}</div>
              </div>
                

    </div>
  );
}

export default EmployeeSales;
