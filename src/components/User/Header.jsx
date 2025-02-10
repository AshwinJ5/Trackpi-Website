import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../CSS/header.css";

function Header() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 0) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleNavigation = (path, hash) => {
        setExpanded(false);
        navigate(path);
        setTimeout(() => {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Navbar
                expand="lg"
                className={`navbar px-md-2 font-bold text-base navbar-dark`}
                fixed="top"
                id="navbar"
                expanded={expanded}
                onToggle={(isExpanded) => setExpanded(isExpanded)}
            >
                <Container fluid>
                    <Navbar.Brand href="" className="ms-md-3">
                        <Link to={"/"} className="flex items-center text-decoration-none p-1">
                            <img src="src/images/trackpi_logo_one.png" alt="TrackPi Logo" />
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {location.pathname === "/" ? (
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    className={`me-2.5 ${isActive("/") ? "active" : ""}`}
                                    id="navlink"
                                    onClick={() => setExpanded(false)}
                                >
                                    HOME
                                </Nav.Link>
                            ) : null}
                            <Nav.Link
                                as={Link}
                                to="/about-trackpi"
                                className={`me-2.5 ${isActive("/about-trackpi") ? "active" : ""}`}
                                id="navlink"
                                onClick={() => setExpanded(false)}
                            >
                                ABOUT
                            </Nav.Link>

                            <NavDropdown
                                title="OUR SERVICES"
                                id="navlink"
                                className={`me-2.5 ${isActive("/business-consulting-services") ? "active" : ""}`}
                            >
                                <NavDropdown.Item
                                    onClick={() => handleNavigation("/business-consulting-services", "#sales-outsourcing")}
                                    className="me-1 dropdown-sales "
                                >
                                    Sales Outsourcing
                                </NavDropdown.Item>
                                <NavDropdown title="Business Consulting" className="custom-dropdown" drop="end">
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() => handleNavigation("/business-consulting-services", "#hiring")}
                                    >
                                        Hiring & Retention
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() => handleNavigation("/business-consulting-services", "#sales-training")}
                                    >
                                        Sales Training Strategies
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() =>
                                            handleNavigation("/business-consulting-services", "#operations-training")
                                        }
                                    >
                                        Operation Training & Strategies
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() =>
                                            handleNavigation("/business-consulting-services", "#market-positioning")
                                        }
                                    >
                                        Market Positioning & Branding
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() =>
                                            handleNavigation("/business-consulting-services", "#risk-management")
                                        }
                                    >
                                        Risk Management
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() =>
                                            handleNavigation("/business-consulting-services", "#financial-consulting")
                                        }
                                    >
                                        Financial Consulting
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() =>
                                            handleNavigation("/business-consulting-services", "#asset-management")
                                        }
                                    >
                                        Asset Management
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="me-3"
                                        onClick={() => handleNavigation("/business-consulting-services", "#it-services")}
                                    >
                                        IT Services
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>

                            <Nav.Link
                                as={Link}
                                className={`me-2.5 ${isActive("/employee-verification") ? "active" : ""}`}
                                id="navlink"
                                to="/employee-verification"
                                target="_blank"
                                onClick={() => setExpanded(false)}
                            >
                                EMPLOYEE VERIFICATION
                                <i className="fa-arrow-up-right-from-square fa-solid ms-1"></i>
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                id="navlink"
                                to="/contact-us"
                                className={`${isActive("/contact-us") ? "active" : ""}`}
                                onClick={() => setExpanded(false)}
                            >
                                CONNECT US
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
