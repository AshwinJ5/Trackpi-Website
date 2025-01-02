import React from 'react';
import Details from '../components/Form';
import { Container, Row } from 'react-bootstrap';
import ConnectButtons from '../components/ConnectButtons';
import HeaderBanner from '../components/HeaderBanner';
import "./connect.css";
function Connect() {
  return (
    <>
      <HeaderBanner
        title="Connect Us"
        description="Reach out to us for any inquiries or support — we are here to help."
        brochure
        classname="bgFive"
        noButton={true}
      />

      <div className="bb">
        <h1 className="text-[#FF9D00] text-center text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl font-bold mb-2 md:mb-8">
          Contact Us
        </h1>

        <div className=" py-0   w-full flex justify-center px-16   mt-4 md:mt-8 mb-2 md:mb-8">
          <div className="card-group  w-full flex flex-wrap justify-between gap-10">
            {[
              {

                icon: "fa-location-dot",
                title: "Office Location",
                text: "Kakkanad, Kochi, India",
              },
              {
                icon: "fa-phone",
                title: "Phone Number",
                text: "+91 8078179646",
              },
              {
                icon: "fa-envelope",
                title: "E-mail Id",
                text: "trackpi@gmail.com",

              },
            ].map((card, index) => (
              <div
                key={index}
                className="card card1  md:pt-4 rounded-2xl fixed-card  w-[280px] sm:w-[calc(50%-20px)] lg:w-[calc(30%)] md:w-[410px] h-[140px] md:h-[230px] p-[30px] flex flex-col justify-between items-center gap-5  text-center shadow-lg"
              >

                <div className=" flex flex-col items-center gap-3 ">
                <div className="h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white rounded-full flex justify-center items-center text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]   md:mt-2 text-amberCustom md:mb-2">
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <h6 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]  font-medium">
                  {card.title}
                </h6>
                <p className="text-[15px] sm:text-[17px] md:text-[21px] lg:text-[25px] xl:text-[27px] 2xl:text-[29px] font-bold space-y-3">
                  {card.text}
                </p>

               

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="sectionn w-full  md:px-6 lg:px-20 xl:px-24 2xl:px-32 py-8 mx-auto">
        <Container fluid className="text-center">
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
