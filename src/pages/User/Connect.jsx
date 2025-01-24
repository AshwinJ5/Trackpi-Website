import React from 'react';
import Details from '../../components/User/Form';
import { Container, Row } from 'react-bootstrap';
import ConnectButtons from '../../components/ConnectButtons';
import HeaderBanner from '../../components/User/HeaderBanner';
import MapImg from '../../images/connectmap.svg'
import PhoneImg from '../../images/connectphone.svg'
import MailImg from '../../images/connectmail.svg'
import "../../CSS/connect.css";

const features = [
  {
      name: "Kakkanad, Kochi, India",
      description: "Office Location",
      image:MapImg
  },
  {
      name: "+91 8078179646",
      description: "Phone Number",
      image:PhoneImg
  },
  {
      name: "operations@trackpi.in",
      description: "E-mail ID",
      image:MailImg
  },
];
function Connect() {
  return (
    <>
      <HeaderBanner
        title="Connect Us"
        description="Ready to take your business to the next level? Contact Trackpi today for expert solutions in risk management, financial consulting, and more. Let’s work together to achieve your business goals"
        brochure
        classname="bgFive"
        noButton={true}
      />

      <div className=''>
        <h1 className="text-[#FF9D00] text-center text-[20px] sm:text-[27px] md:text-[35px] lg:text-[43px] xl:text-[50px] font-bold mb-2 md:mb-8">
          Contact Us
        </h1>
<div className=" px-6 lg:px-20 xl:px-24 2xl:px-32 grid my-[25px] sm:my-[30px] md:my-[37px] lg:my-[42px] xl:my-[50px]">
        <div className="flex flex-wrap gap-2.5 sm:gap-5 lg:gap-10  justify-center lg:justify-between KeyBenefitFirstDiv">
                {features.map((card,index)=>(
                    <div className="bg-gradient-to-r from-[#FF9D00] via-[#FFC100] to-[#FF9D00] sm:w-[calc(50%-20px)] lg:w-[calc(30%)]   text-center rounded md:w-[410px] w-[250px] p-[20px]   sm:p-[22px]   md:p-[25px]  lg:p-[27px] xl:p-[30px]  2xl:p-[33px] grid lg:gap-[20px] md:gap-[15px] gap-[10px] containerThree " key={index}>
                      <img className='mx-auto w-[40px] sm:w-[45px] md:w-[50px] lg:w-[55px] xl:w-[60px] ' src={card.image} alt="" />
                        <div className="font-semibold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] ">
                            {card.description}
                        </div>
                        <div className="font-bold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px]">
                            {card.name}
                        </div>
                    </div>
                ))}
            </div>
            </div>
      </div>

      <section id='connectUsContainer' className="sectionn w-full  md:px-6 lg:px-20 xl:px-24 2xl:px-32 py-8 mx-auto">
        <Container fluid className="text-center ">
          <Row className="mt-2 md:mt-5">
            <h1 className="ready mb-3   text-2xl md:text-4xl lg:text-5xl xl:text-[mainHeading] 2xl:text-6xl   font-bold connect-text-Color ">
              You’re ready to <br /> take the next step
            </h1>

            <p className=" mb-5  text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-10 font-medium">
              We’re all wrestling with complexity. Every company, work function,
              and team now faces a tall order: to be more adaptive, strategic,
              effective, human, and equitable amidst growing uncertainty.
            </p>
          </Row>
        </Container>
        <Container className="flex flex-col items-center">
          <div className="w-full ">
            <Details />
          </div>
        </Container>
      </section>
      <ConnectButtons />
    </>
  );
}

export default Connect;
