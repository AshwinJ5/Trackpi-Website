// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io5";
// import { SlSocialYoutube } from "react-icons/sl";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
// import { IoMdClose } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { FaXTwitter } from "react-icons/fa6";
import "../../CSS/personnel.css";
import { Link } from "react-router-dom";

function Personel({ show, onHide, employee }) {
    const [profileImage, setProfileImage] = useState(null);
    useEffect(() => {
        if (employee && employee.image) {
            const imageUrl = `${import.meta.env.VITE_SERVER_URL}${employee.image}`; 
            setProfileImage(imageUrl); 
        }
    }, [employee]);
    const [socialMediaLink, setSocialMediaLink] = useState({
        instagram: "",
        facebook: "",
        likedin: "",
        twitter: "",
    });
    useEffect(() => {
        const newLinks = { ...socialMediaLink };

        for (let i = 1; i <= 4; i++) {
            const socialMediaKey = employee[`socialmedia${i}`];
            const platformKey = employee[`platform${i}`];

            if (socialMediaKey && platformKey) {
                newLinks[socialMediaKey] = platformKey;
            }
        }

        setSocialMediaLink(newLinks);
    }, [employee]);

    return (
        <Modal show={show} onHide={onHide} centered size="md">
            <Modal.Header className="modhead backcolor px-1 py-1 text-center text-black">
                <Modal.Title className="personnelfirst">
                    <h2 className=" !mt-4 sm:mt-2 lg:mt-4  text-[30px] mb-0">{employee.name}</h2>
                    <p className=" text-[20px]  lg:mb-0  font-normal desig">{employee.desig}</p>
                    <button
                        onClick={onHide}
                        className="buttcross"
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            border: "none",
                            borderRadius: "50%",
                            color: "black",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            fontSize: "30px",
                        }}
                    >
                        &times;
                    </button>
                </Modal.Title>
                {profileImage && (
                    <img
                        src={profileImage}
                        alt={employee.title || "Employee"}
                        className="rounded-xl w-54 h-52 personnelimg object-cover"
                    />
                )}
            </Modal.Header>
            <Modal.Body className="modbod px-2  py-4 flex gap-50  ">
                <div className="modb">
                    <div className="p-4 max-w-lg mx-auto mt-8 sm:mt-16 lg:mt-20">
                        <p className="text-gray-700 text-justify">
                            <span className="font-bold underline decoration-gray-300">SELF INTRODUCTION</span>{" "}
                            {employee.selfIntroduction}
                        </p>
                    </div>
                    <div className=" flex justify-evenly gap-20 md:mt-6 px-10">
                        {socialMediaLink.facebook && (
                            <Link target="_blank" to={`${socialMediaLink.facebook}`}>
                                <RiFacebookCircleLine size={35} className="text-yellow-500 cursor-pointer" />
                            </Link>
                        )}
                        {socialMediaLink.instagram && (
                            <Link target="_blank" to={`${socialMediaLink.instagram}`}>
                                <IoLogoInstagram size={35} className="text-yellow-500 cursor-pointer" />
                            </Link>
                        )}
                        {socialMediaLink.likedin && (
                            <Link target="_blank" to={`${socialMediaLink.likedin}`}>
                                <TbBrandLinkedin size={35} className="text-yellow-500 cursor-pointer" />
                            </Link>
                        )}
                        {socialMediaLink.twitter && (
                            <Link target="_blank" to={`${socialMediaLink.twitter}`}>
                                <FaXTwitter size={35} className="text-yellow-500 cursor-pointer" />
                            </Link>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Personel;
