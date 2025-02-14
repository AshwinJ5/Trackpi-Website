import React, { useState, useRef, useEffect } from "react";
import "../../CSS/addsales.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RiImageAddLine } from "react-icons/ri";

import PhoneInput from "react-phone-input-2";
import baseURL from "../../Api Services/baseURL";
function AddSales() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab") || "Sales";
    const adminToken = localStorage.getItem("adminToken");
    const [refresh, setRefresh] = useState("");
    const { employeeData } = location.state || { employeeData: {} };
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageError, setImageError] = useState("");
    const [businessCardError, setBusinessCardError] = useState("");
    const [formData, setFormData] = useState({
        name: employeeData.name || "",
        empID: employeeData.empID || "",
        email: employeeData.email || "",
        phone: employeeData.phone || "",
        fullAddress: employeeData.fullAddress || "",
        gender: employeeData.gender || "",
        dob: employeeData.dob ? new Date(employeeData.dob).toISOString().substring(0, 10) : "",
        bloodGroup: employeeData.bloodGroup || "A+",
        dateOfJoining: employeeData.dateOfJoining
            ? new Date(employeeData.dateOfJoining).toISOString().substring(0, 10)
            : "",
        jobRole: employeeData.jobRole || "Business Development Executive",
        employeeStatus: employeeData.employeeStatus || "Full time",
        jobLevel: employeeData.jobLevel || "Manager Level",
        socialmedia1: employeeData.socialmedia1 || "Instagram",
        socialmedia2: employeeData.socialmedia2 || "Instagram",
        socialmedia3: employeeData.socialmedia3 || "Instagram",
        socialmedia4: employeeData.socialmedia4 || "Instagram",
        platform1: employeeData.platform1 || "",
        platform2: employeeData.platform2 || "",
        platform3: employeeData.platform3 || "",
        platform4: employeeData.platform4 || "",
        category: "sales",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [businessCard, setBusinessCard] = useState(null);

    const fileInputRef = useRef(null);

    const businessCardInputRef = useRef(null);

    useEffect(() => {
        if (id && employeeData) {
            setFormData({
                name: employeeData.name || "",
                empID: employeeData.empID || "",
                email: employeeData.email || "",
                phone: employeeData.phone || "",
                fullAddress: employeeData.fullAddress || "",
                gender: employeeData.gender || "",
                dob: employeeData.dob ? new Date(employeeData.dob).toISOString().substring(0, 10) : "",
                bloodGroup: employeeData.bloodGroup || "A+",
                dateOfJoining: employeeData.dateOfJoining
                    ? new Date(employeeData.dateOfJoining).toISOString().substring(0, 10)
                    : "",
                jobRole: employeeData.jobRole || "Business Development Executive",
                employeeStatus: employeeData.employeeStatus || "Full time",
                jobLevel: employeeData.jobLevel || "Manager Level",
                socialmedia1: employeeData.socialmedia1 || "Instagram",
                socialmedia2: employeeData.socialmedia2 || "Instagram",
                socialmedia3: employeeData.socialmedia3 || "Instagram",
                socialmedia4: employeeData.socialmedia4 || "Instagram",
                platform1: employeeData.platform1 || "",
                platform2: employeeData.platform2 || "",
                platform3: employeeData.platform3 || "",
                platform4: employeeData.platform4 || "",
                category: "sales",
            });
        }
    }, [id, employeeData]);
    useEffect(() => {
        if (employeeData && employeeData.profileImage) {
            setProfileImage(`${import.meta.env.VITE_SERVER_URL}${employeeData.profileImage}`);
        }
    }, [employeeData]);
    useEffect(() => {
        if (employeeData && employeeData.businessCard) {
            setBusinessCard(`${import.meta.env.VITE_SERVER_URL}${employeeData.businessCard}`);
        }
    }, [employeeData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validExtensions = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
        if (!validExtensions.includes(file.type)) {
            setImageError("Invalid file type. Upload JPEG, PNG, or GIF.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setImageError("File size must be less than 5MB.");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width !== 400 || img.height !== 286) {
                toast.error("Image dimensions must be 400x286 pixels.");
            } else {
                setImageError("");
                setProfileImage(file);
            }
        };
    };

    const handleBusinessCardFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
        if (!validExtensions.includes(file.type)) {
            setBusinessCardError("Invalid file type. Only JPEG, PNG, and JPG are allowed.");
            return;
        }

        if (file.size > 15 * 1024 * 1024) {
            setBusinessCardError("File size must be less than 15MB.");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width !== 500 || img.height !== 300) {
                setBusinessCardError("Business card image must be exactly 500x300 pixels.");
            } else {
                setBusinessCardError("");
                setBusinessCard(file);
                toast.success("Business card uploaded successfully!");
            }
        };
    };

    const handleUpload = () => {
        if (profileImage || businessCard) {
            toast.success("Files prepared for upload.");
        } else {
            toast.error("Please select files to upload.");
        }
    };

    const handleAddSales = async (e) => {
        e.preventDefault();

        const empID = formData.empID;
        if (imageError) {
            toast.error(imageError);
            return;
        }
        const empIDPattern = /^TPEID\d{6}$/;
        if (!empIDPattern.test(empID)) {
            toast.error("Employee ID must start with 'TPEID' followed by 6 digits (e.g., TPEID123456).");
            return;
        }
        const name = formData.name.trim();
        if (name.length < 3 || name.length > 64) {
            toast.error("Name must be between 3 and 64 characters.");
            return;
        }
        if (!formData.phone || formData.phone.length < 10 || formData.phone.length > 15) {
            toast.error("Phone number must include a valid country code and be between 10 and 15 digits long.");
            return;
        }
        const address = formData.fullAddress;
        if (address.length < 6) {
            toast.error("Address must be at least 6 characters long.");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("empID", formData.empID);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("fullAddress", formData.fullAddress);
            formDataToSend.append("gender", formData.gender);
            formDataToSend.append("dob", formData.dob);
            formDataToSend.append("bloodGroup", formData.bloodGroup);
            formDataToSend.append("dateOfJoining", formData.dateOfJoining);
            formDataToSend.append("jobRole", formData.jobRole);
            formDataToSend.append("employeeStatus", formData.employeeStatus);
            formDataToSend.append("jobLevel", formData.jobLevel);
            formDataToSend.append("socialmedia1", formData.socialmedia1);
            formDataToSend.append("socialmedia2", formData.socialmedia2);
            formDataToSend.append("socialmedia3", formData.socialmedia3);
            formDataToSend.append("socialmedia4", formData.socialmedia4);
            formDataToSend.append("platform1", formData.platform1);
            formDataToSend.append("platform2", formData.platform2);
            formDataToSend.append("platform3", formData.platform3);
            formDataToSend.append("platform4", formData.platform4);
            formDataToSend.append("category", formData.category);

            if (profileImage instanceof File) {
                formDataToSend.append("profileImage", profileImage);
            }
            if (businessCard instanceof File) {
                formDataToSend.append("businessCard", businessCard);
            }
            if (id) {
                const response = await baseURL.put(`/api/employee/employees/${id}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    toast.success("Sales Employee Details Updated Successfully!");
                    navigate(`/admin/employee-management?tab=${tab}`);
                }
            } else {
                const response = await baseURL.post("/api/employee/employees", formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    toast.success("Sales Employee Details Added Successfully!");
                    navigate(`/admin/employee-management?tab=${tab}`);
                }
            }

            setFormData({
                name: "",
                empID,
                email: "",
                phone: "",
                fullAddress: "",
                gender: "",
                dob: "",
                bloodGroup: "",
                dateOfJoining: "",
                jobRole: "",
                category: "sales",
                employeeStatus: "",
                jobLevel: "",
                socialmedia1: "",
                socialmedia2: "",
                socialmedia3: "",
                socialmedia4: "",
                platform1: "",
                platform2: "",
                platform3: "",
                platform4: "",
            });
            setProfileImage(null);
            setBusinessCard(null);
            fileInputRef.current.value = "";
        } catch (error) {
            console.error("Error submitting employee data:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="container mx-auto mt-0 my-5 px-5  pb-5 bg-white ">
            <form onSubmit={handleAddSales} className="row g-5">
                <div className=" d-flex justify-center items-center mb-4 ">
                    <div className="me-4 r pt-10">
                        <h2 className="mb-4 text-[22px]">{id ? "Edit Sales Details" : "Add Sales Details"}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center border border-secondary rounded-2xl position-relative"
                            style={{ width: "150px", height: "120px" }}
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
                                    alt="Uploaded"
                                    style={{
                                        width: "150px",
                                        height: "120px",
                                        borderRadius: "12%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <span>No image available</span>
                            )}

                            <div
                                className="position-absolute bottom-2 end-2 bg-warning rounded-circle d-flex justify-content-center align-items-center"
                                style={{ width: "25px", height: "25px" }}
                            >
                                <button
                                    type="button"
                                    className="btn btn-sm p-0  text-white"
                                    onClick={() => fileInputRef.current.click()}
                                    style={{ background: "none", border: "none" }}
                                >
                                    <RiImageAddLine />
                                </button>
                            </div>
                        </div>
                        <input
                            type="file"
                            name="profileImage"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p style={{ color: "red", fontSize: "9px" }}>*Image dimensions must be 400x286 pixels.</p>
                    </div>

                    <div className="mt-5 flex-grow-1 row justify-evenly items-center ">
                        <div className="col-md-3 ">
                            <label className="form-label  font-md  text-[15px]">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="form-control rounded-2xl  plac"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label   font-md text-[15px]">Employee ID</label>
                            <input
                                type="text"
                                name="empID"
                                className="form-control rounded-2xl plac"
                                placeholder="Employee ID"
                                value={formData.empID}
                                onChange={handleInputChange}
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            />
                        </div>
                        <div className="col-md-3 ">
                            <label className="form-label   font-md text-[15px]">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control rounded-2xl plac"
                                placeholder="Email-ID"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between ">
                    <div className=" flex flex-col  p-8 w-[310px]">
                        <h4 className="mb-4 text-[22px]">Personal Information</h4>
                        <div className="mb-3">
                            <label className="form-label text-[15px] font-md text-[15px]" htmlFor="phone">
                                Phone Number
                            </label>
                            <PhoneInput
                                country={"in"}
                                id="phone"
                                name="phone"
                                className="custom-phone-input plac "
                                placeholder="Phone Number"
                                value={formData.phone || ""}
                                onChange={(value) => setFormData({ ...formData, phone: value })}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-[15px]" htmlFor="address">
                                Full Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="fullAddress"
                                className="form-control plac"
                                placeholder="Address"
                                value={formData.fullAddress || ""}
                                onChange={handleInputChange}
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            />
                        </div>
                        <div className="flex gap-5">
                            <div className="mb-3 w-[100px]">
                                <label className="form-label  text-[15px]" htmlFor="gender">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="form-select rounded-lg plac"
                                    value={formData.gender || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-3 w-[170px]">
                                <label className="form-label text-[15px]" htmlFor="dob">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    className="form-control rounded-lg plac"
                                    style={{
                                        fontSize: "12px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    value={formData.dob || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3  w-[100px]">
                            <label className="form-label text-[15px]" htmlFor="bloodgroup">
                                Blood Group
                            </label>
                            <select
                                id="bloodgroup"
                                name="bloodGroup"
                                className="form-select plac"
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>
                    <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
                    <div className="flex flex-col p-8 w-[310px]">
                        <h4 className="mb-4 text-[22px]">Employment Overview</h4>
                        <div className="mb-3">
                            <label className="form-label text-[15px]" htmlFor="doj">
                                Date of Joining
                            </label>
                            <input
                                type="date"
                                id="doj"
                                name="dateOfJoining"
                                className="form-control plac"
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                value={formData.dateOfJoining || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-[15px]" htmlFor="jobrole">
                                Job Role
                            </label>
                            <select
                                id="jobrole"
                                name="jobRole"
                                className="form-select plac"
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                value={formData.jobRole}
                                onChange={handleInputChange}
                            >
                                <option value="Business Development Executive">Business Development Executive</option>
                                <option value="Business Development Manager">Business Development Manager</option>
                                <option value="Area Business Manager">Area Business Manager</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-[15px]" htmlFor="empsatus">
                                Employee Status
                            </label>
                            <select
                                id="empsatus"
                                name="employeeStatus"
                                className="form-select plac"
                                value={formData.employeeStatus}
                                onChange={handleInputChange}
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                            >
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Freelancer">Freelancer (Work from home)</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-[15px]" htmlFor="joblevel">
                                Job Level
                            </label>
                            <select
                                id="joblevel"
                                name="jobLevel"
                                className="form-select plac"
                                style={{
                                    fontSize: "12px",
                                    border: "1px solid whie",
                                    boxShadow:
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white";
                                    e.target.style.boxShadow =
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                }}
                                value={formData.jobLevel}
                                onChange={handleInputChange}
                            >
                                <option value="Manager Level">Manager Level</option>
                                <option value="Executive Level">Executive Level</option>
                            </select>
                        </div>
                    </div>
                    <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
                    <div className="flex  flex-col p-8">
                        <h4 className="mb-4 text-[22px]">Social Media</h4>
                        <div className="flex gap-5">
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Select Platform 1
                                </label>
                                <select
                                    id="socialmedia1"
                                    name="socialmedia1"
                                    value={formData.socialmedia1}
                                    onChange={handleInputChange}
                                    className="form-select rounded-lg plac"
                                    style={{
                                        fontSize: "12px",
                                        width: "140px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="likedin">LinkedIn</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Platform 1 Link
                                </label>
                                <input
                                    type="url"
                                    name="platform1"
                                    id="platform1"
                                    className="form-control rounded-2xl plac"
                                    placeholder="URL Link"
                                    value={formData.platform1 || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        width: "170px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Select Platform 2
                                </label>
                                <select
                                    id="socialmedia2"
                                    name="socialmedia2"
                                    className="form-select rounded-lg plac"
                                    style={{
                                        fontSize: "12px",
                                        width: "140px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onChange={handleInputChange}
                                    value={formData.socialmedia2}
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="likedin">LinkedIn</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="gender">
                                    Platform 2 Link
                                </label>
                                <input
                                    type="url"
                                    name="platform2"
                                    id="platform2"
                                    className="form-control rounded-2xl plac"
                                    placeholder="URL Link"
                                    value={formData.platform2 || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        width: "170px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Select Platform 3
                                </label>
                                <select
                                    id="socialmedia3"
                                    name="socialmedia3"
                                    className="form-select rounded-lg plac"
                                    style={{
                                        fontSize: "12px",
                                        width: "140px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onChange={handleInputChange}
                                    value={formData.socialmedia3}
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="likedin">LinkedIn</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="gender">
                                    Platform 3 Link
                                </label>
                                <input
                                    type="url"
                                    name="platform3"
                                    id="platform3"
                                    className="form-control rounded-2xl plac"
                                    placeholder="URL Link"
                                    value={formData.platform3 || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        width: "170px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Select Platform 4
                                </label>
                                <select
                                    id="socialmedia4"
                                    name="socialmedia4"
                                    className="form-select rounded-lg plac"
                                    value={formData.socialmedia4}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        width: "140px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="likedin">LinkedIn</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="gender">
                                    Platform 4 Link
                                </label>
                                <input
                                    type="url"
                                    name="platform4"
                                    id="platform4"
                                    className="form-control rounded-2xl plac"
                                    placeholder="URL Link"
                                    value={formData.platform4 || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "12px",
                                        width: "170px",
                                        border: "1px solid whie",
                                        boxShadow:
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "white";
                                        e.target.style.boxShadow =
                                            "-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col ">
                    <div className="w-[300px] self-center">
                        <h6 className="mb-3  text-[18px]">Business Card</h6>
                    </div>
                    <div
                        className="border border-secondary self-center rounded p-4 text-center position-relative"
                        style={{
                            width: "300px",
                            height: "150px",
                            overflow: "hidden",
                        }}
                    >
                        {businessCard ? (
                            typeof businessCard === "string" ? (
                                businessCard.endsWith(".jpg") ||
                                businessCard.endsWith(".jpeg") ||
                                businessCard.endsWith(".png") ? (
                                    <img
                                        src={businessCard}
                                        alt="Business Card"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <a
                                        href={businessCard}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-link text-black"
                                    >
                                        View Business Card
                                    </a>
                                )
                            ) : (
                                <div>
                                    <p>{businessCard.name}</p>
                                    <a
                                        href={URL.createObjectURL(businessCard)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-link text-black"
                                    >
                                        View
                                    </a>
                                </div>
                            )
                        ) : (
                            <p>Upload the file</p>
                        )}
                        <button
                            type="button"
                            onClick={() => businessCardInputRef.current.click()}
                            className="btn btn-link"
                            aria-label="Upload Business Card"
                        >
                            <i className="fa-solid fa-arrow-up-from-bracket" style={{ fontSize: "20px", color: "black" }} />
                        </button>
                    </div>
                    <input
                        type="file"
                        ref={businessCardInputRef}
                        style={{ display: "none" }}
                        accept="image/jpeg,image/png,image/jpg"
                        onClick={handleUpload}
                        onChange={handleBusinessCardFileChange}
                    />
                    <p style={{ color: "red", fontSize: "9px", textAlign: "center" }}>
                        *Business card image must be exactly 500x300 pixels.
                    </p>
                </div>

                <div className=" flex justify-center gap-4 mt-4">
                    <button
                        type="submit"
                        className="px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center me-3"
                    >
                        {id ? "Update" : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className=" px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddSales;
