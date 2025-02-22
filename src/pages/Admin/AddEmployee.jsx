import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import baseURL from "../../Api Services/baseURL";

function AddEmployee() {
    const { id } = useParams(); // For editing, we'll get the intern ID from URL params
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab") || "Employee"; // Default to 'Sales' tab if not specified
    const { employeeData } = location.state || { employeeData: {} };
    const [profileImage, setProfileImage] = useState(null);
    const adminToken = localStorage.getItem("adminToken");
    const [refresh, setRefresh] = useState("");
    const [imageError, setImageError] = useState("");
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: employeeData.name || "",

        email: employeeData.email || "",
        desig: employeeData.desig || "",
        selfIntroduction: employeeData.selfIntroduction || "",
        socialmedia1: employeeData.socialmedia1 || "",
        socialmedia2: employeeData.socialmedia2 || "",
        socialmedia3: employeeData.socialmedia3 || "",
        socialmedia4: employeeData.socialmedia4 || "",
        platform1: employeeData.platform1 || "",
        platform2: employeeData.platform2 || "",
        platform3: employeeData.platform3 || "",
        platform4: employeeData.platform4 || "",
        category: "employee",
    });

    const [wordCount, setWordCount] = useState(0);
    useEffect(() => {
        if (id && employeeData) {
            setFormData({
                name: employeeData.name || "",

                email: employeeData.email || "",
                desig: employeeData.desig || "",
                selfIntroduction: employeeData.selfIntroduction || "",
                socialmedia1: employeeData.socialmedia1 || "",
                socialmedia2: employeeData.socialmedia2 || "",
                socialmedia3: employeeData.socialmedia3 || "",
                socialmedia4: employeeData.socialmedia4 || "",
                platform1: employeeData.platform1 || "",
                platform2: employeeData.platform2 || "",
                platform3: employeeData.platform3 || "",
                platform4: employeeData.platform4 || "",
                category: "employee",
            });
        }
    }, [id, employeeData]);
    useEffect(() => {
        if (employeeData && employeeData.image) {
            setProfileImage(`${import.meta.env.VITE_SERVER_URL}${employeeData.image}`);
        }
    }, [employeeData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "selfIntroduction") {
            const wordCount = value.trim().split(/\s+/).length;
            setWordCount(wordCount);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validExtensions = ["image/jpeg", "image/png", "image/gif"];
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
                setProfileImage(file);
            }
        };
    };

    const validateImage = (image) => {
        const validExtensions = ["image/jpeg", "image/png", "image/gif"];
        if (!validExtensions.includes(image.type)) {
            toast.error("Invalid file type. Upload JPEG, PNG, or GIF.");
            return false;
        }

        if (image.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB.");
            return false;
        }

        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
            if (img.width !== 400 || img.height !== 286) {
                toast.error("Image dimensions must be 400x286 pixels.");
                return false;
            }
        };

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const empID = formData.empID;
        if (imageError) {
            toast.error(imageError);
            return;
        }

        const name = formData.name.trim();
        if (name.length < 3 || name.length > 64) {
            toast.error("Name must be between 3 and 64 characters.");
            return;
        }

        const selfIntroduction = formData.selfIntroduction.trim();
        const wordCount = selfIntroduction.split(/\s+/).length;
        const charCount = selfIntroduction.length;

        if (wordCount < 30 || wordCount > 40 || charCount > 540) {
            toast.error("Self-introduction must be between 30 and 40 words, and no more than 540 characters long.");
            return;
        }

        const email = formData.email.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }
        if (!formData.desig.trim()) {
            toast.error("Designation is required");
            return;
        }
        if (!formData.selfIntroduction.trim()) {
            toast.error("Self-introduction is required");
            return;
        }

        if (profileImage instanceof File && !validateImage(profileImage)) {
            return;
        }

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("name", formData.name);
            formDataToSend.append("desig", formData.desig);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("selfIntroduction", formData.selfIntroduction);
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
                formDataToSend.append("image", profileImage);
            }

            if (id) {
                const response = await baseURL.put(`/api/employee/employees/${id}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    toast.success("Employee Details Updated Successfully!");
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
                    toast.success("Employee Details Added Successfully!");

                    navigate(`/admin/employee-management?tab=${tab}`);
                }
            }

            setFormData({
                name: "",
                email: "",
                desig: "",
                selfIntroduction: "",
                socialmedia1: "",
                socialmedia2: "",
                socialmedia3: "",
                socialmedia4: "",
                platform1: "",
                platform2: "",
                platform3: "",
                platform4: "",
                category: "employee",
            });
            setProfileImage(null);
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
            <form className="row g-4" onSubmit={handleSubmit}>
                <div className=" px-5 d-flex align-items-center   mb-3 ">
                    <div className="me-4 pt-10">
                        <h2 className="mb-4 text-[22px]">{id ? "Edit Employee Details" : "Add Employee Details"}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center border border-secondary rounded-2xl"
                            style={{
                                width: "150px",
                                height: "120px",
                                position: "relative",
                            }}
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
                                    onClick={() => fileInputRef.current.click()}
                                    className="btn btn-sm p-0 text-white"
                                    style={{ background: "none", border: "none" }}
                                >
                                    <RiImageAddLine />
                                </button>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <p style={{ color: "red", fontSize: "9px" }}>*Image dimensions must be 400x286 pixels.</p>
                    </div>

                    <div className="mt-5 flex-grow-1 row justify-evenly">
                        <div className="col-md-3">
                            <label className="form-label  font-md  text-[15px]">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control rounded-2xl plac"
                                placeholder="Name"
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
                                        "-2px 2px 4px 0px rgba(10, 10, 10, 0.03),2px 1px 4px 0px rgba(10, 10, 10, 0.01),0px -2px 4px 0px rgba(10, 10, 10, 0.03)";
                                }}
                            />
                        </div>
                        <div className="col-md-3 ">
                            <label className="form-label   font-md  text-[15px]">Email ID</label>
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
                        <div className="col-md-3 ">
                            <label className="form-label   font-md  text-[15px]">Designation</label>
                            <input
                                type="text"
                                name="desig"
                                className="form-control rounded-2xl plac"
                                placeholder="Designation"
                                value={formData.desig || ""}
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

                <div className=" flex justify-evenly">
                    <div className="  w-[507px] h-[324px]  p-8 ">
                        <h4 className="text-[22px]">Description</h4>
                        <textarea
                            type="text"
                            name="selfIntroduction"
                            className="mt-8 form-control  w-[507px] h-[310px] plac"
                            placeholder="Enter here"
                            rows="4"
                            value={formData.selfIntroduction || ""}
                            onChange={handleInputChange}
                            style={{
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
                        ></textarea>
                        <div className="mt-2">
                            <p>
                                Word count: {wordCount} / 40
                                {wordCount < 30 && <span className="text-red-500"> (At least 30 words required)</span>}
                                {wordCount > 40 && <span className="text-red-500"> (Maximum 40 words allowed)</span>}
                            </p>
                        </div>
                    </div>

                    <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
                    <div className="flex flex-col  p-8">
                        <h4 className="mb-4 text-[22px]">Social Media</h4>
                        <div className="flex gap-5">
                            <div className="mb-3">
                                <label className="form-label text-[15px]" htmlFor="socialmedia1">
                                    Select Platform 1
                                </label>
                                <select
                                    id="socialmedia1"
                                    name="socialmedia1"
                                    value={formData.socialmedia1 || ""}
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
                                    value={formData.socialmedia2 || ""}
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
                                    value={formData.socialmedia3 || ""}
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
                                    value={formData.socialmedia4 || ""}
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
                <div className=" flex justify-center gap-4 mt-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
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

export default AddEmployee;
