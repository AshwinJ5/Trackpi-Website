import React, { useState, useEffect } from "react";
import { Verify } from "react-puzzle-captcha";
import "react-puzzle-captcha/dist/react-puzzle-captcha.css";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Brochure from "../../components/User/Brochure";
import "../../CSS/employverification.css";
import baseURL from "../../Api Services/baseURL";
import HeaderBanner from "../../components/User/HeaderBanner";

function EmployeeVerification() {
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [verifyInput, setVerifyInput] = useState("");
    const [employeeData, setEmployeeData] = useState({});
    // console.log(verifyInput);
    // console.log(employeeData);

    const navigate = useNavigate();

    const handleSubmitVerify = async (e) => {
        e.preventDefault();
        if (verifyInput.length === 0) {
            toast.info("Please fill the field");
            return;
        } else if (verifyInput.length !== 11 || !verifyInput.startsWith("TPEID")) {
            toast.error("Please provide the correct format");
            return;
        }
        setModalShow(true);
    };

    // Handle CAPTCHA success
    const handleCaptchaSuccess = async () => {
        setCaptchaVerified(true);
        setModalShow(false);
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await baseURL.get(`/api/employee/employeedetail/${verifyInput}`);

            if (response.status === 200) {
                const employee = response.data;
                setEmployeeData(employee);

                switch (employee.category) {
                    case "intern":
                        navigate("/employeeinternship", { state: { rowDatas: employee } });
                        setVerifyInput("");
                        break;
                    case "sales":
                        navigate("/employeesales", { state: { rowDatas: employee } });
                        setVerifyInput("");
                        break;
                    default:
                        toast.error("No employee data found.");
                        setVerifyInput("");
                }
            } else {
                toast.error("No employee data found.");
                setVerifyInput("");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Employee not found!");
                setVerifyInput("");
            } else {
                console.error("Error fetching employee data:", error.message);
                toast.error("Failed to fetch employee data. Please try again.");
                setVerifyInput("");
            }
        } finally {
            setLoading(false);
        }
    };

    const clients = [
        {
            id: 1,
            name: "Authenticity",
            description: "Verify the authenticity of employee credentials and background details.",
        },
        {
            id: 2,
            name: "Security",
            description: "Protect your organization from unauthorized individuals.",
        },
        {
            id: 3,
            name: "Efficiency",
            description: "Streamline the hiring and employee verification process.",
        },
    ];

    return (
        <div className="employee_reg_page">
            <HeaderBanner
                title="Employee Verification"
                description="Welcome to Trackpi's Employee Verification page. We are committed to maintaining the highest standards of integrity and trust. This page allows you to verify the employment status of our team members, ensuring transparency and reliability in all our business dealings."
                classname="bgFour"
                class123={"headerbannerCenterContentOther"}
            />

            <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[65px] pb-[20px] sm:pb-[30px] md:pb-[40px] lg:pb-[50px] xl:pb-[65px]">
                {/* Verification Form Section */}
                <section className=" mb-14 w-100 ">
                    <div className="lg:w-[75%] sm:w-[80%] w-[89%] bg-white shadow-lg mx-auto p-4 rounded-lg ">
                        <div className="font-bold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[50px] 2xl:text-[60px] text-[#FFC100] text-center">
                            Employee Verification
                        </div>
                        <form onSubmit={handleSubmitVerify}>
                            <div style={{ fontWeight: "600" }} className="mb-4 g-5">
                                <label
                                    className="block my-2 text-[14px] sm:text-[18px] md:text-[21px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] text-dark"
                                    htmlFor="employeeId"
                                >
                                    Employee ID
                                </label>
                                <input
                                    type="text"
                                    id="employeeId"
                                    maxLength={11}
                                    aria-label="Enter Employee ID"
                                    value={verifyInput}
                                    onChange={(e) => {
                                        setVerifyInput(e.target.value);
                                    }}
                                    className=" px-[20px] font-normal  text-[.625rem] rounded-md w-full employInput xl:h-[60px] lg:h-[52px] md:h-[45px] sm:h-[38px] h-[32px]  text-[10px] sm:text-[14px] md:text-[18px] lg:text-[21px] xl:text-[24px]"
                                    placeholder="Enter Employee ID"
                                    style={{ border: ".32px #0A0A0A80 solid", outline: ".32px #0A0A0A80 solid" }}
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    // onClick={handleSubmit}
                                    disabled={loading} // Disable button when loading
                                    className="lg:w-[236px] md:w-[195px] sm:w-[157px] w-[118px]  xl:h-[53px] lg:h-[47px] md:h-[41px] sm:h-[36px] h-[30px] transform hover:scale-105 bg-gradient-to-r from-[#FFC100] to-[#FF9D00]   rounded-md font-semibold text-[12px] sm:text-[15px] md:text-[18px] lg:text-[21px] xl:text-[24px] text-white"
                                >
                                    {loading ? "Verifying..." : "Verify Employee"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                {loading && (
                    <div className="flex justify-center items-center fixed inset-0 bg-opacity-50 bg-yellow-500 z-50">
                        <div className="spinner"></div> {/* Show the loader spinner */}
                    </div>
                )}

                <section className="flex flex-col items-center gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[35px] xl:gap-[50px]  2xl:gap-[60px] w-full h-full">
                    <div className="flex flex-col items-center gap-[10px] sm:gap-[13px] md:gap-[15px] lg:gap-[18px] xl:gap-[20px] 2xl:gap-[25px]">
                        <div className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[50px] 2xl:text-[60px] text-[#FFC100] fw-bolder text-center ">
                            Why Verify Employees?
                        </div>
                        <div
                            style={{ maxWidth: "1126px" }}
                            className="font-normal md:font-semibold text-black text-[12px] sm:text-[15px] md:text-[18px] lg:text-[21px] xl:text-[24px] 2xl:text-[30px] px-3 justify_para"
                        >
                            Ensuring that employee information is accurate helps maintain a trustworthy workplace
                            environment and reduces the risk of fraudulent activities.
                        </div>
                    </div>
                    <div className=" flex flex-wrap gap-2.5 sm:gap-5 lg:gap-10  justify-center lg:justify-between">
                        {clients.map((card) => (
                            <div
                                key={card.id}
                                className=" bg-gradient-to-r from-[#FFD152] via-[#FFC100] to-[#FFD152] sm:w-[calc(50%-20px)] lg:w-[calc(30%)]   text-center rounded md:w-[410px] w-[280px] py-[24px] px-[18px] sm:px-[21px] sm:py-[28px] md:px-[24px] md:py-[32px] lg:px-[27px] lg:py-[36px] xl:px-[30px] xl:py-[40px]  2xl:px-[33px] 2xl:py-[45px] grid lg:gap-[20px] md:gap-[15px] gap-[10px] "
                            >
                                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
                                    {card.name}
                                </h3>
                                <p className="font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] ">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Modal for Captcha  */}
                    <Modal
                        size="sm"
                        aria-labelledby="captcha-modal"
                        centered
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    >
                        <Modal.Header className="text-center">
                            <h5 className="w-100 text-black font-semibold m-0">Are you a robot?</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Verify id="captcha" width={250} height={120} onSuccess={handleCaptchaSuccess} />
                        </Modal.Body>
                    </Modal>
                </section>
            </div>
        </div>
    );
}

export default EmployeeVerification;
