import React from "react";
import "../../CSS/User/inaguration.css";
import img1 from "../../../public/assets/svg/inagurationImg.svg";
import buttonImg from "../../../public/assets/svg/inaguratiobutton.svg";
import img3 from "../../../public/assets/svg/inagurationimgs.svg";
import logo from "../../../public/assets/images/tpl.png";
import img2 from "../../../public/assets/images/shajahan.jpg";
import { NavLink } from "react-router-dom";

function Inaguration() {
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="inagurationMain">
                    <div className="inagurationSecond  flex w-full ">
                        <div className="w-1/2  flex flex-col items-center justify-around firstDivIng">
                            <div className="w-full  2xl:pt-[40px] 2xl:ps-[40px] pt-[20px] ps-[20px]">
                                <img className="2xl:w-[140px] xl:w-[120px] w-[100px]  " src={logo} alt="" />
                            </div>
                            <div className="grid w-full ms-[40px]  font-semibold">
                                <div className="k2d  text-left  xl:text-[80px] 2xl:text-[95px] text-[55px]">GRAND</div>
                                <div className="k2d  text-center  xl:text-[75px] text-[55px] 2xl:text-[95px]">
                                    LAUNCHING
                                </div>
                                <div className="text-left text-right  xl:text-[70px] text-[55px] 2xl:text-[90px] corinthia">
                                    Ceremony
                                </div>
                            </div>
                            <div className="flex xl:gap-[30px] lg:gap-[20px] gap-[15px] ms-[40px] w-full mb-[30px]">
                                <div>
                                    <img
                                        className="2xl:w-[180px]  xl:w-[170px]  w-[170px] aspect-[170/222] inagurationPerson "
                                        src={img2}
                                        alt=""
                                    />
                                </div>
                                <div className="grid lg:gap-[10px]  w-[412px] 2xl:w-[500px]">
                                    <div className="grid gap-[10px]">
                                        <div className="xl:text-[44px] lg:text-[36px] 2xl:text-[46px]  font-semibold lateef">
                                            Dr. Shajahan Aboobacker
                                        </div>
                                        <div className="interFont font-medium xl:text-[24px] lg:text-[18px] 2xl:text-[26px]">
                                            Business Coach & <br />
                                            Corporate Consultant
                                        </div>
                                    </div>

                                    <NavLink
                                        to={"/"}
                                        className="xl:text-[24px] text-[20px] 2xl:text-[26px] interFont font-bold xl:max-w-[304px] max-w-[260px] h-[56px] xl:h-[64px]  2xl:h-[66px] bg-gradient-to-r from-[#FEDC3F] via-[#FE8900] to-[#FE8900] rounded-[37px] text-white flex items-center justify-center gap-[10px]"
                                    >
                                        <div>Launch</div> <img src={buttonImg} alt="" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 py-[30px] flex flex-col items-center justify-around secondDivIng">
                            <div className="grid  gap-1 text-center ">
                                <div className="2xl:text-[45px] xl:text-[35px] text-[28px] montserrat font-bold ">
                                    Welcome to <span className="text-white">Trackpi</span>
                                </div>
                                <div className="2xl:text-[30px] xl:text-[24px] text-[20px]  righteous">
                                    Your Strategic Growth Partner
                                </div>
                            </div>
                            <div className="xl:my-[-100px] lg:my-[-100px]">
                                <img className="object-contain w-[90%] aspect-[1/1] mx-auto" src={img1} alt="" />
                            </div>
                            <div className="grid gap-[15px] text-center">
                                <div className="2xl:text-[36px] font-semibold xl:text-[32px] text-[24px] enriqueta">www.trackpi.in</div>
                                <div className="2xl:text-[26px] xl:text-[22px] text-[18px] encodeSans">
                                    Best Business Consulting <br /> Firm in Kerala
                                </div>
                                <div className="2xl:text-[26px]  xl:text-[22px] text-[18px] encodeSans">
                                    “People’s Interest, Our Interest”
                                </div>
                            </div>
                        </div>
                        <div className="  grid items-center justify-center items-center thirdDivIng w-full">
                            <div className="w-full flex  ps-[20px]">
                              <div className="w-1/4">
                                <img className=" w-[93px]  " src={logo} alt="" />
                              </div>
                                <div className="flex-flex-col w-3/4 gap-1 text-center ">
                                    <div className=" text-[28px] montserrat font-bold ">
                                        Welcome to <span className="text-white">Trackpi</span>
                                    </div>
                                    <div className=" text-[20px]  righteous">Your Strategic Growth Partner</div>
                                </div>
                            </div>
                            <div className="grid w-full max-w-[547px] font-semibold ">
                                <div className="k2d  text-left  text-[55px]">GRAND</div>
                                <div className="k2d  text-center  text-[55px] ">LAUNCHING</div>
                                <div className="text-left text-right font-bold text-[55px] corinthia">Ceremony</div>
                            </div>
                            <div className="flex w-full">
                              <div className="w-1/2 flex justify-end items-center">
                                <img src={img1} className="w-[100%] max-w-[281px]  ms-[20px]" alt="" />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-[8px] text-center  me-[20px] w-1/2">
                                    <div className=" text-[22px] font-semibold enriqueta">www.trackpi.in</div>
                                    <div className=" text-[15px] encodeSans">
                                        Best Business Consulting <br /> Firm in Kerala
                                    </div>
                                    <div className=" text-[15px] encodeSans">“People’s Interest, Our Interest”</div>
                                </div>
                            </div>
                            <div className="flex gap-[23px] ms-[60px] w-full mb-[30px] justify-center">
                                <div>
                                    <img className="  w-[130px] aspect-[170/222] inagurationPerson " src={img2} alt="" />
                                </div>
                                <div className="grid gap-[7px]  w-[412px]">
                                    <div className="grid gap-[7px]">
                                        <div className="text-[35px] font-semibold lateef">Dr. Shajahan Aboobacker</div>
                                        <div className="interFont font-medium text-[20px]">
                                            Business Coach & <br />
                                            Corporate Consultant
                                        </div>
                                    </div>

                                    <NavLink
                                        to={"/"}
                                        className="text-[18px] interFont font-bold  max-w-[230px] h-[56px] xl:h-[64px] bg-gradient-to-r from-[#FEDC3F] via-[#FE8900] to-[#FE8900] rounded-[37px] text-white flex items-center justify-center gap-[10px]"
                                    >
                                        <div>Launch</div> <img className="w-[42px] h-[26px]" src={buttonImg} alt="" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inagurationImgOne">
                    <img src={img3} alt="" />
                </div>
            </div>
        </>
    );
}

export default Inaguration;
