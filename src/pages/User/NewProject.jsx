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
        description="Trackpi is your business's growth partner, turning insights into action. With tailored strategies and expert guidance, we help you navigate challenges, streamline operations, and unlock new opportunities for success."
        classname="bgSix"
        noButton={true}
        image={img1}
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
