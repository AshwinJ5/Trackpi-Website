import { useState } from "react";
import bgImage from '../../images/popupbg.svg'

function ConnectUsPopup ({project, onClose}) {

  // const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center absolute z-[10000] connectusModalMain">

      {/* {isModalOpen && ( */}
        <div
          className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50  "
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[rgba(250,245,240)]  rounded-[15px] lg:rounded-[30px] shadow-lg max-w-[350px] sm:max-w-[500px]  md:max-w-[620px] lg:max-w-[950px] xl:max-w-[1150px] connectPopupDivOuter "
            onClick={(e) => e.stopPropagation()} 
          >
 
 <div className={`relative z-[1] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px]   grid ${!project ? 'gap-[40px]' : 'gap-[40px] sm:gap-[50px] md:gap-[60px] lg:gap-[70px] xl:gap-[80px] '} connectusModal `}>
 <div className="font-bold text-[18px] sm:text-[24px] md:text-[32px] lg:text-[48px] xl:text-[62px] text-center k2d-thin headingOne">{project?"Your Idea is in Motion!" :"You Are Definitely on the Right Path!"}</div>
                {!project?<div className="font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[32px] text-center k2d-thin grid gap-[40px] sm:gap-[45px] md:gap-[50px] lg:gap-[55px] xl:gap-[60px] headingTwo">
                  <div>Thank you for contacting us!</div>
                  <div>Your application form has been received and is in our system. A supporting agent will be in contact with you shortly.</div>
                </div>:
                <div className="font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[32px] text-center k2d-thin headingTwo">Thank you for sharing your business idea with us! We have received your details, and our team will review them shortly.</div>}

                <div className={`font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] montserrat ${!project? 'text-center':""} headingThree`}>{project?"We appreciate your trust and look forward to connecting with you soon to discuss the next steps. Stay tuned!":"We are always ready to serve your needs!"}</div>

                <div className="mx-auto"><div className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[300px] xl:w-[400px] rounded-[6px]  sm:rounded-[12px] lg:rounded-[20px] py-[8px] sm:py-[10px] md:py-[12px] lg:py-[14px] xl:py-[18px] cursor-pointer text-center text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[30px] font-semibold text-white bg-gradient-to-r from-[#FEDC3F]  to-[#FF9D00] sectionOne" 
                onClick={onClose}>Okay</div></div>
                
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default ConnectUsPopup;
