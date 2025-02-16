import React, { useState, useEffect } from "react";
import "../../CSS/ourTeam.css";
import baseURL from "../../Api Services/baseURL";


function Clients() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [cardsPerSlide, setCardsPerSlide] = useState(3);
    const [partners, setPartners] = useState([]);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
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
        const updateCardsPerSlide = () => {
            let newCardsPerSlide;
            if (window.innerWidth < 410) {
                newCardsPerSlide = 1;
            } else if (window.innerWidth < 746) {
                newCardsPerSlide = 1;
            } else if (window.innerWidth < 1024) {
                newCardsPerSlide = 2;
            } else {
                newCardsPerSlide = 3;
            }
            if (newCardsPerSlide !== cardsPerSlide) {
                setCardsPerSlide(newCardsPerSlide);
                setCurrentIndex(0);
            }
        };

        updateCardsPerSlide();
        window.addEventListener("resize", updateCardsPerSlide);
        return () => window.removeEventListener("resize", updateCardsPerSlide);
    }, [cardsPerSlide]);
    useEffect(() => {
        setCurrentIndex(0);
    }, [cardsPerSlide]);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered, totalSlides]);
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }

        if (touchEndX - touchStartX > 50) {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
        }
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const getPartnerSlides = () => {
        const slides = [];
        let tempCards = [...partners];

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
            className="clients-carousel w-full "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex  transition-transform duration-500 med11"
                style={{
                    transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
                    width: `${totalSlides * 100}%`,
                }}
            >
                {getPartnerSlides().map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        className="med  slide slide-1 flex justify-center items-center p-6 md:p-1"
                        style={{
                            flex: `0 0 ${100 / totalSlides}%`,
                            display: "flex",
                            justifyContent: "center",
                            gap: "0 20px",
                        }}
                    >
                        {slide.map((partner, index) => (
                            <div
                                key={partner._id || index}
                                className="card-cl flex flex-col  flex-shrink items-center justify-center gap-2 p-4 rounded-lg "
                                style={{
                                    marginRight: index === slide.length - 1 ? "" : "25px",
                                    width: "100%",
                                    maxWidth: "380px",
                                    margin: "0 10px",
                                }}
                            >
                                <div className="bg-[#fff]  w-[60%] 2xl:w-[60%] lg:aspect-[2/.9] aspect-[2/.7] flex items-center">
                                    <img
                                        src={`${import.meta.env.VITE_SERVER_URL}${partner.companylogo}`}
                                        alt={partner.companyname}
                                        className="logo m-auto "
                                    />
                                </div>
                                <h3 className="company-name">{partner.companyname}</h3>
                                <p className="description text-justify">
                                    {partner.description.length > 150
                                        ? `${partner.description.substring(0, 150)}...`
                                        : partner.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-center CardsDots ">
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
