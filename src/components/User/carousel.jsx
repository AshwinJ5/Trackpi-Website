import React, { useState, useEffect } from "react";
import "../../CSS/ourTeam.css";
import baseURL from "../../Api Services/baseURL";
import { SERVER_URL } from "../../Api Services/serverUrl";

function Clients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [partners, setPartners] = useState([]);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    // Fetch partners from the backend
    const fetchPartners = async () => {
      try {
        const response = await baseURL.get("/api/partner/getpartner", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (response.data && Array.isArray(response.data)) {
          setPartners(response.data);
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, [adminToken]);

  const totalSlides = Math.ceil(partners.length / cardsPerSlide);

  useEffect(() => {
    // Adjust cards per slide dynamically based on screen size
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 746) {
        setCardsPerSlide(1); // Single card for small screens
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); // Two cards for medium screens
      } else {
        setCardsPerSlide(3); // Three cards for large screens
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Helper function to handle pairs of cards in slides
  const getPartnerSlides = () => {
    const slides = [];
    let tempCards = [...partners];
    
    // For the medium screens, we pair the odd cards with the next slide
    if (cardsPerSlide === 2) {
      while (tempCards.length) {
        const pair = tempCards.splice(0, 2);
        slides.push(pair);
      }
    } else {
      while (tempCards.length) {
        const group = tempCards.splice(0, cardsPerSlide);
        slides.push(group);
      }
    }

    return slides;
  };

  return (
    <section
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
          width: `${totalSlides * 100}%`,
        }}
      >
        {getPartnerSlides().map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className="med flex justify-center items-center"
            style={{
              flex: `0 0 ${100 / totalSlides}%`,
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {slide.map((partner, index) => (
              <div
                key={partner._id || index}
                className="card-cl flex flex-col flex-shrink items-center justify-center gap-2 p-6 rounded-lg shadow-lg"
                style={{
                  marginRight: index === slide.length - 1 ? "" : "20px", // No gap after last card
                  width: "410px", // Card width
                }}
              >
                <img
                  src={`${SERVER_URL}${partner.companylogo}`}
                  alt={partner.companyname}
                  className="logo"
                />
                <h3 className="company-name">{partner.companyname}</h3>
                <p className="description text-justify">{partner.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`dot ${currentIndex === index ? "active-dot" : "inactive-dot"}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Clients;
