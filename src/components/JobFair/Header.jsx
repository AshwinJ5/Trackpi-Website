import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../../images/trackpil.png';
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import "../../CSS/JobFair/header.css";

function HeaderSection() {
    return (
        <div className='mt-3 px-3 px-md-5'>
            <Row className='mt-5 align-items-center text-center text-md-start'>
                <Col lg={6} >
                    <h5 className='fw-bold'>Join TRACKPI'S Online</h5>
                    <h1 className='fw-bold display-1 t1'>
                        JOB <span className="highlight">FAIR</span>
                    </h1>
                    <h2 className='fw-bold t2'>Start Your Registration Process</h2>
                    <p className="description">
                        Sign up for an exclusive online job fair to recruit top
                        professionals that can advance your company's goals.
                        Register to access a variety of skilled individuals
                        ready to help your business grow.
                    </p>
                </Col>
                <Col lg={6} className="d-flex flex-column align-items-center text-md-start mt-4 mt-md-0">
                    <img src={logo} alt="TrackPi Job Fair Logo" className='img-fluid logo-img' />
                    <h6 className="fw-bold text-center mt-2">Your Strategic Growth Partner</h6>
                    <div className="contact-info d-flex flex-column flex-md-row align-items-center gap-2">
                        <p className="mb-1 d-flex align-items-center gap-2 fw-bold">
                            <IoCallOutline /> <span>+91 8078179646</span>
                        </p>
                        <p className="mb-0 d-flex align-items-center gap-2 fw-bold">
                            <IoMailOutline /> <span>operations@trackpi.in</span>
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderSection;
