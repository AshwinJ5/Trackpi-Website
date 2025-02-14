// Created by Shalu
import React, { useState, useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "../../components/User/UseInView";
import { Link } from "react-router-dom";
import ConnectButtons from "../../components/ConnectButtons";
import { Carousel } from "react-bootstrap";
import HeaderBanner from "../../components/User/HeaderBanner";
import "../../CSS/User/Home.css";
import PopUp from "../../components/User/PopUp";
import Marquee from "react-fast-marquee";
import baseURL from "../../Api Services/baseURL";

import { useSwipeable } from "react-swipeable";

function Home() {
  const isInView1 = useInView({ selector: ".section1" });
  const isInView2 = useInView({ selector: ".section2" });
  const isInView3 = useInView({ selector: ".section33" });
  const [heading, setHeading] = useState({});

  const [cards, setCards] = useState([]);
  const [clientsLogo, setClientsLogo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bulgingCard, setBulgingCard] = useState(0);
  const [groupedCards, setGroupedCards] = useState([]);
  const [cardsPerGroup, setCardsPerGroup] = useState(
    window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setGroupedCards(() => {
      const groups = [];
      for (let i = 0; i < cards.length; i += cardsPerGroup) {
        groups.push(cards.slice(i, i + cardsPerGroup));
      }
      return groups;
    });
  }, [cards, cardsPerGroup]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      let newCardsPerGroup = 4;

      if (window.innerWidth < 640) {
        newCardsPerGroup = 2;
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        newCardsPerGroup = 3;
      }

      if (newCardsPerGroup !== cardsPerGroup) {
        setCardsPerGroup(newCardsPerGroup);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardsPerGroup]);

  useEffect(() => {
    if (isPaused) return; // Pause interval when hovering

    const bulgeInterval = setInterval(() => {
      setBulgingCard((prev) => {
        const isLastCardInSlide = prev === cardsPerGroup - 1;

        if (isLastCardInSlide) {
          // Move to the next slide after the last card
          setCurrentIndex((prevIndex) =>
            prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1
          );
          return 0; // Reset to first card of the next slide
        }
        return prev + 1; // Otherwise, continue to the next card
      });
    }, 2000); // Bulge interval (2 seconds)

    return () => clearInterval(bulgeInterval);
  }, [groupedCards.length, cardsPerGroup, isPaused]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setBulgingCard(0); // Reset bulging card on dot click
  };

  const handleMouseEnter = (cardIndex) => {
    setBulgingCard(cardIndex);
    setIsPaused(true); // Pause the interval on hover
  };

  const handleMouseLeave = () => {
    setIsPaused(false); // Resume autoplay
    setCurrentIndex((prevIndex) => {
      const isLastCardInSlide = bulgingCard === cardsPerGroup - 1;

      if (isLastCardInSlide) {
        return prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex;
    });

    setBulgingCard((prevBulgingCard) => {
      const isLastCardInSlide = prevBulgingCard === cardsPerGroup - 1;

      if (isLastCardInSlide) {
        return 0;
      }
      return prevBulgingCard + 1;
    });
  };

  const handleTouchStart = (cardIndex) => {
    setBulgingCard(cardIndex); // Mimic hover on touch devices
  };

  const dotsToRender =
    window.innerWidth < 640 ? groupedCards.slice(0, 6) : groupedCards;

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await baseURL.get("api/news/newsdetails");
        const sortedCards = response.data
          .filter((card) => card.updatedAt) // Exclude cards without `updatedAt`
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort descending
          .slice(0, 12); // Take the latest 12 items
        setCards(sortedCards);
      } catch (e) {
        console.error(e);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await baseURL.get("api/partner/getpartner");
        setClientsLogo(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getClients();
  }, []);
  useEffect(() => {
    getAllHeadings();
  }, []);

  const getAllHeadings = async () => {
    try {
      const response = await baseURL.get(
        "/api/headingfornewspatnership/getallheading"
      );
      if (response.data && response.data.length > 0) {
        setHeading(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching haeding data:", error);
    }
  };

  const handleSwipe = (direction) => {
    if (direction === "LEFT" && currentIndex < groupedCards.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next slide
    } else if (direction === "RIGHT" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous slide
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true, // Allows swipe handling on desktop with a mouse
  });

  return (
    <>
      <PopUp />
      <HeaderBanner
        title="The Best Business Consulting Firm in Kerala"
        titleTwo="Your Strategic Growth Partner"
        titleThree="People's Interest, Our Interest"
        class123="headerbannerCenterContent"
        description={
          <>
            Trackpi, your
            <a
              href="/about-trackpi"
              className=" mx-[5px] lg:mx-[7px]"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FF9D00",
                fontWeight: "regular",
                textDecoration: "none",
              }}
            >
              trusted business consulting firm,
            </a>
            helps you turn insights into actions. Our team will design
            strategies and assist you with decision-making and other challenges
            you may face, resulting in streamlining your processes and
            increasing your chances of success with us.
          </>
        }
        brochure
        learn
        classname="bgOne"
      />
      <section>
        <div className="text-center lg:pb-12  sm:pb-3 px-2">
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  font-bold text-[#FFC100] ">
            {heading.newsHeading}
          </h1>
        </div>
        <div className="relative bg-gradient-to-r from-[#FFC100] to-[#FF9D00]">
          {groupedCards.length > 0 ? (
            <div
              {...swipeHandlers}
              className="overflow-x-auto md:overflow-hidden touch-pan-x carousel-container"
            >
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
                          ? "grid-cols-1"
                          : "grid-cols-1 md:grid-cols-4"
                      } place-content-center gap-10   lg:px-20 `}
                    >
                      {group.map((card, cardIndex) => (
                        <div
                          key={cardIndex}
                          className={`carousel-card flex-shrink-0 w-full rounded-lg  text-center transform transition-transform duration-500 cursor-pointer ${
                            cardIndex === bulgingCard
                              ? "scale-105 sm:scale-125 md:scale-110 lg:scale-110 xl:scale-110 2xl:scale-105"
                              : "scale-95 2xl:scale-90"
                          }`}
                          onMouseEnter={() => handleMouseEnter(cardIndex)}
                          onMouseLeave={handleMouseLeave}
                          onTouchStart={() => handleTouchStart(cardIndex)}
                        >
                          {/* Inner wrapper for scaling contents */}
                          <div
                            className={`transform transition-transform  duration-500 imgDiv ${
                              cardIndex === bulgingCard
                                ? "md:scale-105"
                                : "scale-100"
                            }`}
                          >
                            <a
                              href={card.newsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`${import.meta.env.VITE_SERVER_URL}${
                                  card.newsFile
                                }`}
                                alt={`News ${card.id}`}
                                className="w-full h-full rounded-lg"
                              />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          ) : (
            <p className="text-gray-500 text-center mx-6">No News available</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className=" mt-4 sm:mx-0 md:mx-4 lg:mx-16  invisible">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer" // Security reason when using target="_blank"
            >
              <button className="bg-[#0A0A0A] text-white   rounded-lg hover:bg-amber-400 transition duration-300 text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-trebuchet font-medium">
                View More
              </button>
            </a>
          </div>{" "}
          {/* For Desktop (dots) */}
          <div className="mt-4 sm:mx-2 md:mx-4 lg:mx-16 md:flex justify-center items-center space-x-1 md:space-x-2  dotsMob">
            {dotsToRender.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300  ${
                  currentIndex === index ? "bg-yellow-500 w-4" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          <div className=" mt-4 sm:mx-2 md:mx-4 lg:mx-16 px-2">
            <a
              href="https://www.instagram.com/business_flash_news?igsh=eng2anQ4bjNmY3l4"
              target="_blank"
              rel="noopener noreferrer" // Security reason when using target="_blank"
            >
              <button className="bg-[#0A0A0A] text-white py-0.5 px-2 sm:py-0.5 sm:px-2 md:py-1 md px-2.5 lg:py-1 lg:px-3  rounded-lg hover:bg-amber-400 transition duration-300 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-trebuchet font-medium">
                View More
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full h-full mt-6 xl:mt-20 2xl:mt-24">
        <Row className="mt-3 text-center">
          <h1 className="text-[#FFC100] font-extrabold text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl">
            {heading.partnershipHeading}
          </h1>
          <h4 className="fw-semibold text-[#0A0A0A] text-xs md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl">
            {heading.partnershipSubHeading}
          </h4>
        </Row>

        {/* Client Logos Section */}
        <div className=" h-[50px] sm:h-[60px] md:h-[80px] lg:h-[120px] xl:h-[120px]  items-center flex bg-gradient-to-r from-[#FFC100] to-[#FF9D00] py-3 lg:mt-[40px] md:mt-[20px] sm:mt-[30px] mt-[10px]">
          <Marquee autoFill>
            {clientsLogo.length > 0 ? (
              clientsLogo.map((images, index) => (
                <div
                  key={index}
                  className="w-[80px] bg-[#FFFFFF63] sm:w-[110px] md:w-[140px] lg:w-[180px]  h-[34px] sm:h-[40px] md:h-[50px] lg:h-[80px] sm:mx-[12px] md:mx-[18px] lg:mx-[21px] xl:mx-[25px] mx-[7.5px]"
                >
                  <img
                    className=" h-full  mx-auto"
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      images.companylogo
                    }`}
                    alt={`Client ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mx-6">
                No clients available
              </p>
            )}
          </Marquee>
        </div>
      </section>

      <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-24 2xl:mt-28 w-full px-6  md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto section1">
        <motion.div
          className="flex flex-col-reverse lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView1 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Text Section */}
          <div className="w-full">
            <motion.h1
              className="font-bold   text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl   pb-3 hidden lg:block "
              animate={{ y: isInView1 ? 10 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              We See the Challenge
            </motion.h1>
            <motion.p
              className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              animate={{ y: isInView1 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Running a business without expert guidance can lead to unnecessary
              actions, poor planning, and missed opportunities. Challenges like
              maintaining growth, adapting to market trends, and staying
              competitive can quickly become overwhelming. Without trusted
              business consultants in Kerala, companies may face compliance
              risks and higher costs, hindering their potential for success.
              <br />
              At Trackpi, the leading business consulting firm in Kerala, we
              specialize in addressing these challenges head-on. Our expert
              business management consultants provide detailed strategy planning
              and innovative solutions to help businesses thrive. <br />
              Ready to unlock your business’s true potential? Don’t wait—
              <a
                href="/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#FF9D00",
                  fontWeight: "regular",
                  textDecoration: "none",
                }}
              >
                contact{" "}
              </a>{" "}
              Trackpi today for a brighter, more successful future.
            </motion.p>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <h1 className="font-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-3 text-center  block lg:hidden">
              We See the Challenge
            </h1>
            <div className="flex-justify-center imgMob">
              <motion.img
                src="/assets/images/business-consulting-firm-businessman-boxing-gloves.jpg"
                alt="Strategic Procurement"
                className="shadow-lg rounded-[15px] md:rounded-[10px] w-full  h-[180px] sm:h-[300px] md:h-[390px]  lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView1 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 w-full px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32 mx-auto py-16 lg:py-20 bg-[#FFC100] text-black bg2 section2">
        <motion.div
          className="flex flex-col lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView2 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full">
            <h1 className="font-bold   text-black text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl pb-3  block lg:hidden text-center">
              We Need to Shift Our Thinking
            </h1>
            <div className="px-10 lg:px-0 ">
              <motion.img
                src="/assets/images/business-consultants-kerala-strategy-chess-game.jpg"
                alt="Strategic Procurement"
                className="shadow-lg rounded-lg w-full h-[180px] sm:h-[300px] md:h-[390px]  lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView2 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div className="w-full">
            <motion.h1
              className="font-bold text-lg   md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  pb-3  hidden lg:block "
              animate={{ y: isInView2 ? 10 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              We Need to Shift Our Thinking
            </motion.h1>
            <motion.p
              className="text-justify text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-[#0A0A0A]"
              animate={{ y: isInView2 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Every business has secret strengths just waiting to shine. To
              truly grow and succeed, companies must embrace innovative ideas
              and creative strategies. Businesses are always changing and
              growing, finding new ways to improve and succeed. With the
              guidance of a trusted business consultant in Kerala, you can break
              free from outdated habits and discover new opportunities for
              growth. <br />
              At Trackpi, the leading business consulting firm in Kerala, we
              help businesses build future-ready capabilities. Our expert
              consultants deliver strategies that empower companies to become
              more resilient, innovative, and successful in today’s competitive
              market. <br /> It’s time to see your business in a new light. Let
              Trackpi show you a different way forward.
            </motion.p>
          </div>
        </motion.div>
      </section>
      <section className="relative z-20"></section>
      <section className=" mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-32  mx-auto w-full h-full section33">
        <motion.div
          className="flex flex-col-reverse lg:flex-row gap-[1rem] sm:gap-4 md:gap-8 lg:gap-20 xl:gap-20 2xl:gap-32 items-center"
          animate={{ y: isInView3 ? 10 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col w-full">
            <motion.h1
              className="font-bold text-[#FFC100] text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl   text-start sm:text-center   hidden lg:block"
              animate={{ y: isInView3 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Outdated Practices Won’t Drive Future Success
            </motion.h1>
            <motion.p
              className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  sm:mt-0 lg:mt-8 mb-3 text-justify"
              animate={{ y: isInView3 ? 5 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              The business landscape is evolving rapidly, and relying on
              outdated methods can hold your company back. To stay ahead in
              today’s competitive market, businesses need forward-thinking
              strategies that align with current trends and future demands.
              <br /> At Trackpi, the No. 1 business consulting firm in Kerala,
              we specialize in crafting innovative, tailor-made strategies that
              drive growth and position businesses for long-term success. Our
              expert consultants ensure your business is proactive and prepared
              for the challenges of tomorrow, enabling you to outperform the
              competition.
              <br /> Don’t let old practices hinder your success. Partner with
              Trackpi and discover the transformative potential of modern,
              market-driven strategies.
            </motion.p>
          </div>
          <div className="w-full  flex flex-col justify-center md:justify-end">
            <h1 className="font-bold text-[#FFC100]  text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl  text-center  block lg:hidden">
              Outdated Practices Won’t Drive Future Success
            </h1>
            <div className="mt-3 w-full imgMob">
              <motion.img
                src="/assets/images/business-consultant-kerala-businesswoman-data-trends.jpg"
                alt="Strategic Procurement"
                className="shadow-lg  rounded-[15px] md:rounded-[10px] w-full h-[180px] sm:h-[300px] md:h-[390px] lg:h-[390px] 2xl:h-[600px] object-cover"
                animate={{ scale: isInView3 ? 1.02 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="shadow-bottom">
        <section className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 xl:mt-28 2xl:mt-28 flex justify-center px-6 lg:px-20 xl:px-24 2xl:px-32 mx-auto  2xl:pt-28 xl:pt-24 md:pt-20 pt-8 lg:pb-16  md:pb-12 pb-8 h-full w-full relative sm:mt-12 lg:mt-20  bg-[#FFC100] bgSectionsOne bgSections">
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h1 className="text-black font-bold  xl:leading-tight   text-lg md:text-3xl lg:text-4xl xl:text-[subHeading] 2xl:text-5xl ">
              We're Ready to Help
            </h1>
            <p className="text-center text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[26px] xl:leading-7 2xl:leading-10  text-black">
              Trackpi places a premium on your success. As one of the top
              business consultants in Kerala, we recommend strategic measures
              that enhance growth, foster efficiency, and help your business
              outperform the competition.
            </p>
            <Link to="/business-consulting-services">
              <button
                className=" bg-white no-underline text-black font-semibold  rounded-full shadow-lg hover:bg-gray-800 
                 px-8 py-2 md:px-10 md:py-3 lg:py-4   xl:py-12 2xl:px-12   
                  text-[12px]  md:text-lg  lg:text-xl  xl:text-xl  2xl:text-2xl 
                   transition duration-300 serviceHomeBtn"
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
