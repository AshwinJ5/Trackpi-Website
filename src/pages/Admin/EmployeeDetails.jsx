import React, { useState } from "react";
import "./EmployeeDetails.css";
import UploadProfile from "../../components/UploadProfile";

const EmployeeDetails = () => {
    const [userName, setUserName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [socialLinks, setSocialLinks] = useState([
        { platform: "", url: "" },
        { platform: "", url: "" },
        { platform: "", url: "" },
        { platform: "", url: "" },
    ]);

    const handleSocialChange = (index, field, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index][field] = value;
        setSocialLinks(updatedLinks);
    };

    const handleSave = () => {
        alert("Details saved successfully!");
    };

    const handleCancel = () => {
        setUserName("");
        setEmployeeId("");
        setEmail("");
        setDescription("");
        setSocialLinks([
            { platform: "", url: "" },
            { platform: "", url: "" },
            { platform: "", url: "" },
            { platform: "", url: "" },
        ]);
    };

    return (
        <div className=" min-h-screen flex items-center justify-center bg-gray-100">
            <div className="main bg-white p-8 rounded-lg shadow-md h-[700px] w-[1100px]">
                <h2 className="text-2xl font-semibold mb-6 text-left">Employee Details</h2>
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex gap-8 mb-6">
                        <div className="flex flex-col items-center">
                            <UploadProfile />
                        </div>
                    </div>

                    <div className="user flex flex-wrap gap-6 mb-6">
                        <div className="flex-grow">
                            <label className="block text-sm font-medium mb-2">User Name</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Username"
                                className="w-half p-1 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex-grow">
                            <label className="block text-sm font-medium mb-2">Employee ID</label>
                            <input
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                placeholder="Employee ID"
                                className="w-half p-1 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex-grow">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-half p-1 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="srow grid grid-cols-[1fr_auto_1fr] gap-8 items-start mb-6">
                    <div>
                        <label className="block text-lg font-medium mb-4">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={10}
                            placeholder="Enter here"
                            className="desc w-full h-full "
                        ></textarea>
                    </div>
                    <div className="vertical-line"></div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">Social Media</h3>
                        {socialLinks.map((link, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label htmlFor={`platform-box-${index}`} className="block text-sm font-medium mb-2">
                                        Select Platform {index + 1}
                                    </label>
                                    <div
                                        id={`platform-box-${index}`}
                                        className="ins p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                                    >
                                        Instagram
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor={`url-input-${index}`} className="block text-sm font-medium mb-2">
                                        Platform {index + 1} Link
                                    </label>
                                    <input
                                        id={`url-input-${index}`}
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                        placeholder="URL Link"
                                        className="plat p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center space-x-8">
                    <button
                        onClick={handleSave}
                        className="cancel text-white py-2 px-14 rounded-md font-semibold hover:bg-yellow-800"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="cancel text-white py-2 px-14 rounded-md font-semibold hover:bg-yellow-800"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
