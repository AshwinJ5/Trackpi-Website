import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import logo from '../../images/trackpil.png';
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import "../../CSS/JobFair/header.css";

function HeaderSection() {
    return (
        <Container fluid className="header-section mt-3 px-3 px-md-5">
            <Row className="mt-5 d-flex justify-content-between align-items-center">
                {/* Left Section */}
                <Col lg={6} md={6} className="text-md-start">
                    <h5>Join TRACKPI'S Online</h5>
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
                <Col lg={3} md={4} className="text-md-end text-center d-flex flex-column align-items-md-end align-items-center">
                    <img src={logo} alt="TrackPi Job Fair Logo" className='img-fluid logo-img' />
                    <h6 className="fw-bold">Your Strategic Growth Partner</h6>
                    <div className="contact-info">
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
    );
}

export default HeaderSection;
