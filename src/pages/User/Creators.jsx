import React from "react";
import "../../CSS/User/Creators.css";
import { SERVER_URL } from "../../Api Services/serverUrl";

const designers = [
    { name: "V Ranjana Priya", role: "UI/UX Designer", image: `${SERVER_URL}/uploads/creators/ranjana.jpg` },
    { name: "Alffen Sunny", role: "UI/UX Designer", image:`${SERVER_URL}/uploads/creators/alffen.jpg`  },
];

const developers = [
    { name: "Shalu V", role: "MERN Stack Developer", image: `${SERVER_URL}/uploads/creators/shalu.png` },
    {
        name: "Ashwin Joseph",
        role: "MERN Stack Developer",
        image: `${SERVER_URL}/uploads/creators/ashwinj.jpg`,
    },
    { name: "Fathima Nidha ", role: "MERN Stack Developer", image: `${SERVER_URL}/uploads/creators/Fnidha.jpg` },
];

const Creators = () => {
    return (
        <>
            <div className="xl:mt-[98px] sm:mt-[80px] mt-[50px] creatorsMain">
                <div className="py-[30px] sm:py-[30px] md:py-[30px] lg:py-[45px]  p-[15px] sm:p-[20px] md:p-[40px] lg:p-[60px] xl:p-[65px] grid gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[35px] xl:gap-[40px]">
                    <div className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[48px] xl:text-[62px]  font-bold text-center text-[#FF9D00] mb-0 ">
                        Creators
                    </div>
                    <div className="grid gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[60px] xl:gap-[80px]">
                        <div className="gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px] grid">
                            <div className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[38px] xl:text-[46px] font-bold text-center text-[#FFC100]">
                                Designers
                            </div>
                            <div className="flex flex-wrap gap-[15px] sm:gap-[20px] md:gap-[30px] lg:gap-[40px] xl:gap-[50px] justify-center items-center">
                                {designers.map((designer, index) => (
                                    <div
                                        key={index}
                                        className="rounded-[10px] shadow-[2px_2px_4px_0px_#0A0A0A33,-2px_1px_4px_0px_#0A0A0A33,0px_-2px_4px_0px_#0A0A0A33] w-[300px] sm:w-[290px] md:w-[320px] lg:w-[30%]  max-w-[400px] aspect-[30/28] sm:aspect-[1] designers "
                                    >
                                        <img
                                            className="w-full aspect-[1.38] object-cover object-top rounded-[10px]"
                                            src={designer.image}
                                            alt={designer.name}
                                            onContextMenu={(e) => e.preventDefault()}
                                            draggable='false'
                                        />
                                        <div className="px-[15px] py-[10px]">
                                            <div className="font-semibold text-[16px] sm:text-[20px] md:text-[24px] lg:text-[23px] xl:text-[30px] 2xl:text-[32px]">
                                                {designer.name}
                                            </div>
                                            <div className="font-medium text-[14px] sm:text-[17px] md:text-[19px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]">
                                                {designer.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px] grid">
                            <div className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[38px] xl:text-[46px] font-bold text-center text-[#FFC100]">
                                Developers
                            </div>
                            <div className="flex flex-wrap gap-[15px] sm:gap-[20px] md:gap-[30px] lg:gap-[40px] xl:gap-[50px] justify-center items-center">
                                {developers.map((developer, index) => (
                                    <div
                                        key={index}
                                        className="rounded-[10px] shadow-[2px_2px_4px_0px_#0A0A0A33,-2px_1px_4px_0px_#0A0A0A33,0px_-2px_4px_0px_#0A0A0A33] w-[300px]  sm:w-[290px] md:w-[320px] lg:w-[30%]  aspect-[30/28] sm:aspect-[1]  max-w-[400px] developers"
                                    >
                                        <img
                                            className="w-full aspect-[1.38] object-cover object-top rounded-[10px]"
                                            src={developer.image}
                                            alt={developer.name}
                                            onContextMenu={(e) => e.preventDefault()}
                                            draggable='false'
                                        />
                                        <div className="px-[15px] py-[10px] grid  items-center ">
                                            <div className="font-semibold text-[16px] sm:text-[20px] md:text-[24px] lg:text-[23px] xl:text-[30px] 2xl:text-[32px]">
                                                {developer.name}
                                            </div>
                                            <div className="font-medium text-[14px] sm:text-[17px] md:text-[19px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px] ">
                                                {developer.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Creators;