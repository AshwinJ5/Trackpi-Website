import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../CSS/popup.css";
import fbIcon from "../../images/fb2.svg";
import quoraIcon from "../../images/quora2.svg";
import youtubeIcon from "../../images/yout2.svg";
import linkedinIcon from "../../images/linkedin2.svg";
import bloggerIcon from "../../images/blogger2.svg";
import mediumIcon from "../../images/medium2.svg";
import instagramIcon from "../../images/insta2.svg";
import closeImg from "../../images/closePopup.svg";
import dropdownImg from "../../images/dropdownImg.svg";
import { Link } from "react-router-dom";

function PopUp() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
      { value: 'socialMedia', label: 'Social Media' },
      { value: 'searchEngine', label: 'Search Engine' },
      { value: 'friendFamily', label: 'Friend or Family' },
      { value: 'advertisement', label: 'Advertisement' },
      { value: 'other', label: 'Other' }
    ];
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close dropdown after selecting
      };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 30000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Modal backdrop='static' dialogClassName="custom-modal " show={show} onHide={handleClose} size="lg" centered>
                <div className="grid gap-[20px] sm:gap-[21px] md:gap-[22px] lg:gap-[23px] xl:gap-[25px] p-[15px]  sm:p-[15px] md:p-[20px]  lg:p-[25px] xl:p-[30px]">
                    <div className="flex justify-between ">
                        <div className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] xl:h-[40px]"></div>
                        <div className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[34px] font-bold text-[#FF9D00]">Connect With Us</div>
                        <div className="cursor-pointer" onClick={handleClose}>
                            <img className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] xl:h-[40px] " src={closeImg} alt="" />
                        </div>
                    </div>
                    <div className="popupForm sm:px-[15px] md:px-[20px]  lg:px-[25px] xl:px-[30px]">
                        <form className=" grid gap-[10px] sm:gap-[11px] md:gap-[12px] lg:gap-[14px] xl:gap-[15px]">
                            <input className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]" required type="text" placeholder="Name" />
                            <input className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]   h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]" required type="email" placeholder="Email" />
                            <input className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]   h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]" required type="number" placeholder="Contact Number" />
                            <input className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]" required type="text" placeholder="Where are you located?" />

      <div className="relative selectForPopup text-center  ">
        {/* Button to toggle dropdown */}
        <button type="button"
          className="w-full text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[16px] md:py-[14px] lg:px-[18px] lg:py-[16px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left mx-auto flex justify-between items-center  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
          onClick={toggleDropdown}>
            <div className={selectedOption? " text-black "  :"selectFormPlaceholder"}>{selectedOption || 'How Did You Hear About Us?'}</div>
          {selectedOption?null:<img className="h-[10px] sm:h-[12px] md:h-[14px] lg:h-[16px] xl:h-[18px]" src={dropdownImg} alt="" />}
        </button>

        {/* Dropdown menu with <ul> */}
        {isOpen && (
          <ul className=" w-[90%]  absolute left-[5%]  mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <li 
                key={option.value} 
                className="flex items-center w-100 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  relative   mx-auto hover:bg-[#FF9D00] hover:text-black hover:rounded-lg text-left cursor-pointer dropdownList list-none  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                onClick={() => handleOptionClick(option.label)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
                          <textarea className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[16px] md:py-[14px] lg:px-[18px] lg:py-[16px] h-[60] sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px]" required name="" placeholder="Message"></textarea>
                            <div className="max-w-[244px] mx-auto">
                                <button className="bg-gradient-to-r from-[#FFC100] to-[#FF9D00] font-bold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-white rounded-lg px-[15px] md:px-[30px] lg:px-[45px] xl:px-[60px]  
          py-[8px] md:py-[9px] lg:py-[10px]    font-bold ">
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center mx-auto text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px]">
                        Or email <a href="mailto:operations@trackpi.in" target="_blank" className="text-[#FF9D00] font-bold text-decoration-none">operations@trackpi.in</a> to get in touch with
                        our team.
                    </div>
                    <div className="w-full   mx-auto">
                        <div className="flex justify-around  flex-row popupIcons">
                            <Link target="_blank" to={"https://www.facebook.com/profile.php?id=61565947096778"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={fbIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://www.youtube.com/@trackpi"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={youtubeIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://www.instagram.com/trackpi_official?igsh=YmwyaHpzYXBueWJz"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={instagramIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://medium.com/@trackpi"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={mediumIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://www.linkedin.com/company/trackpi-private-limited/?viewAsMember=true"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={linkedinIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://www.quora.com/profile/Trackpi-Private-Limited"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={quoraIcon} alt="" />
                            </Link>
                            <Link target="_blank" to={"https://trackpi.blogspot.com/"}>
                                <img className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[40px]" src={bloggerIcon} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PopUp;