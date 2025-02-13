import React, { useState, useEffect } from "react";

import TableIntern from "../../components/Admin/TableIntern";
import TableSales from "../../components/Admin/TableSales";
import TableEmployee from "../../components/Admin/TableEmployee";
import { useNavigate, useLocation } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import baseURL from "../../Api Services/baseURL";
const EmployeeManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get("tab") || "Employee";

    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        navigate(`?tab=${tabName}`);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabFromUrl = queryParams.get("tab");
        if (tabFromUrl) {
            setActiveTab(tabFromUrl);
        }
    }, [location.search]);
    const renderHeading = () => {
        switch (activeTab) {
            case "Employee":
                return "Employee Management";
            case "Sales":
                return "Sales Management";
            case "Intern":
                return "Intern Management";
            default:
                return "Management";
        }
    };

    const handleAdd = () => {
        switch (activeTab) {
            case "Employee":
                navigate("/admin/employeeManagement-addEmployee/");
                break;
            case "Sales":
                navigate("/admin/salesManagement-add/");
                break;
            case "Intern":
                navigate("/admin/intern-management-add/");
                break;
            default:
                break;
        }
    };
    const handleExportCSV = async () => {
        try {
            let category;
            let filename;

            switch (activeTab) {
                case "Employee":
                    category = "employee";
                    filename = "employee-data.csv";
                    break;
                case "Sales":
                    category = "sales";
                    filename = "sales-data.csv";
                    break;
                case "Intern":
                    category = "intern";
                    filename = "intern-data.csv";
                    break;
                default:
                    return;
            }

            const response = await baseURL.get(`/export/csv-data?type=employee&category=${category}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting CSV:", error);
        }
    };
    return (
        <div className="w-full bg-white">
            <div className="pt-5 flex justify-center gap-[5rem] py-1 mb-6">
                <button
                    className={`px-5 py-2.5  rounded-[10px] w-[200px] h-[46px] ${
                        activeTab === "Employee" ? "bg-[#FF9D00] text-white" : "text-[#FF9D00] btnBorder"
                    }`}
                    onClick={() => handleTabChange("Employee")}
                >
                    Employee
                </button>
                <button
                    className={`px-5 py-2.5 rounded-[10px] w-[200px] h-[46px] ${
                        activeTab === "Sales" ? "bg-[#FF9D00] text-white" : "text-[#FF9D00] btnBorder"
                    }`}
                    onClick={() => handleTabChange("Sales")}
                >
                    Sales
                </button>
                <button
                    className={`px-5 py-2.5 rounded-[10px] w-[200px] h-[46px] ${
                        activeTab === "Intern" ? "bg-[#FF9D00] text-white" : "text-[#FF9D00] btnBorder"
                    }`}
                    onClick={() => handleTabChange("Intern")}
                >
                    Intern
                </button>
            </div>

            <div className="px-8 flex  items-center justify-between mt-8">
                <h2 className="  font-bold  text-[22px]">{renderHeading()}</h2>

                <div className="flex gap-2">
                    <div className="px-4 py-2 rounded-[10px] bg-[#FF9D00] text-white flex items-center gap-3 cursor-pointer">
                        <FiUpload color="white" className="font-bold" size={20} onClick={handleExportCSV} /> |{" "}
                        <FiDownload color="white" size={20} />
                    </div>
                    <div
                        onClick={handleAdd}
                        className="px-4 py-2  rounded-[10px] bg-[#FF9D00] text-white flex items-center gap-2 cursor-pointer"
                    >
                        <MdAdd color="white" />
                        {activeTab === "Employee" && "Add Employee"}
                        {activeTab === "Sales" && "Add Sales"}
                        {activeTab === "Intern" && "Add Intern"}
                    </div>
                </div>
            </div>
            <div className="p-4">
                {activeTab === "Employee" && <TableEmployee />}
                {activeTab === "Sales" && <TableSales />}
                {activeTab === "Intern" && <TableIntern />}
            </div>
        </div>
    );
};

export default EmployeeManagement;
