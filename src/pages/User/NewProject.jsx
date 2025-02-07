import React from 'react';
import HeaderBanner from '../../components/User/HeaderBanner';
import { Container, Row } from 'react-bootstrap';
import FormNewProject from '../../components/User/FormNewProject';
import ConnectButtons from '../../components/ConnectButtons';

const NewProject = () => {
  return (
    <div>
      <HeaderBanner
        title="Submit Your Business Idea, Let's Make It Happen!"
        description="Welcome to Trackpi's Project Submission page. We’re excited to collaborate with you and help bring your ideas to life. Please submit your project details below, and our team will get started on providing tailored solutions to drive your business forward"
        classname="bgSix"
        noButton={true}
        class123={'headerbannerCenterContentOther'}
      />
      <section className=" w-full px-2 sm:px-4 lg:px-20 xl:px-24 2xl:px-32 pb-8 mx-auto ">
        <Container className="flex flex-col ">
          <div className="w-full rounded ">
            <div>
              <h1 className="text-center mb-4  font-bold text-[#FFC100] text-[22px] md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl">
                Enter the Details
              </h1>
            </div>
            <FormNewProject />
          </div>
        </Container>
      </section>{' '}
      <ConnectButtons />
    </div>
  );
};

export default NewProject;
