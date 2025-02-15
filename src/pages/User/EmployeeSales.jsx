import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmpDetails from "../../components/User/EmpDetails";
import "../../CSS/employeeinternship.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";


function EmployeeSales() {
    const location = useLocation();
    const employeeData = location.state?.rowDatas || {};

    const businessCardURL = `${import.meta.env.VITE_SERVER_URL}${employeeData.businessCard}`;

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(employeeData).length === 0) {
            navigate("/employee-verification");
        }
    }, [employeeData, navigate]);

    return (
        <div className="pad mt-20  w-full py-5 md:py-10 md:px-6 lg:px-20 xl:px-24 2xl:px-32 mx-auto ">
            <EmpDetails employeeData={employeeData} />
            <div className="  text-center flex justify-center mt-19 md:mt-19 2xl:mt-8 ">
                <div
                    className="w-[225px] sm:w-[225px] sm:w-[280px] md:w-[350px] lg:w-[4250px] xl:w-[500px]  w-[225px] md:w-[500px]  aspect-[5/3] rounded-lg flex justify-center items-center"
                    style={{ backgroundColor: "#2A2A2A" }}
                >
                    {" "}
                    {employeeData.businessCard ? (
                        <img
                            src={`${import.meta.env.VITE_SERVER_URL}${employeeData.businessCard}`}
                            className="w-full h-full rounded-lg"
                            style={{ border: "none", objectFit: "cover" }}
                            title="Business Card"
                        />
                    ) : (
                        <div
                            className="w-fullrounded-lg d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: "#2A2A2A" }}
                        >
                            <h6 className="text-white text-center container  text-[12px] sm:text-[15px] md:text-[18px] lg:text-[25px] xl:text-[30px]" >Business Card</h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeSales;
