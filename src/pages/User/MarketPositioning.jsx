import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import maketingImg1 from '../../images/marketPositioning1.svg'
import maketingImg2 from '../../images/marketPositioning2.svg'
import maketingImg3 from '../../images/marketPositioning3.svg'

const MarketPositioning = () => {

      const options = { threshold: 0.1 };
  
      const [refMainHeading, inViewMainHeading] = useInView(options);
      const [refFirstSection, inViewFirstSection] = useInView(options);
    const cardData = [
        {
            img: maketingImg1,
            title: "Customized Operators Strategy",
            description:
                "Customized Operators Strategy - We create Branding tailored operator strategies that will speak to your audience for conveying a clear message and are suitable on the market",
        },
        {
            img: maketingImg2,
            title: "Market & Competitor Research",
            description: "Use comprehensive market research and analysis to support conclusions made on how to position the brand in the market",
        },
        {
            img: maketingImg3,
            title: "Cultivating Customers Loyalty",
            description: "We aim at achieving the goal of bringing customer-centric experiences to life through closure",
        },
    ];
   
    return (
        <section ref={refMainHeading} className="bgSection py-[35px] sm:py-[40px] md:py-[50px] lg:py-[60px] xl:py-[70px] 2xl:py-[80px] px-6  lg:px-20 xl:px-24 2xl:px-32 grid gap-[10px] sm:gap-[15px] md:gap-[20px] lg:gap-[25px] ">
            <motion.div  initial={{ opacity: 0, y: 5 }}
                animate={inViewMainHeading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: .5 }}  className="mx-auto grid max-w-[1048px] gap-[10px] sm:gap-[15px] md:gap-[20px] lg:gap-[25px] xl:gap-[30px]">
                <div
                    style={{ textShadow: "2px 4px  4px #0A0A0A33", color: "white" }}
                    className="text-center text-[20px] sm:text-[24px] md:text-[30px] lg:text-[40px] xl:text-[44px] 2xl:text-[46px] font-bold"
                >
                    Market Positioning & Branding
                </div>
                <div
                    style={{ color: "white" }}
                    className="font-semibold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]  justify_para max-w-[700px]"
                >
                    These tailored strategies we offer for market positioning and branding will help your business create its own market identity and build trust to earn a competitive edge in the industry.
                </div>
            </motion.div>

            <div ref={refFirstSection} className="w-full flex flex-wrap gap-2.5 sm:gap-5 lg:gap-10 2xl:gap-20 justify-center ">
                {cardData.map((card,index)=>(
                  <motion.div  initial={{ opacity: 0}}
                  animate={inViewFirstSection ? { opacity: 1} : {}}
                  transition={{ duration: 1 }}   className="bg-white rounded-[10px] md:rounded-[20px] px-[20px] 2xl:px-[40px] xl:px-[36px] lg:px-[32px]  md:px-[28px] sm:px-[24px] xl:py-[30px] lg:py-[27px]  md:py-[25px] sm:py-[23px] py-[20px] max-w-[290px] md:max-w-[520px] text-center grid lg:gap-[20px] md:gap-[15px] gap-[10px]  w-full md:w-[calc(45%)] lg:w-[calc(45%)] " key={index}>
                        <div >
                          <img className="mx-auto img_marketing" src={card.img} alt="" />
                        </div>
                        <div className="grid lg:gap-[20px] md:gap-[15px] gap-[10px]">
                            <div className="font-semibold text-black text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] text-center">{card.title}</div>
                            <p className="text-black  text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-medium text-center">{card.description}</p>
                        </div>
                </motion.div>))}
            </div>
        </section>
    );
};

export default MarketPositioning;
