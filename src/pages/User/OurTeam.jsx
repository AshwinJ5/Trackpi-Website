//import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Puff } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

import TeamListMemberCrd from '../../components/User/teamListMemberCrd';
import '../../CSS/ourTeam.css';
import Clients from '../../components/User/carousel';
import baseURL from '../../Api Services/baseURL';
function OurTeam() {
  const options = { threshold: 0.1 };
  const [heading, setHeading] = useState({});
  const [employees, setEmployees] = useState([]);
  const adminToken = localStorage.getItem('adminToken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Hooks for intersection observers
  const [refFirstSection, inViewFirstSection] = useInView(options);
  const [refSecondSection, inViewSecondSection] = useInView(options);
  const [refThirdSection, inViewThirdSection] = useInView(options);
  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await baseURL.get('/api/employee/employees', {
          params: { category: 'employee' },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setEmployees(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError('Failed to load employees.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);
  useEffect(() => {
    getAllHeadings();
  }, []);
  const getAllHeadings = async () => {
    try {
      const response = await baseURL.get(
        '/api/headingfornewspatnership/getallheading'
      );
      if (response.data && response.data.length > 0) {
        setHeading(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching haeding data:', error);
    }
  };

  const handleInputChange = e => {
    window.open('https://trackpi.org', '_blank');
  };

  return (
    <>
      <section className="flex justify-center items-center  h-full w-full px-4 ">
        <div className="  flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-[#FF9D00] font-bold hiring_heading">
            Who We Are?
          </h1>
        </div>
      </section>
      <section
        ref={refFirstSection}
        className="smallscreen md:mt-20 w-full px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto section1"
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2">
            <motion.h1
              className="firsth1 fw-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-3"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              We are Trackpi
            </motion.h1>
            <div className="flex justify-center px-2 ">
              <motion.img
                src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64ecb80f6f19b2addac4e0f1_image_WeAreTheReady1-p-800.webp"
                alt="Team Image"
                className="rounded-lg w-[340px] h-[200px] md:h-[390px] 2xl:h-[490px] md:hidden object-cover "
                initial={{ opacity: 0, x: -50 }}
                animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            <motion.p
              className="firstp text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Trackpi is one of the best business consultants in Kerala, assisting clients in fulfilling their objectives.
               Based in Kochi, our team is highly experienced in developing strategies that promote growth and development.
                With our expert commercial development consulting services, we help businesses thrive in a competitive environment.
                 As one of the leading business consultants in Kerala, we confidently position ourselves as the most qualified firm to excel in this field.

            </motion.p>
          </div>
          <div className="md:w-1/2 flex md:justify-end hidden md:block">
            <motion.img
              src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64ecb80f6f19b2addac4e0f1_image_WeAreTheReady1-p-800.webp"
              alt="Team Image"
              className="shadow-lg rounded-lg w-full h-[300px] md:h-[390px] 2xl:h-[490px] flex object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewFirstSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </section>
      <section className="smallscreen section3 md:mt-20 flex flex-col items-center  md:gap-10 md:w-full h-full">
        <div className="flex flex-col items-center ">
          <h1 className="fw-bold text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl text-[#FFC100] ">
            {heading.partnershipHeading}
          </h1>
          <h5 className="paras text-bold text-black text-xs md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl xl-leading-7 2xl:leading-10  ">
            {heading.partnershipSubHeading}
          </h5>
        </div>
        <Clients />
      </section>

      <section
        ref={refSecondSection}
        className=" smallscreen md:mt-28 w-full px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto py-6 md:py-20 bg-gradient-to-r from-[#FFC100] via-[#FFC100] to-[#FFC100] text-black bgg11 section2"
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2 flex md:justify-start hidden md:block">
            <motion.img
              src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64495b02c779ff9ad9a7990f_image_OurPeopleForeground%402x-p-1080.webp"
              alt="Team Image"
              className="shadow-lg rounded-lg w-full h-[300px] md:h-[390px] 2xl:h-[490px] object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="md:w-1/2">
            <motion.h1
              className="firsth1 our font-bold  text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Our people
            </motion.h1>
            <div className="md:hidden flex justify-center px-10  ">
              <motion.img
                src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64495b02c779ff9ad9a7990f_image_OurPeopleForeground%402x-p-1080.webp"
                alt="Team Image"
                className=" rounded-lg w-[277px]  md:w-full h-[180px] md:h-[390px] 2xl:h-[490px] object-cover"
                initial={{ opacity: 0, x: -50 }}
                animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            <motion.p
              className="firstp text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewSecondSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              The Trackpi team is dedicated to ensuring the success of your business. 
              Each team member brings extensive experience and a range of skills tailored to meet your business needs. 
              We work collaboratively to achieve excellent results for your company, helping you reach your goals and expand your operations.
               Our commitment to excellence ensures that we make significant strides towards your business’s success.

            </motion.p>
          </div>
        </motion.div>
      </section>

      <section
        ref={refThirdSection}
        className="smallscreen section4 px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto w-full h-full mt-28 section3"
      >
        <motion.div
          className=" flex flex-col md:flex-row gap-12 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col w-full md:w-1/2">
            <motion.h1
              className="firsth1 fw-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Join Us – The Largest Freelancers Community in Kerala
            </motion.h1>
            <div className="flex justify-center px-2">
              <motion.img
                src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64495b2e1589c13e25e8db88_image_OurTeamForeground%402x-p-1080.webp"
                alt=""
                className="rounded-lg w-[340px]  h-[180px] md:h-[390px] 2xl:h-[490px] md:hidden object-cover"
                initial={{ opacity: 0, x: -50 }}
                animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            <motion.p
              className="firstp text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  mt-8 md:mb-2 text-justify"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
             Trackpi is excited to offer you an opportunity to join us, even without prior experience. 
             If you're looking to earn additional income, look no further—Trackpi provides the perfect platform to get started. 
             All you need is passion and skills to embark on your journey.

            </motion.p>
            <motion.div
              className="secondp text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  md:mt-8 mb-3 text-justify"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
     Trackpi welcomes freelancers at various stages of life—students, working professionals, 
     and even senior citizens seeking self-enhancement and accomplishment.
      Work from home and potentially earn more while being part of a thriving freelance community.
       Join us today to take advantage of opportunities that foster your growth and development while contributing to a diverse and dynamic community.
              <br />
              <div className="flex justify-center md:justify-start">
                <Button
                  onClick={handleInputChange}
                  className=" mt-4 bg-transparent  text-black fw-bold  rounded-pill  hover:bg-gray-800 
                 px-10 py-2 md:px-12 md:py-3 lg:py-4   xl:py-14 2xl:px-12   
                  text-sm  md:text-lg  lg:text-xl  xl:text-xl  2xl:text-2xl 
                   transition duration-300  ff  "
                >
                  JOIN OUR TEAM <i className="fa-arrow-right fa-solid "></i>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="w-full hidden md:block  md:w-1/2 flex justify-center justify-end">
            <motion.img
              src="https://cdn.prod.website-files.com/63f64214650d1272fb21690d/64495b2e1589c13e25e8db88_image_OurTeamForeground%402x-p-1080.webp"
              alt=""
              className="shadow-lg rounded-lg w-full h-[300px] md:h-[390px] 2xl:h-[490px] object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={inViewThirdSection ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </section>
      <section className="section4 smallscreen  md:mt-10 lg:mt-10 xl:mt-10 2xl:mt-10 md:mb-5  w-full pl-2 pr-0  md:px-6 lg:px-20 xl:px-24 2xl:px-32 md:py-8 mx-auto">
        <Container fluid>
          <Row>
            <h1 className="fw-bold text-center text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-2   flex justify-center ">

              The Trackpi from A–Z

            </h1>
          </Row>
          {loading ? (
            <Puff
              className="flex justify-center items-center "
              visible={true}
              height={80}
              width={80}
              color="#FF9D00"
              ariaLabel="puff-loading"
            />
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <TeamListMemberCrd employees={employees} />
          )}
        </Container>
      </section>
    </>
  );
}

export default OurTeam;
