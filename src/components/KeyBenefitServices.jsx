import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function KeyBenefitServices() {

    const options = { threshold: 0.1, triggerOnce: true };
    const [refFirstSection, inViewFirstSection] = useInView(options);

    const features = [
        {
            name: "Enhanced Productivity",
            description: "Empower your team to work smarter and achieve more in less time.",
        },
        {
            name: "Improved Communication",
            description: "Strengthen collaboration and create a cohesive team environment.",
        },
        {
            name: "Increased Profitability",
            description: "Leverage efficient processes to maximize revenue and minimize waste.",
        },
    ];
    return (
        <section className=" px-6 lg:px-20 xl:px-24 2xl:px-32 grid my-[25px] sm:my-[30px] md:my-[37px] lg:my-[42px] xl:my-[50px] gap-[10px] sm:gap-[18px] md:gap-[25px] lg:gap-[32px] xl:gap-[40px]">
            <div className="w-full px-6 lg:px-20 xl:px-24 2xl:px-32  mx-auto ">
                <h1 style={{ color: "#FFC100" }} className=" text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[37px] 2xl:text-[44px] text-center font-bold">
                    Key Benefits of Our Training
                </h1>
            </div>
            <div ref={refFirstSection} className="flex flex-wrap gap-2.5 sm:gap-5 lg:gap-10  justify-center lg:justify-between">
                {features.map((card,index)=>(
                    <motion.div initial={{ opacity: 0, x: -20 }}
                    animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: .5 }} className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(30%)]   text-center rounded md:w-[410px] w-[280px] p-10 grid lg:gap-[20px] md:gap-[15px] gap-[10px] bg-gradient-to-r from-[#FFD152] via-[#FFC100] to-[#FFD152]" key={index}>
                        <div className="font-bold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]">
                            {card.name}
                        </div>
                        <div className="font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
                            {card.description}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default KeyBenefitServices;
