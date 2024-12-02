import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function Header() {

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // To Show the navbar when scrolling
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

  return (
    <>

      <Navbar expand='lg' className={`navbar ${showNavbar ? "visible" : "hidden"}`} fixed="top">

        <Container fluid>

          <Navbar.Brand href=''>

            <Link to={'/'} className='flex items-center text-decoration-none'>
              <h1 className='fw-bold brandname'>
                <span className='text-yellow-500'>TRACK</span>
                <span className='text-black'>PI</span>
              </h1>
            </Link>

          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='font-bold ms-auto'>

              <Nav.Link
                as={Link}
                className='me-3'
                id='navlink'
                to='/about'
                href='#about'
              >
                ABOUT
              </Nav.Link>

              <NavDropdown title='OUR SERVICES' className='custom-dropdown me-3' id='navlink'>

                <NavDropdown
                  title='Business Consulting'
                  className='custom-dropdown me-3'
                  id='navlink'
                  drop="end"
                >

                  <NavDropdown.Item
                    href="/our-services#hiring"
                    className='me-3'
                    id='navlink'

                  >
                    {' '}
                    Hiring & Retention
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="/our-services#sales-training"
                    className='me-3'
                    id='navlink'

                  >
                    Sales Training & Strategies
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="/our-services#operations-training"
                    className='me-3'
                    id='navlink'

                  >
                    Operation Training & Strategies
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="/our-services#market-positioning"
                    className='me-3'
                    id='navlink'

                  >
                    Market Positioning & Branding
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="/our-services#procurement"
                    className='me-3'
                    id='navlink'

                  >
                    Procurement & Risk Management
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown.Item
                  href="/our-services#sales-outsourcing"
                  className="me-3"
                  id="navlink"
                >
                  Sales Outsourcing
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                as={Link}
                className='me-3'
                id='navlink'
                to='/employee-verification'
                target="_blank"
              >
                <i className="fa-solid fa-user-shield me-1"></i>
                EMPLOYEE VERIFICATION
              </Nav.Link>

              <Nav.Link as={Link} className='' id='navlink' to='/connect-us'>
                CONNECT US
              </Nav.Link>

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

    </>
  )
}

export default Header
