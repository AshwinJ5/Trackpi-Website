import "../../CSS/teamListMember.css";
import React, { useEffect, useState } from "react";

function MemberCard({ employee, onCardClick }) {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (employee && employee.image) {
            const imageUrl = `${import.meta.env.VITE_SERVER_URL}${employee.image}`;
            setProfileImage(imageUrl);
        }
    }, [employee]);
    return (
        <div
            className="me-[10px] sm:me-0
        bg-white shadow-sm transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={onCardClick}
        >
            <div className="relative overflow-hidden">
                {profileImage && (
                    <img
                        src={profileImage}
                        alt={employee.title || "Employee"}
                        className="w-full h-auto transition-transform duration-500 ease-in-out transform hover:scale-110"
                    />
                )}
            </div>
            <div className="p-2 md:p-6">
                <span className="text-[16px] sm:text-lg font-bold text-gray-800 hover:text-gray-600 cursor-pointer block md:mb-2">
                    {employee.name}
                </span>
                <p className="text-[10px] sm:text-sm   text-gray-500 mb-1">{employee.desig}</p>
            </div>
        </div>
    );
}

export default MemberCard;
