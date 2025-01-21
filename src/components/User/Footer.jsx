import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/footer.css";
import fbIcon from "../../images/fb.svg";
import quoraIcon from "../../images/quora.svg";
import youtubeIcon from "../../images/yout.svg";
import linkedinIcon from "../../images/linkedin.svg";
import bloggerIcon from "../../images/blogger.svg";
import mediumIcon from "../../images/medium.svg";
import instagramIcon from "../../images/insta.svg";
import phoneIcon from "../../images/phone.svg";
import mailIcon from "../../images/mail.svg";
import FooterSecondary from "./FooterSecondary";

function Footer() {
    const currentYear = new Date().getFullYear();

    const navigate = useNavigate();

    const handleNavigation = (path, hash) => {
        navigate(path);
        setTimeout(() => {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <div>
            <FooterSecondary />
            <footer className="px-[15px] lg:px-20 xl:px-24 2xl:px-32 py-[15px] text-dark pt-2 mx-auto lg:pt-[50px] ">
                <div className="col my-auto h-max w-full">
                    <div className=" flex flex-wrap  justify-between items-center gap-[30px]">
                        <div className="row justify-center xl:w-max md:w-1/2 w-full flex gap-[25px] sm:gap-[32px] md:gap-[38px] lg:gap-[42px] xl:gap-[50px] footerFirstDiv ">
                            <div className=" xl:!max-w-[423px] grid gap-[25px]">
                                <div className="">
                                    <img
                                        src="src/images/trackpi_logo.png"
                                        alt="TrackPi Logo"
                                        className="img-fluid mx-auto w-[195px] sm:w-[215px] md:w-[235px] lg:w-[252px] xl:w-[270px] 2xl:w-[290px]"
                                    />
                                    <p className="text-[12px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] xl:text-[18px] 2xl:text-[20px] text-justify font-medium footerParagraph">
                                        Empowering businesses to succeed through
                                        <a
                                            href="/business-consulting-services"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#FF9D00',
                                                fontWeight: 'bold',
                                                textDecoration:'none'
                                              }}
                                        >
                                            {" "}
                                            expert guidance
                                        </a>
                                        &nbsp; and personalized solutions. Unlocking potential and achieving success.
                                    </p>
                                </div>
                                <div className="grid gap-[15px] sm:gap-[18px] md:gap-[20px] lg:22px] xl:gap-[25px] follow_us_footer">
                                    <h5 className=" font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] ">
                                        Follow Us
                                    </h5>
                                    <div className="flex my-auto gap-[25px] flex-row footer_smedia">
                                        <Link onClick={() => window.open('https://www.facebook.com/profile.php?id=61565947096778', '_blank')}>
                                            <img src={fbIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://www.youtube.com/@trackpi', '_blank')}>
                                            <img src={youtubeIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://www.instagram.com/trackpi_official?igsh=YmwyaHpzYXBueWJz', '_blank')}>
                                            <img src={instagramIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://medium.com/@trackpi', '_blank')}>
                                            <img src={mediumIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://www.linkedin.com/company/trackpi-private-limited/?viewAsMember=true', '_blank')}>
                                            <img src={linkedinIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://www.quora.com/profile/Trackpi-Private-Limited', '_blank')}>
                                            <img src={quoraIcon} alt="" />
                                        </Link>
                                        <Link onClick={() => window.open('https://trackpi.blogspot.com/', '_blank')}>
                                            <img src={bloggerIcon} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-max mb-0 grid gap-[10px] sm:gap-[12px] md:gap-[15px] lg:gap-[18px] xl:gap-[20px]">
                            <h5 className=" font-bold  text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] mb-0">
                                Resources
                            </h5>
                            <ul className="list-unstyled font-medium  text-[12px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] xl:text-[18px] 2xl:text-[20px] grid gap-[14px] mb-0">
                                <li>
                                    <Link to="/about-trackpi" className="text-dark text-decoration-none">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://trackpi.blogspot.com/" target="_blank" className="text-dark text-decoration-none ">
                                        Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://trackpi.org/" target="_blank"  className="text-dark text-decoration-none ">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className="text-dark text-decoration-none">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/termsconditions" className="text-dark text-decoration-none">
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="sm:w-max w-[140px]  mb-0 grid gap-[10px] sm:gap-[12px] md:gap-[15px] lg:gap-[18px] xl:gap-[20px] ">
                            <h5 className=" font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px]  mb-0 text-left">
                                Services
                            </h5>
                            <ul className="list-unstyled font-medium text-[12px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] xl:text-[18px] 2xl:text-[20px] grid gap-y-[14px] gap-x-[30px]   mb-0  ">
                                <li>
                                    <a
                                        onClick={() => handleNavigation("/business-consulting-services", "#sales-outsourcing")}
                                        className="text-dark text-decoration-none cursor-pointer"
                                    >
                                        Sales Outsourcing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => handleNavigation("/business-consulting-services", "#market-positioning")}
                                        className="text-dark text-decoration-none cursor-pointer"
                                    >
                                        Market Positioning & Branding
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => handleNavigation("/business-consulting-services", "#sales-training")}
                                        className="text-dark text-decoration-none cursor-pointer"
                                    >
                                        Sales Training Strategies
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => handleNavigation("/business-consulting-services", "#operations-training")}
                                        className="text-dark text-decoration-none cursor-pointer"
                                    >
                                        Operations Training & Strategies
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => handleNavigation("/business-consulting-services", "#financial-consulting")}
                                        href="#"
                                        className="text-dark text-decoration-none cursor-pointer"
                                    >
                                        Financial Consulting
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-[full]  xl:w-max sm:mt-0 mt-[25px] join_us_div">
                            <div className="xl:grid  lg:gap-[50px] flex sm:justify-around justify-between  joinInput ">
                                <div className="grid gap-2 sm:w-max w-1/2">
                                    <h5 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px]">
                                        Join With Us
                                    </h5>
                                    <div>
                                        <div className="sm:flex hidden rounded-lg shadow-sm sm:w-[250px] w-[180px] footerForm footerInput1 ">
                                            <input
                                                placeholder="Your Email Address"
                                                type="text"
                                                style={{ border: "1px solid #FFC100 ", outline: "none" }}
                                                className="px-2 block w-full border-[#FFC100] shadow-sm rounded-s-lg text-[10px] md:text-[12px] lg:text-[14px]"
                                            />
                                            <button
                                                type="button"
                                                className="text-white gradient-button hover:scale-105  duration-300 px-[10px] py-[10px] text-[10px] md:text-[12px] lg:text-[14px] !font-normal "
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <div className="sm:hidden block rounded-lg   footerForm footerInput2 ">
                                            <div>
                                                <input
                                                    placeholder="Your Email Address"
                                                    type="text"
                                                    style={{ border: "1px solid #FFC100 ", outline: "none" }}
                                                    className=" px-2 block w-full border-[#FFC100] shadow-sm rounded-s-lg text-[10px] md:text-[12px] lg:text-[14px]"
                                                />
                                            </div>
                                            <div className="text-center mt-2">
                                                <button
                                                    type="button"
                                                    className="text-white gradient-button hover:scale-105  duration-300 px-[10px] py-[10px] text-[10px] md:text-[12px] lg:text-[14px] !font-normal "
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-2 sm:w-max w-[140px] text-[12px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] xl:text-[18px] 2xl:text-[20px]">
                                    <h5 className=" font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px]">
                                        Contact
                                    </h5>
                                    <div className="d-flex footer_smedia">
                                        <img src={phoneIcon} alt="" />
                                        <span className="ms-3 font-medium">+91 80781 79646</span>
                                    </div>
                                    <div className="d-flex">
                                        <img src={mailIcon} alt="" />
                                        <a href="mailto:operations@trackpi.in" target="_blank" className="text-decoration-none ms-3 font-medium text-[#0A0A0A]">operations@trackpi.in</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <hr className="mb-0 " />
            <Row className=" ">
                <Col className="text-center font-medium text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] !my-[5px] !sm:my-[7px] !md:my-[10px] !lg:my-[12px] !xl:my-[15px]">
                    © {currentYear} TrackPi Private Limited. All rights reserved.
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
