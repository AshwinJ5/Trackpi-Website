import "../../CSS/employeeinternship.css";
import { FaRegEdit } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import EmpDetails from "../../components/User/EmpDetails";
import { Puff } from "react-loader-spinner";

const InternManagementDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const employeeData = location.state.rowDatas || {};

    const handleEdit = () => {
        const internId = employeeData._id || employeeData.id;

        if (internId) {
            navigate(`/admin/intern-management-add/${internId}`, { state: { employeeData: location.state.rowDatas } });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!employeeData) {
        return (
            <div className="flex justify-center items-center ">
                <Puff visible={true} height={80} width={80} color="#FF9D00" ariaLabel="puff-loading" />
            </div>
        );
    }
    return (
        <div>
            <div className="bg-white w-full py-4 px-6 mx-auto flex justify-end items-end gap-3">
                <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center"
                >
                    <FaRegEdit /> &nbsp; Edit
                </button>
                <button
                    onClick={handleBack}
                    className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center"
                >
                    <IoMdArrowBack /> &nbsp; Back
                </button>
            </div>

            <div className="bg-white w-full py-2 px-14 lg:px-16 xl:px-18 2xl:px-18 mx-auto">
                <EmpDetails employeeData={employeeData} />

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 sm:text-lg md:text-xl xl:text-xl xl:leading-7 2xl:leading-7 2xl:text-2xl md:mt-4 2xl:mt-8">
                    <div>
                        <h5 className="connect-text-Color font-medium">Feedback</h5>
                        <br />
                        <ul className="feed list-disc text-justify text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] xl:leading-6 2xl:leading-9 2xl:text-xl leading-7 font-medium space-y-2">
                            {employeeData.feedback ? (
                                employeeData.feedback.split("\n").map((point, index) => (
                                    <li key={index} className="text-base">
                                        {point}
                                    </li>
                                ))
                            ) : (
                                <li>No feedback available for this employee.</li>
                            )}
                        </ul>
                    </div>
                    <div className="relative flex flex-col justify-center items-center">
                        <div
                            className="custom-height3 w-[326px] md:w-full h-[138px] md:h-[310px] xl:h-[320px] flex justify-center items-center rounded-t-md"
                            style={{ backgroundColor: "#2A2A2A" }}
                        >
                            {employeeData.Certificate ? (
                                <>
                                    <img
                                        src={`${import.meta.env.VITE_SERVER_URL}${employeeData.Certificate}#toolbar=0`}
                                        title="Internship Certificate"
                                        className="w-full h-full rounded-lg"
                                        style={{
                                            border: "none",
                                            overflow: "auto",
                                            objectFit: "cover",
                                        }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            alert("Right-click is disabled.");
                                        }}
                                    />

                                    <div
                                        className="absolute top-0 left-0 w-full h-full"
                                        style={{
                                            backgroundColor: "transparent",
                                            pointerEvents: "auto",
                                        }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            alert("Right-click is disabled.");
                                        }}
                                    ></div>

                                    <div
                                        className="absolute text-gray-500 opacity-30 text-[14px] sm:text-[19px] md:text-[21px] lg:text-[24px] font-bold"
                                        style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%) rotate(-45deg)",
                                            whiteSpace: "nowrap",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {employeeData.name} | {new Date().toLocaleString()}
                                    </div>
                                </>
                            ) : (
                                <div className="text-white text-center">Internship Certificate</div>
                            )}
                        </div>
                        <div className="w-[326px] md:w-full h-[22px] md:h-[29px] xl:h-[39px] bg-yellow-400 flex items-center justify-start rounded-b-md">
                            <p className="text-white px-4 mt-3 text-sm sm:text-lg md:text-xl xl:text-xl xl:leading-7 2xl:leading-10 2xl:text-xl">
                                {employeeData.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternManagementDetail;
