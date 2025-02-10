import Form from "react-bootstrap/Form";
import "../../CSS/connect.css";
import { useState } from "react";
import baseURL from "../../Api Services/baseURL";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ConnectUsPopup from "./ConnectUsPopup";
import { useNavigate } from "react-router-dom";
import { isValidNumber } from "libphonenumber-js";

function Details() {
    const [newDatas, setNewDatas] = useState({
        fullName: "",
        phone: "",
        email: "",
        location: "",
        info_from: "",
        message: "",
    });
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState("IN");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [selectClass, setSelectClass] = useState("selectConnect");

    const handleSelectChange = (value) => {
        if (
            value === "Social Media" ||
            value === "Search Engine" ||
            value === "Friend or Family" ||
            value === "Advertisement" ||
            value === "Others"
        ) {
            setSelectClass("selectConnectFont");
        } else {
            setSelectClass("selectConnect");
        }
    };

    const handlePhoneChange = (value, country) => {
        if (!value) {
            setNewDatas({ ...newDatas, phone: "" });
            return;
        }
        const formattedPhone = `+${country.dialCode} ${value.slice(country.dialCode.length)}`;
        setNewDatas({ ...newDatas, phone: formattedPhone });
        setCountryCode(country.countryCode.toUpperCase());
        setPhone(`${country.dialCode}${value.slice(country.dialCode.length)}`);
    };

    const addNewForm = async (e) => {
        e.preventDefault();
        if (!newDatas.fullName || !newDatas.info_from || !newDatas.message || !newDatas.email || !newDatas.location) {
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
                setSelectClass("selectConnect");
            }
        } catch (error) {
            console.error("Error adding news:", error);

            if (error.name === "ValidationError") {
                const errorMessages = Object.values(error.errors).map((err) => err.message);
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
        <div className=" w-full mx-auto px-0 lg:py-[50px] md:py-[30px] sm:py-[20px] xl:py-[60px] py-[15px] sm:px-4">
            <Form
                onSubmit={addNewForm}
                className="flex flex-col  max-w-[712px] mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl mx-auto text-sm sm:text-lg md:text-lg xl:text-lg xl-leading-7 2xl:leading-10 2xl:text-2xl connectusForm"
            >
                <div className="mb-[10px] sm:mb-[14px] lg:mb-[17.8px]  flex justify-center  items-center">
                    <Form.Control
                        style={{
                            outline: "rgb(187, 190, 192)",
                            border: "0.89px solid  #0A0A0ACC",
                            width: "100%",
                            maxWidth: "712px",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "black";
                            e.target.style.boxShadow = "0 0 1px black";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#0A0A0ACC";
                            e.target.style.boxShadow = "none";
                        }}
                        type="text"
                        id="fullname"
                        placeholder="Full Name"
                        className="bg-white mobdiv    "
                        value={newDatas.fullName}
                        onChange={(e) => setNewDatas({ ...newDatas, fullName: e.target.value })}
                    />
                </div>

                <div className=" flex justify-center connectPhoneInputs items-center ">
                    <PhoneInput
                        value={newDatas.phone}
                        country={"in"}
                        containerClass="phone-input-container"
                        enableSearch={true}
                        onChange={(value, country) => handlePhoneChange(value, country)}
                    />
                </div>

                <div className="my-[10px] sm:my-[14px] lg:my-[17.8px]  flex justify-center items-center">
                    <Form.Control
                        style={{
                            outline: "rgb(187, 190, 192)",
                            border: "0.89px solid  #0A0A0ACC",
                            width: "100%",
                            maxWidth: "712px",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "black";
                            e.target.style.boxShadow = "0 0 1px black";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#0A0A0ACC";
                            e.target.style.boxShadow = "none";
                        }}
                        type="text"
                        id="email"
                        placeholder="Email-ID"
                        className="bg-white     mobdiv "
                        value={newDatas.email}
                        onChange={(e) => setNewDatas({ ...newDatas, email: e.target.value })}
                    />
                </div>

                <div className="mb-[10px] sm:mb-[14px] lg:mb-[17.8px]  flex justify-center items-center">
                    <Form.Control
                        style={{
                            outline: "rgb(187, 190, 192)",
                            border: "0.89px solid  #0A0A0ACC",
                            width: "100%",
                            maxWidth: "712px",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "black";
                            e.target.style.boxShadow = "0 0 1px black";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#0A0A0ACC";
                            e.target.style.boxShadow = "none";
                        }}
                        type="text"
                        id="location"
                        placeholder="Where Are You Located?"
                        className="bg-white    mobdiv"
                        value={newDatas.location}
                        onChange={(e) => setNewDatas({ ...newDatas, location: e.target.value })}
                    />
                </div>

                <div className="mb-[10px] sm:mb-[14px] lg:mb-[17.8px]  flex justify-center items-center">
                    <Form.Select
                        id="howDidYouHear"
                        value={newDatas.info_from}
                        onChange={(e) => {
                            setNewDatas({ ...newDatas, info_from: e.target.value });
                            handleSelectChange(e.target.value);
                        }}
                        className={`bg-white   place  ${selectClass}`}
                        style={{
                            borderRadius: "0.35rem",
                            outline: "rgb(187, 190, 192)",
                            border: "0.89px solid  #0A0A0ACC",
                            width: "100%",
                            maxWidth: "712px",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "black";
                            e.target.style.boxShadow = "0 0 1px black";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#0A0A0ACC";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        <option value="" disabled hidden>
                            How Did You Hear About Us?
                        </option>
                        <option className="text-[10px] sm:text-[15px] lg:text-[20px] " value="Social Media">
                            Social Media
                        </option>
                        <option className="text-[10px] sm:text-[15px] lg:text-[20px] " value="Search Engine">
                            Search Engine
                        </option>
                        <option className="text-[10px] sm:text-[15px] lg:text-[20px] " value="Friend or Family">
                            Friend or Family
                        </option>
                        <option className="text-[10px] sm:text-[15px] lg:text-[20px] " value="Advertisement">
                            Advertisement
                        </option>
                        <option className="text-[10px] sm:text-[15px] lg:text-[20px] " value="Others">
                            Other
                        </option>
                    </Form.Select>
                </div>

                <div className="mb-[10px] sm:mb-[14px] lg:mb-[17.8px] flex justify-center items-center ">
                    <Form.Control
                        style={{
                            outline: "rgb(187, 190, 192)",
                            border: "0.89px solid  #0A0A0ACC",

                            width: "100%",
                            maxWidth: "712px",
                            minHeight: "150px",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "black";
                            e.target.style.boxShadow = "0 0 1px black";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#0A0A0ACC";
                            e.target.style.boxShadow = "none";
                        }}
                        as="textarea"
                        id="message"
                        placeholder="Message"
                        value={newDatas.message}
                        onChange={(e) => setNewDatas({ ...newDatas, message: e.target.value })}
                        className="bg-white !py-[8px]   mobdiv  "
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className=" mt-3 text-white transform hover:scale-105 hover:bg-blue-700 bg-gradient-to-r from-[#FF9D00] via-[#FFC100] to-[#FF9D00] px-8 py-2 rounded-md md:font-semibold md:text-black"
                    >
                        Submit
                    </button>
                </div>

                <div className="pt-3">
                    <div className="team text-center text-sm  md:text-xl xl:text-lg xl-leading-7 2xl:leading-10 2xl:text-xl">
                        Or email{" "}
                        <a
                            href="mailto:operations@trackpi.in"
                            className="connect-text-Color"
                            style={{ textDecoration: "none" }}
                        >
                            operations@trackpi.in
                        </a>{" "}
                        to get in touch with our team.
                    </div>
                </div>
            </Form>
            {isModalOpen ? (
                <ConnectUsPopup
                    onClose={() => {
                        setIsModalOpen(false);
                        navigate("/");
                    }}
                />
            ) : null}
        </div>
    );
}

export default Details;
