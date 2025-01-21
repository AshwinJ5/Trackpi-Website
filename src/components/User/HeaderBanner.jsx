import React, { useEffect, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import Brochure from './Brochure';
import { Link } from 'react-router-dom';
import '../../CSS/headerbanner.css'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 

function HeaderBanner({
  title,
  description,
  brochure,
  learn,
  classname,
  titleTwo,
  noButton,
  brochureMain,
  titleThree,
}) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const titleArray = [title, titleTwo, titleThree];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prevTitle => {
        const currentIndex = titleArray.indexOf(prevTitle);
        const nextIndex = (currentIndex + 1) % titleArray.length;
        return titleArray[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [title, titleTwo, titleThree]);

  return (
    <>

<section className={`${classname}`}>
        {noButton?null:<div className={`headerbuttons flex sm:justify-end  items-center space-x-0 sm:space-x-5 relative px-[15px] sm:px-[22.5px] lg:px-[30px] ${!brochure ? 'justify-end' : 'justify-between'} `}>
          {brochure ? (
                        <Link to="/project-submission" className='no-underline'>

            <button data-tooltip-id="submit-tooltip"
          data-tooltip-place="bottom" className="bg-gradient-to-r from-[#FFC100] to-[#FF9D00]  text-white lg:rounded-[10px]  sm:rounded-[7.5px] rounded-[5px] px-[10px] py-[5px] sm:px-[12px] sm:py-[6px] md:px-[14px] md:py-[7px] lg:px-[16px] lg:py-[8px] xl:px-[18px] xl:py-[9px] 2xl:px-[20px] 2xl:py-[10px] font-bold flex items-center space-x-2 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[14px]">
              <LuCirclePlus className='hidden sm:block'/>
              <span>Submit New Project</span>
            </button>
            </Link>
          ) : null}
          {<Brochure />}
        </div>}
  <div className='h-full absolute headerbanner1'>

        <div className="flex justify-center items-center h-100">
          
          <div
            className={`flex flex-col w-100 text-center items-center z-2 headerContent gap-[10px] sm:gap-[12px] md:gap-[15px] lg:gap-[18px] xl:gap-[20px] `}
          >
            <div className="text-yellow-400 font-bold text-[20px] sm:text-[24px] md:text-[36px] lg:text-[48px] xl:text-[56px] 2xl:text-[62px] headerBannerHeading w-100">
            {titleTwo ? currentTitle : title}
            </div>

            <div className="text-[12px] sm:text-[14px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-[14.4px] sm:leading-[14px] md:leading-[22px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[31.2px]  text-white justify_banner headerBannerPara max-w-[300px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[600px] xl:max-w-[70%] 2xl:w-[70%]">
              {description}
            </div>

            {learn ? (
              <div className="flex justify-center items-center">
                <Link to={'/business-consulting-services'} className='text-white'>               
                <button className="header_button text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] px-[10px] py-[7px] sm:px-[12px] sm:py-[8px] md:px-[16px] md:py-[10px] lg:px-[20px] lg:py-[14px] xl:px-[22px] xl:py-[18px] 2xl:px-[24px] 2xl:py-[20px] lg:rounded-[10px]  md:rounded-[7.5px]   sm:rounded-[5px] rounded-[3.5px] font-semibold">Learn How We Can Help</button>
                </Link>
              </div>
            ) : null}
            {brochureMain ? (<div className="">

              <Brochure/>
            </div>
               
            ) : null}
            { classname=="bgFive"? (<div className=" flex justify-between items-center space-x-5 ">

                        <Link to="/project-submission" className='no-underline'>

                        <button className="bg-gradient-to-r from-[#FFC100] to-[#FF9D00]  text-white lg:rounded-[10px]  sm:rounded-[7.5px] rounded-[5px] px-[10px] py-[5px] sm:px-[12px] sm:py-[6px] md:px-[14px] md:py-[7px] lg:px-[16px] lg:py-[8px] xl:px-[18px] xl:py-[9px] 2xl:px-[20px] 2xl:py-[10px] font-bold flex items-center space-x-2 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[14px]">
              <LuCirclePlus className='hidden sm:block'/>
              <span>Submit New Project</span>
            </button>
            </Link>
          <Brochure />
            </div>
               
            ) : null}
          </div>
        </div>
        </div>
</section>
      <Tooltip id='submit-tooltip'>
        <div className='text-center'>Have a Business Idea? </div>
        <div className='text-justify'>
        This feature lets you submit your business ideas, even if you’re unsure how to start. Share your concept, and our team will evaluate its potential to bring it to life. It’s an easy way to turn your innovative ideas into reality with expert guidance!</div>
      </Tooltip>
    </>
  );
}

export default HeaderBanner;
