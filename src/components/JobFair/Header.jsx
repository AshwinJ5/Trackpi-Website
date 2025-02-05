import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../../images/trackpil.png'
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";

import "../../CSS/JobFair/header.css";

function HeaderSection() {
    return (
        <div className='mt-3 ms-5 '>
            <Row className='mt-5'>
                <Col lg={6} >
                    <h5>Join TRACKPI'S Online</h5>
                    <h1 >JOB <span className="highlight">FAIR</span></h1>
                    <h2>Start Your Registration Process</h2>
                    <p className="description">
                        Sign up for an exclusive online job fair to recruit top
                        professionals that can advance your company's goals.
                        Register to access a variety of skilled individuals
                        ready to help your business grow.
                    </p>
                </Col>
                <Col lg={3} className="text  text-lg-start">
                    <img src={logo} alt="TrackPi Job Fair Logo" className='img-fluid logo-img' />
                    <h6 className="fw-bold">Your Strategic Growth Partner</h6>
                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
                        <p className="mb-1 d-flex align-items-center gap-1">
                            <IoCallOutline /> <span>+91 8078179646</span>
                        </p>
                        <p className="mb-0 d-flex align-items-center gap-1">
                            <IoMailOutline /> <span>operations@trackpi.in</span>
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderSection;
