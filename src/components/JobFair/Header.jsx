import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import logo from '../../images/trackpil.png';
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import "../../CSS/JobFair/header.css";

function HeaderSection() {
    return (
        <>
            <div className="mobile-header d-md-none d-flex justify-content-between">
                <img src={logo} alt="TrackPi Job Fair Logo" className="mobile-logo-img" />
                <div className="mobile-header-content">
                    <h6 className="mobile-partner-text fw-bold">Your Strategic Growth Partner</h6>
                    <div className="contact-info d-flex">
                        <p className="mb-1 d-flex mobile-partner-text align-items-center gap-1 justify-content-md-end justify-content-center">
                            <IoCallOutline /> <span className='mobile-partner-text me-1'>+91 8078179646</span>
                        </p>
                        <p className="mb-0 d-flex mobile-partner-text align-items-center gap-1 justify-content-md-end justify-content-center">
                            <IoMailOutline /> <span className='mobile-partner-text'>operations@trackpi.in</span>
                        </p>
                    </div>
                </div>
            </div>
            <Container fluid className="header-section  px-3 px-md-5">
                <Row className="mt-5 d-flex justify-content-between align-items-center">
                    {/* Left Section */}
                    <Col lg={6} md={6} className="text-md-start">
                        <h5 className='t1 text'>Join TRACKPI'S Online</h5>
                        <h1 className='t2'>JOB <span className="highlight">FAIR</span></h1>
                        <h2 className="t3">Start Your Registration Process</h2>
                        <p className="description">
                            Sign up for an exclusive online job fair to recruit top
                            professionals that can advance your company's goals.
                            Register to access a variety of skilled individuals
                            ready to help your business grow.
                        </p>
                    </Col>

                    {/* Right Section */}
                    <Col lg={3} md={4} className="text-md-end text-center d-none d-md-flex flex-column align-items-md-end align-items-center desktop-header">
                        <img src={logo} alt="TrackPi Job Fair Logo" className='desktop-logo img-fluid' />
                        <h6 className="fw-bold">Your Strategic Growth Partner</h6>
                        <div className="contact-info ">
                            <p className="mb-1 d-flex align-items-center gap-1 justify-content-md-end justify-content-center">
                                <IoCallOutline /> <span>+91 8078179646</span>
                            </p>
                            <p className="mb-0 d-flex align-items-center gap-1 justify-content-md-end justify-content-center">
                                <IoMailOutline /> <span>operations@trackpi.in</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HeaderSection;
