import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../../CSS/servicesub.css";

function ServicesSub({
    heading,
    subHeading,
    classname,
    title1,
    description1,
    img1,
    title2,
    description2,
    img2,
    title3,
    description3,
    img3,
    isPointWise,
}) {
    const options = { threshold: 0.1};

    const [refMainHeading, inViewMainHeading] = useInView(options);
    const [refFirstSection, inViewFirstSection] = useInView(options);
    const [refSecondSection, inViewSecondSection] = useInView(options);
    const [refThirdSection, inViewThirdSection] = useInView(options);

    return (
        <section
            ref={refMainHeading}
            className={`${classname} px-6 py-[20px] sm:py-[30px] md:py-[40px] lg:py-[60px] md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto grid gap-[10px] sm:gap-[15px] md:gap-[20px] lg:gap-[25px]  `}
        >
            <motion.div
                initial={{ opacity: 0, z: 50 }}
                animate={inViewMainHeading ? { opacity: 1, z: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mx-auto grid max-w-[1048px] gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]"
            >
                <div
                    style={{ textShadow: "2px 4px  4px #0A0A0A33", color: classname ? "white" : "#FF9D00" }}
                    className="text-center text-[20px] sm:text-[24px] md:text-[30px] lg:text-[40px] xl:text-[44px] 2xl:text-[46px] font-bold"
                >
                    {heading}
                </div>
                {subHeading ? (
                    <div
                        style={{ color: classname ? "white" : "black" }}
                        className="font-semibold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]  justify_para"
                    >
                        {subHeading}
                    </div>
                ) : null}
            </motion.div>
            <div className="grid gap-[25px] sm:gap-[30px] md:gap-[50px] lg:gap-[70px] xl:gap-[90px] 2xl:gap-[100px]">
                <div ref={refFirstSection} className="flex flex-col md:flex-row justify-between lg:gap-20 gap-10">
                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/2 my-auto grid gap-2.5 sm:gap-10 md:gap-0"
                    >
                        <h1
                            style={{ color: classname ? "black" : "#FFC100" }}
                            className="w-full text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[32px] 2xl:text-[34px] font-bold title_heading"
                        >
                            {title1}
                        </h1>
                        <div className="block md:hidden w-full md:w-1/2 px-3 md:px-0 m-auto">
                            <img
                                    className="object-cover w-full h-full  md:aspect-[6/5] aspect-[17/9]  rounded-lg md:shadow-lg shadow-sm"
                                    src={img1}
                                alt={title1}
                            />
                        </div>
                        <div className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[30px] xl:leading-[34px] 2xl:leading-[36px]">
                            {isPointWise ? (
                                <ul className=" mt-4">
                                    {description1
                                        .split(". ")
                                        .filter((sentence) => sentence.trim() !== "")
                                        .map((sentence, index) => (
                                            <li className="mb-2 list-disc" key={index}>{sentence.endsWith(".") ? sentence : sentence + "."}</li>
                                        ))}
                                </ul>
                            ) : (
                                <div className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[30px] xl:leading-[34px] 2xl:leading-[36px]">
                                    {description1}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inViewFirstSection ? { opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="w-full md:w-1/2 m-auto hidden md:block"
                    >
                        <img
                            className="object-cover w-full  md:aspect-[6/5] aspect-[17/9] h-full rounded-lg shadow-lg"
                            src={img1}
                            alt={title1}
                        />
                    </motion.div>
                </div>

                {title2 && description2 && img2 ? (
                    <div ref={refSecondSection} className="flex flex-col md:flex-row justify-between lg:gap-20 gap-10 ">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inViewSecondSection ? { opacity: 1 } : {}}
                            transition={{ duration: 1 }}
                            className="w-full md:w-1/2 m-auto hidden md:block"
                        >
                            <img
                                className="object-cover w-full h-full  md:aspect-[6/5] aspect-[17/9]  rounded-lg shadow-lg"
                                src={img2}
                                alt={title2}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 my-auto grid gap-2.5 sm:gap-10 md:gap-0"
                        >
                            <h1
                                style={{ color: classname ? "black" : "#FFC100" }}
                                className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[32px] 2xl:text-[34px] font-bold title_heading"
                            >
                                {title2}
                            </h1>
                            <div className="block md:hidden w-full md:w-1/2 px-3 md:px-0 m-auto">
                            <img
                                    className="object-cover w-full h-full  md:aspect-[6/5] aspect-[17/9]  rounded-lg md:shadow-lg shadow-sm"
                                    src={img2}
                                    alt={title2}
                                />
                            </div>
                            <div className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[30px] xl:leading-[34px] 2xl:leading-[36px]">
                                {description2}
                            </div>
                        </motion.div>
                    </div>
                ) : null}

                {title3 && description3 && img3 ? (
                    <div ref={refThirdSection} className="flex flex-col md:flex-row justify-between lg:gap-20 gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 my-auto grid gap-2.5 sm:gap-10 md:gap-0"
                        >
                            <h1
                                style={{ color: classname ? "black" : "#FFC100" }}
                                className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[32px] 2xl:text-[34px] font-bold title_heading"
                            >
                                {title3}
                            </h1>
                            <div className="block md:hidden w-full md:w-1/2 px-3 md:px-0 m-auto">
                            <img
                                    className="object-cover w-full h-full  md:aspect-[6/5] aspect-[17/9]  rounded-lg md:shadow-lg shadow-sm"
                                    src={img3}
                                    alt={title3}
                                />
                            </div>
                            <div className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[30px] xl:leading-[34px] 2xl:leading-[36px]">
                                {description3}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inViewThirdSection ? { opacity: 1 } : {}}
                            transition={{ duration: 1 }}
                            className="w-full md:w-1/2 m-auto hidden md:block"
                        >
                            <img
                                className="object-cover w-full h-full  md:aspect-[6/5] aspect-[17/9]  rounded-lg shadow-lg"
                                src={img3}
                                alt={title3}
                            />
                        </motion.div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}

export default ServicesSub;
