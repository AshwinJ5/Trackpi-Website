import React, { useEffect, useRef, useState } from "react";
import "../../CSS/footer.css";
import { Link } from "react-router-dom";
import baseURL from "../../Api Services/baseURL";


function FooterSecondary() {
    const videoRefs = useRef([]);
    const [footerVideo, setFooterVideo] = useState({});

    const platformURLs = {
        youtube: "https://youtube.com/playlist?list=PLooudDpkO1P_3QSsRvL2ujchiryjLHtB_&si=7C3DQ8aY8gLfK5pa",
        insta: "https://www.instagram.com/trackpi_official?igsh=YmwyaHpzYXBueWJz",
        facebook: "https://www.facebook.com/profile.php?id=61565947096778",
    };

    const getAllFooterDatas = async () => {
        try {
            const response = await baseURL.get("/api/footer/getfooterdetails");
            if (response.data && response.data.length > 0) {
                setFooterVideo(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching footer data:", error);
        }
    };

    useEffect(() => {
        getAllFooterDatas();
    }, []);

    return (
        <>
            <div className="footer-container text-white" style={{ backgroundColor: "#0A0A0A" }}>
                <div className="text-center w-full grid gap-[20px] sm:gap-[22px] md:gap-[25px] lg:gap-[28px] xl:gap-[30px] py-[20px] sm:py-[22px] md:py-[25px] lg:py-[28px] xl:py-[30px]">
                    <div className="grid gap-[10px]">
                        <div className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[40px] xl:text-[60px] 2xl:text-[72px] font-normal">
                            Begin Your Journey With
                            <span style={{ color: "#FFC100" }} className="ms-2">
                                TRACK
                            </span>
                            <span className="text-light">PI</span>
                        </div>
                        <div className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] xl:text-[42px] 2xl:text-[48px] font-normal">
                            we are here to help.
                        </div>
                    </div>

                    <Link to={"/contact-us"}>
                        <button className=" join_footer_btn text-light px-[20px] py-[10px] sm:px-[24px] sm:py-[12px] md:px-[30px] md:py-[15px] lg:px-[35px] lg:py-[12px] xl:px-[40px] xl:py-[15px]  text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[32px] ">
                            Join with us
                        </button>
                    </Link>
                </div>
                <div className="m-0 h-[1px] bg-white w-100"></div>
                <div className="px-6 py lg:px-20 xl:px-24 2xl:px-32">
                    <div className=" text-center font-bold text-[#ffc100] text-[18px] sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] py-[18px] sm:py-[20px] md:py-[30px] lg:py-[40px] xl:py-[50px] 2xl:py-[60px]">
                        {footerVideo.videoheading}
                    </div>

                    <div className="w-100 flex divOneTwo   lg:justify-between justify-around xl:gap-[100px] lg:gap-[70px] md:gap-[55px] sm:gap-[40px] gap-[25px]  ">
                        <div className="  px-0 ">
                            <div className="grid gap-[10px] lg:gap-[30px] md:gap-[20px]">
                                <Link
                                    to={`${footerVideo.videourl1}`}
                                    target="_blank"
                                    className="cursor-pointer  text-decoration-none"
                                >
                                    <video
                                        muted
                                        autoPlay
                                        loop
                                        className=" rounded-[10px] border-[4px] border-[#ffffff] w-auto "
                                        src={`${import.meta.env.VITE_SERVER_URL}${footerVideo.videofile1}`}
                                    ></video>
                                </Link>
                                <div className="text-center">
                                    <Link
                                        target="_blank"
                                        className="text-decoration-none viewMoreFooterVideo pb-[3px] lg:pb-[10px] md:pb-[6px]  sm:pb-[5px] text-[#ffc100] text-[12px] md:text-[18px] sm:text-[14px]  lg:text-[20px] xl:text-[24px]"
                                        to={platformURLs.youtube}
                                    >
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className=" px-0">
                            <div className="grid gap-[10px] lg:gap-[30px] md:gap-[20px]">
                                <Link
                                    target="_blank"
                                    to={`${footerVideo.videourl2}`}
                                    className="cursor-pointer  text-decoration-none"
                                >
                                    <video
                                        muted
                                        autoPlay
                                        loop
                                        className=" rounded-[10px] border-[4px] border-[#ffffff]    w-auto "
                                        src={`${import.meta.env.VITE_SERVER_URL}${footerVideo.videofile2}`}
                                    ></video>
                                </Link>
                                <div className="text-center">
                                    <Link
                                        target="_blank"
                                        className="text-decoration-none viewMoreFooterVideo pb-[3px] lg:pb-[10px] md:pb-[6px]  sm:pb-[5px] text-[#ffc100] text-[12px] md:text-[18px] sm:text-[14px]  lg:text-[20px] xl:text-[24px]"
                                        to={platformURLs.insta}
                                    >
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className=" px-0 ">
                            <div className="grid gap-[10px] lg:gap-[30px] md:gap-[20px]">
                                <Link
                                    target="_blank"
                                    to={`${footerVideo.videourl3}`}
                                    className="cursor-pointer  text-decoration-none"
                                >
                                    <video
                                        muted
                                        autoPlay
                                        loop
                                        className=" rounded-[10px] border-[4px] border-[#ffffff] w-auto "
                                        src={`${import.meta.env.VITE_SERVER_URL}${footerVideo.videofile3}`}
                                    ></video>
                                </Link>
                                <div className="text-center">
                                    <Link
                                        target="_blank"
                                        className="text-decoration-none viewMoreFooterVideo  pb-[3px] lg:pb-[10px] md:pb-[6px]  sm:pb-[5px] text-[#ffc100] text-[12px] md:text-[18px] sm:text-[14px]  lg:text-[20px] xl:text-[24px]"
                                        to={platformURLs.facebook}
                                    >
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" text-center py-[18px] sm:py-[20px] md:py-[30px] lg:py-[40px] xl:py-[50px] 2xl:py-[60px] grid gap-[18px] sm:gap-[20px] md:gap-[30px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px]">
                    <div
                        className="text-[#ffc100] text-[18px] sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold "
                        style={{ fontWeight: "600", color: "#ffc100" }}
                    >
                        {footerVideo.imageheading}
                    </div>
                    <div>
                        <img src={`${import.meta.env.VITE_SERVER_URL}${footerVideo.imagefile}`} className="w-100 " alt="banner" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FooterSecondary;
