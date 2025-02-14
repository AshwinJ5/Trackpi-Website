import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../CSS/popup.css";



import { Link } from "react-router-dom";
import baseURL from "../../Api Services/baseURL";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ConnectUsPopup from "./ConnectUsPopup";
import { isValidNumber } from "libphonenumber-js";

function PopUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [newDatas, setNewDatas] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    info_from: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("IN");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "socialMedia", label: "Social Media" },
    { value: "searchEngine", label: "Search Engine" },
    { value: "friendFamily", label: "Friend or Family" },
    { value: "advertisement", label: "Advertisement" },
    { value: "other", label: "Other" },
  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (value, country) => {
    if (!value) {
      setNewDatas({ ...newDatas, phone: "" });
      return;
    }
    const formattedPhone = `+${country.dialCode} ${value.slice(
      country.dialCode.length
    )}`;
    setNewDatas({ ...newDatas, phone: formattedPhone });
    setCountryCode(country.countryCode.toUpperCase());
    setPhone(`${country.dialCode}${value.slice(country.dialCode.length)}`);
  };

  const addNewForm = async (e) => {
    e.preventDefault();
    if (
      !newDatas.fullName ||
      !newDatas.info_from ||
      !newDatas.message ||
      !newDatas.email ||
      !newDatas.location
    ) {
      toast.info("All fields required");
      return;
    }
    if (!isValidNumber(`+${phone}`, countryCode)) {
      toast.error("Please enter a valid phone number!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("fullName", newDatas.fullName);
      formData.append("phone", newDatas.phone);
      formData.append("email", newDatas.email);
      formData.append("location", newDatas.location);
      formData.append("info_from", newDatas.info_from);
      formData.append("message", newDatas.message);

      const response = await baseURL.post("/contactForm/formSubmit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setIsModalOpen(true);
        setNewDatas({
          fullName: "",
          phone: "91",
          email: "",
          location: "",
          info_from: "",
          message: "",
        });
        setPhone("");
        setSelectedOption("");
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding news:", error);

      if (error.name === "ValidationError") {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        toast.error(`Validation Error: ${errorMessages.join(", ")}`);
      } else if (error.response) {
        if (error.response.data) {
          const errorMessage = error.response.data.error || "An error occurred";
          toast.error(`${errorMessage}`);
        } else {
          toast.error("Server responded with an error.");
        }
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Modal
        backdrop="static"
        dialogClassName="custom-modal "
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <div className="grid gap-[20px] sm:gap-[21px] md:gap-[22px] lg:gap-[23px] xl:gap-[25px] p-[15px]  sm:p-[15px] md:p-[20px]  lg:p-[25px] xl:p-[30px]">
          <div className="flex justify-between ">
            <div className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] xl:h-[40px]"></div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#FF9D00]">
              Connect With Us
            </div>
            <div className="cursor-pointer" onClick={handleClose}>
              <img
                className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] xl:h-[40px] "
                src="/assets/svg/closePopup.svg"
                alt=""
              />
            </div>
          </div>
          <div className="popupForm sm:px-[15px] md:px-[20px]  lg:px-[25px] xl:px-[30px]">
            <form
              onSubmit={addNewForm}
              className=" grid gap-[10px] sm:gap-[11px] md:gap-[12px] lg:gap-[14px] xl:gap-[15px]"
            >
              <input
                className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                value={newDatas.fullName}
                onChange={(e) =>
                  setNewDatas({ ...newDatas, fullName: e.target.value })
                }
                type="text"
                placeholder="Name"
              />
              <input
                className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]   h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                value={newDatas.email}
                onChange={(e) =>
                  setNewDatas({ ...newDatas, email: e.target.value })
                }
                type="text"
                placeholder="Email"
              />
              <div className="w-full popupPhoneInput">
                <PhoneInput
                  value={newDatas.phone}
                  country={"in"}
                  enableSearch={true}
                  onChange={(value, country) =>
                    handlePhoneChange(value, country)
                  }
                />
              </div>
              <input
                className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                value={newDatas.location}
                onChange={(e) =>
                  setNewDatas({ ...newDatas, location: e.target.value })
                }
                type="text"
                placeholder="Where are you located?"
              />

              <div className="relative selectForPopup text-center  ">
                <button
                  type="button"
                  className="w-full text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[16px] md:py-[14px] lg:px-[18px] lg:py-[16px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left mx-auto flex justify-between items-center  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                  onClick={toggleDropdown}
                >
                  <div
                    className={
                      selectedOption ? " text-black " : "selectFormPlaceholder"
                    }
                  >
                    {selectedOption || "How Did You Hear About Us?"}
                  </div>
                  <img
                    className="h-[10px] sm:h-[12px] md:h-[14px] lg:h-[16px] xl:h-[18px]"
                    src="/assets/svg/dropdownImg.svg"
                    alt=""
                  />
                </button>

                {isOpen && (
                  <ul className=" w-[90%]  absolute left-[5%]  mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className="flex items-center w-100 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[14px] md:py-[11px] lg:px-[15px] lg:py-[12px]  relative   mx-auto hover:bg-[#FF9D00] hover:text-black hover:rounded-lg text-left cursor-pointer dropdownList list-none  h-[30px] sm:h-[32px] md:h-[35px] lg:h-[37px] lg:h-[40px]"
                        onClick={() => {
                          handleOptionClick(option.label);
                          setNewDatas({ ...newDatas, info_from: option.label });
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <textarea
                className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-[10px] py-[8px] sm:px-[12px] sm:py-[10px] md:px-[16px] md:py-[14px] lg:px-[18px] lg:py-[16px] h-[60] sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px]"
                value={newDatas.message}
                onChange={(e) =>
                  setNewDatas({ ...newDatas, message: e.target.value })
                }
                name=""
                placeholder="Message"
              ></textarea>
              <div className="max-w-[244px] mx-auto">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FFC100] to-[#FF9D00] font-bold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[16px] text-white rounded-lg px-[15px] md:px-[30px] lg:px-[45px] xl:px-[60px]  
          py-[8px] md:py-[9px] lg:py-[10px]    font-semibold mt-[10px]"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mx-auto text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px]">
            Or email{" "}
            <a
              href="mailto:operations@trackpi.in"
              target="_blank"
              className="text-[#FF9D00] font-bold text-decoration-none"
            >
              operations@trackpi.in
            </a>{" "}
            to get in touch with our team.
          </div>
          <div className="w-full   mx-auto">
            <div className="flex justify-around  flex-row popupIcons">
              <Link
                target="_blank"
                to={"https://www.facebook.com/profile.php?id=61565947096778"}
              >
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/fb2.svg"
                  alt=""
                />
              </Link>
              <Link target="_blank" to={"https://www.youtube.com/@trackpi"}>
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/yout.svg"
                  alt=""
                />
              </Link>
              <Link
                target="_blank"
                to={
                  "https://www.instagram.com/trackpi_official?igsh=YmwyaHpzYXBueWJz"
                }
              >
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/insta2.svg"
                  alt=""
                />
              </Link>
              <Link target="_blank" to={"https://medium.com/@trackpi"}>
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/medium.svg"
                  alt=""
                />
              </Link>
              <Link
                target="_blank"
                to={
                  "https://www.linkedin.com/company/trackpi-private-limited/?viewAsMember=true"
                }
              >
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/linkedin2.svg"
                  alt=""
                />
              </Link>
              <Link
                target="_blank"
                to={"https://www.quora.com/profile/Trackpi-Private-Limited"}
              >
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/quora.svg"
                  alt=""
                />
              </Link>
              <Link target="_blank" to={"https://trackpi.blogspot.com/"}>
                <img
                  className="h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] xl:h-[35px] w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] xl:w-[35px]"
                  src="/assets/svg/blogger2.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {isModalOpen ? (
        <ConnectUsPopup onClose={() => setIsModalOpen(false)} />
      ) : null}
    </div>
  );
}

export default PopUp;
