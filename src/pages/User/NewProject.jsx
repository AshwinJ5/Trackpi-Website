import React from 'react';
import HeaderBanner from '../../components/User/HeaderBanner';
import { Container, Row } from 'react-bootstrap';
import FormNewProject from '../../components/User/FormNewProject';
import img1 from '../../images/team.png';

const NewProject = () => {
  return (
    <div>
      <HeaderBanner
        title="Submit New Project Here"
        description="Welcome to Trackpi's Project Submission page. We’re excited to collaborate with you and help bring your ideas to life. Please submit your project details below, and our team will get started on providing tailored solutions to drive your business forward"
        classname="bgSix"
        noButton={true}
        image={img1} class123={'headerbannerCenterContentOther'}
      />
      <section className=" w-full px-2 sm:px-4 lg:px-20 xl:px-24 2xl:px-32 py-8 mx-auto ">
        <Container className="flex flex-col ">
          <div className="w-full rounded ">
            <div>
              <h1 className="text-center mb-8  font-bold text-[#FFC100] text-[30px] md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl">
                Enter the Details
              </h1>
            </div>
            <FormNewProject />
          </div>
        </Container>
      </section>{' '}
    </div>
  );
};

export default NewProject;
