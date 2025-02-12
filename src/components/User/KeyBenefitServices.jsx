import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function KeyBenefitServices() {
    const options = { threshold: 0.1 };
    const [refFirstSection, inViewFirstSection] = useInView(options);

    const features = [
        {
            name: "Increased Output",
            description:
                "Encourage your team to have efficient and effective processes in place so that they can do more in less time.",
        },
        {
            name: "Strengthened Teamwork",
            description:
                " Encourage operational success by improving teamwork and communication and ensuring everyone is working towards the same goal.",
        },
        {
            name: "Profitable Growth",
            description:
                "Develop methods that can be expanded while still remaining effective and profitable for the organization in the long run.",
        },
    ];
    return (
        <section className=" px-6 lg:px-20 xl:px-24 2xl:px-32 grid my-[25px] sm:my-[30px] md:my-[37px] lg:my-[42px] xl:my-[50px] gap-[10px] sm:gap-[18px] md:gap-[25px] lg:gap-[32px] xl:gap-[40px]">
            <div className="w-full px-6 lg:px-20 xl:px-24 2xl:px-32  mx-auto ">
                <h1
                    style={{ color: "#FFC100" }}
                    className=" text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[37px] 2xl:text-5xl text-center font-bold "
                >
                    Our Training Offer Should Benefit You in These Ways
                </h1>
            </div>
            <div
                ref={refFirstSection}
                className="flex flex-wrap gap-2.5 sm:gap-5 lg:gap-10  justify-center lg:justify-between KeyBenefitFirstDiv"
            >
                {features.map((card, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-[#FFD152] via-[#FFC100] to-[#FFD152] sm:w-[calc(50%-20px)] lg:w-[calc(30%)]   text-center rounded md:w-[410px] w-[280px] p-[20px]   sm:p-[22px]   md:p-[25px]  lg:p-[27px] xl:p-[30px]  2xl:p-[33px] grid xl:gap-[20px] lg:gap-[15px] md:gap-[15px] gap-[10px]  containerThree items-center"
                        key={index}
                    >
                        <div className="font-bold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px] flex items-end justify-center h-100">
                            {card.name}
                        </div>
                        <div className="font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] text-justify">
                            {card.description}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default KeyBenefitServices;
