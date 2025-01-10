// Created by Shalu
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from '../../components/User/UseInView';
import { Link } from 'react-router-dom';
import home1 from '../../images/home1.png';
import home2 from '../../images/home2.png';
import ConnectButtons from '../../components/ConnectButtons';
import logo from '../../images/trackpi_logo.png';
import { Carousel } from 'react-bootstrap';
import clientLogo1 from '../../images/growthfactor.png';
import clientLogo2 from '../../images/trademax.png';
import HeaderBanner from '../../components/HeaderBanner';
import '../../CSS/User/Home.css';
import img1 from '../../images/team.png';
import PopUp from '../../components/PopUp';

function Home() {
  const isInView1 = useInView({ selector: '.section1' });
  const isInView2 = useInView({ selector: '.section2' });
  const isInView3 = useInView({ selector: '.section3' });

  const cards = [
    {
      id: 1,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 2,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 3,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 4,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 5,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 6,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 7,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 8,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 9,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 10,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 11,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
    {
      id: 12,
      title: 'We See The Challenge',
      description:
        "We're all wrestling with complexity.Every company, work function, and team now facesa tall order",
      logo: logo,
    },
  ];
  const clients = [
    { id: 1, logo: clientLogo1 },
    { id: 2, logo: clientLogo2 },
    { id: 3, logo: clientLogo1 },
    { id: 4, logo: clientLogo2 },
    { id: 5, logo: clientLogo1 },
    { id: 6, logo: clientLogo2 },
    { id: 7, logo: clientLogo1 },
    { id: 8, logo: clientLogo2 },
    { id: 9, logo: clientLogo1 },
    { id: 10, logo: clientLogo2 },
    { id: 11, logo: clientLogo1 },
    { id: 12, logo: clientLogo2 },
    { id: 13, logo: clientLogo1 },
    { id: 14, logo: clientLogo2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bulgingCard, setBulgingCard] = useState(0);
  const [groupedCards, setGroupedCards] = useState([]);
  const [cardsPerGroup, setCardsPerGroup] = useState(
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4
  );
  const [isPaused, setIsPaused] = useState(false);

  // Function to group cards based on the current cardsPerGroup value
  // Function to group cards based on the current cardsPerGroup value
  const groupCards = () => {
    const groups = [];
    for (let i = 0; i < cards.length; i += cardsPerGroup) {
      groups.push(cards.slice(i, i + cardsPerGroup));
    }
    setGroupedCards(groups);
  };

  // Initial grouping and on resize update
  useEffect(() => {
    groupCards(); // Initial grouping
  }, [cardsPerGroup]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      let newCardsPerGroup = 4; // Default to 4 cards for large screens

      if (window.innerWidth < 640) {
        newCardsPerGroup = 1; // Only 1 card for small screens
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        newCardsPerGroup = 2; // 2 cards for medium screens
      }

      if (newCardsPerGroup !== cardsPerGroup) {
        setCardsPerGroup(newCardsPerGroup);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardsPerGroup]);

  useEffect(() => {
    if (isPaused) return; // Pause interval when hovering

    const bulgeInterval = setInterval(() => {
      setBulgingCard(prev => {
        const isLastCardInSlide = prev === cardsPerGroup - 1;

        if (isLastCardInSlide) {
          // Move to the next slide after the last card
          setCurrentIndex(prevIndex =>
            prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1
          );
          return 0; // Reset to first card of the next slide
        }
        return prev + 1; // Otherwise, continue to the next card
      });
    }, 2000); // Bulge interval (2 seconds)

    return () => clearInterval(bulgeInterval);
  }, [groupedCards.length, cardsPerGroup, isPaused]);

  const handleDotClick = index => {
    setCurrentIndex(index);
    setBulgingCard(0); // Reset bulging card on dot click
  };

  const handleMouseEnter = cardIndex => {
    setBulgingCard(cardIndex);
    setIsPaused(true); // Pause the interval on hover
  };

  const handleMouseLeave = () => {
    setIsPaused(false); // Resume autoplay
    setCurrentIndex(prevIndex => {
      const isLastCardInSlide = bulgingCard === cardsPerGroup - 1;

      if (isLastCardInSlide) {
        return prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex;
    });

    setBulgingCard(prevBulgingCard => {
      const isLastCardInSlide = prevBulgingCard === cardsPerGroup - 1;

      if (isLastCardInSlide) {
        return 0;
      }
      return prevBulgingCard + 1;
    });
  };

  const handleTouchStart = cardIndex => {
    setBulgingCard(cardIndex); // Mimic hover on touch devices
  };

  const dotsToRender =
    window.innerWidth < 640 ? groupedCards.slice(0, 4) : groupedCards;

  return (
    <>
      <PopUp />
      <HeaderBanner
        title="The Best Business Consulting Firm in Kerala"
        titleTwo="Your Strategic Growth Partner"
        titleThree="People's Interest, Our Interest"
        description={
          <>
            Trackpi your{' '}
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecorationColor: ' #FF9D00',
              }}
            >
              trusted business consulting firm
            </a>{' '}
            helps you turn insights into actions. Our team will design
            strategies and assists you with decision making and other challenges
            you may face resulting in streamlining your processes and increasing
            your chances of success with us.
          </>
        }
        brochure
        learn
        classname="bgOne"
        image={img1}
      />
      <section>
        <div className="text-center lg:pb-12  sm:pb-3 px-2">
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  font-bold text-[#FFC100] ">
            Real-Time Business News Updates?
          </h1>
        </div>

        <div className="relative bg-gradient-to-r from-[#FFC100] to-[#FF9D00]">
          {/* Carousel */}
          <div className="overflow-x-auto md:overflow-hidden touch-pan-x carousel-container">
            <Carousel
              interval={null} // Disable auto-scroll as we control it manually
              indicators={false}
              controls={false}
              activeIndex={currentIndex}
              onSelect={() => {}}
            >
              {groupedCards.map((group, slideIndex) => (
                <Carousel.Item key={slideIndex}>
                  <div
                    className={`grid carousel-grid ${
                      cardsPerGroup === 1
                        ? 'grid-cols-1'
                        : 'grid-cols-1 md:grid-cols-4'
                    } place-content-center gap-10 py-0 lg:px-20 px-16`}
                  >
                    {group.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className={`carousel-card flex-shrink-0 w-full h-[250px] lg:h-auto xl:h-auto 2xl:h-[490px] bg-black p-6 2xl:px-20 rounded-lg shadow-lg text-center transform transition-transform duration-500 cursor-pointer ${
                          cardIndex === bulgingCard
                            ? 'scale-110 2xl:scale-105'
                            : 'scale-95'
                        }`}
                        onMouseEnter={() => handleMouseEnter(cardIndex)}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={() => handleTouchStart(cardIndex)}
                      >
                        {/* Inner wrapper for scaling contents */}
                        <div
                          className={`transform transition-transform  duration-500 ${
                            cardIndex === bulgingCard
                              ? 'md:scale-105'
                              : 'scale-100'
                          }`}
                        >
                          <img
                            src={card.logo}
                            alt="Card_logo"
                            className={`mx-auto lg:h-auto h-[100px] transition-transform ${
                              cardIndex === bulgingCard
                                ? 'md:scale-110'
                                : 'scale-100'
                            }`}
                          />
                          <h3
                            className={`mt-0 lg:mt-4 font-bold text-[#FFC100] transition-transform ${
                              cardIndex === bulgingCard
                                ? 'md:text-xl'
                                : 'text-lg'
                            }`}
                          >
                            {card.title}
                          </h3>
                          <p
                            className={`mt-2 text-white  transition-transform ${
                              cardIndex === bulgingCard
                                ? 'md:text-base '
                                : 'text-sm'
                            }`}
                          >
                            {card.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Slide Dots */}
          <div className="absolute top-[110%] md:left-1/2 left-1/2 transform -translate-x-1/2 md:flex justify-center items-center space-x-2">
            {dotsToRender.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-yellow-500 w-4' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-right mt-4 sm:mx-2 md:mx-4 lg:mx-16   view-more-btn px-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer" // Security reason when using target="_blank"
          >
            <button className="bg-[#0A0A0A] text-white py-1 px-3 rounded-lg hover:bg-amber-400 transition duration-300 text-[14px] 2xl:text-[20px] font-trebuchet font-medium">
              View More
            </button>
          </a>
        </div>
      </section>

      <section className="w-full h-full mt-12 xl:mt-20 2xl:mt-24">
        <Row className="mt-5 text-center">
          <h1 className="text-[#FFC100] font-extrabold text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl">
            OUR CLIENTS
          </h1>
          <h4 className="fw-bold text-[#0A0A0A] text-xs md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl">
            We’re fortunate to work with the best
          </h4>
        </Row>

        {/* Client Logos Section */}
        <div
          className="flex justify-center md:mt-8 lg:mt-12 sm:mt-2 items-center bg-gradient-to-r from-[#FF9D00] via-[#FFC100] to-[#FF9D00] py-2 "
          // style={{
          //   marginTop: '3rem',
          //   overflow: 'hidden',
          //   whiteSpace: 'nowrap',
          // }}
        >
          <div className="flex animate-scroll">
            {clients.concat(clients).map((client, index) => (
              <Col xs={3} md={2} key={index}>
                <img
                  className="w-[85px] h-[50px]  lg:w-full lg:h-[85px] object-contain"
                  src={client.logo}
                  alt={`Client ${index + 1}`}
                />
              </Col>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 w-full px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto section1">
        <motion.div
          className="flex flex-col-reverse lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView1 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Text Section */}
          <div className="w-full">
            <motion.h1
              className="font-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl   pb-3 hidden lg:block "
              animate={{ y: isInView1 ? 10 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              We see the challenge
            </motion.h1>
            <motion.p
              className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              animate={{ y: isInView1 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              Occasionally, without expert advice in business operations,
              companies can run into issues such as actions that aren’t really
              necessary, poor planning, and lost potential. Such issues as
              maintaining expansion, changing with the trends, and being in
              perfect competition can sometimes become very hard. The
              opportunity to become a consultant in a company can reveal
              compliance issues or risks leading to higher expenses without
              trusted consultants in the business. At Trackpi, we are aware
              about these challenges since we are one of the most preferred
              business consultant in Kerala and handle multiple clients. We have
              &nbsp;
              <a
                href="/our-services"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecorationColor: ' #FF9D00',
                }}
              >
                expert solutions{' '}
              </a>{' '}
              that include detailed strategy planning. Looking to evolve your
              business? Why wait,{' '}
              <a
                href="/our-services"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecorationColor: ' #FF9D00',
                }}
              >
                Contact us{' '}
              </a>{' '}
              today.
            </motion.p>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <h1 className="font-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-3 text-center  block lg:hidden">
              We see the challenge
            </h1>
            <div className="homeImg">
              <motion.img
                src={home1}
                alt="Strategic Procurement"
                className="shadow-lg rounded-[15px] md:rounded-[10px] w-full h-[200px] sm:h-[350px] md:h-[390px]  lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView1 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 w-full px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto py-16 lg:py-20 bg-[#FFC100] text-black bg2 section2">
        <motion.div
          className="flex flex-col lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView2 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="w-full">
            <h1 className="font-bold text-black text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-3  block lg:hidden text-center">
              We need to shift our thinking
            </h1>
            <div className="px-10 lg:px-0 ">
              <motion.img
                src={home1}
                alt="Strategic Procurement"
                className="shadow-lg rounded-lg w-full h-[200px] sm:h-[350px] md:h-[390px]  lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView2 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <div className="w-full">
            <motion.h1
              className="font-bold text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  pb-3  hidden lg:block"
              animate={{ y: isInView2 ? 10 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              We need to shift our thinking
            </motion.h1>
            <motion.p
              className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              animate={{ y: isInView2 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              Every business has latent strengths and great potential to grab
              opportunities and contribute to growth. Succeeding in unlocking
              such potential call for innovative ideas, creative strategies.
              Businesses are not stiff structures — they are living and
              breathing ecosystems. With a capable business development
              consultant, you start looking at things differently and get out of
              the old habits. As Trackpi, we assist companies in Kerala develop
              future-ready capacities, so that they are more resilient,
              innovative and successful. Let's help you in considering a
              different way of doing things.
            </motion.p>
          </div>
        </motion.div>
      </section>
      <section className="relative z-20"></section>
      <section className=" mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 px-10 lg:px-20 xl:px-24 2xl:px-32  mx-auto w-full h-full section3">
        <motion.div
          className="flex flex-col-reverse lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView3 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="flex flex-col w-full">
            <motion.h1
              className="font-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl   text-start sm:text-center   hidden lg:block"
              animate={{ y: isInView3 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              Outdated Practices Won’t Drive Future Success
            </motion.h1>
            <motion.p
              className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  sm:mt-0 lg:mt-8 mb-3 text-justify"
              animate={{ y: isInView3 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              The 21st century is a fast changing one and adhering to old
              methods may impede your career progress. It is necessary to adopt
              new and revolutionary focused methods that fit the market today.
              At Trackpi, we develop tailor-made business ideas that will enable
              you to. We will ensure you are proactive – designing sometimes
              futuristic strategies to ensure your business is forward-looking,
              and growing. Don’t be stuck in the yesteryear patterns —
              collaborate with Trackpi and bring your full potential to light.
            </motion.p>
          </div>
          <div className="w-full  flex flex-col justify-center md:justify-end">
            <h1 className="font-bold text-[#FFC100]  text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  text-center  block lg:hidden">
              Outdated Practices Won’t Drive Future Success
            </h1>
            <div className="mt-3 w-full ">
              <motion.img
                src={home2}
                alt="Strategic Procurement"
                className="shadow-lg  rounded-[15px] md:rounded-[10px] w-full h-[200px] sm:h-[350px] md:h-[390px] lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView3 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="shadow-bottom">
        <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 flex justify-center px-6 lg:px-20 xl:px-24 2xl:px-32 mx-auto  2xl:pt-28 xl:pt-24 md:pt-20 pt-8 lg:pb-16  md:pb-12 pb-8 h-full w-full relative sm:mt-12 lg:mt-20 mb-12 bg-[#FFC100] bgSection">
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h1 className="text-black font-bold  xl:leading-tight  pb-2  text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl ">
              We're Ready to Help
            </h1>
            <p className="text-center text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-black">
              Trackpi places a premium on your success. Being one of the best
              business consultants in Karela, we recommend strategic measures
              that can enhance the growth of the business, foster efficiency,
              and allow the business to outperform competition within the
              industries.
            </p>
            <Link to="/our-services">
              <button
                className=" mt-3 bg-white no-underline text-black font-semibold  rounded-full shadow-lg hover:bg-gray-800 
                 px-8 py-2 md:px-10 md:py-3 lg:py-4   xl:py-12 2xl:px-12   
                  text-sm  md:text-lg  lg:text-xl  xl:text-xl  2xl:text-2xl 
                   transition duration-300"
              >
                Our Services
              </button>
            </Link>
          </div>
        </section>
      </div>

      <ConnectButtons />
    </>
  );
}

export default Home;
