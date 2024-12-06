
import React from 'react'
import Details from '../components/Form';
import { Container, Row} from 'react-bootstrap';

function Connect() {
  return (
    <div>
      <section className="flex justify-center items-center p-3 w-full h-screen connect_section bg1 relative">
        <div className="flex flex-col items-center z-10">
          <h1 className="text-5xl md:text-7xl working_heading mb-5">
            Connect with us
          </h1>
          <p className="font-semibold text-md md:text-2xl working_subheading text-center">
            Reach out to us for any inquiries or support — we are here to help.
          </p>
        </div>
      </section>
      <div className='aa'>
            
               
          <p>
            <i className="fa-solid fa-location-dot me-2"></i> Kakkanad, Kochi, India
          </p>
          &nbsp;
          <p>
            <i className="fa-solid fa-phone me-2"></i> +91 8078179646
          </p>
          &nbsp;
          <p>
            <i className="fa-solid fa-envelope me-2"></i> trackpi@gmail.com
          </p>
        </div>
      <section className="mt-32 w-full">
        <Container className="flex flex-col items-center text-justify">
          <Row className="mt-5 md:w-1/2">
              <h1 className="mb-3 fw-bold display-5">
                You’re ready to <br /> take the next step
              </h1>
              <p className="mb-5 text-xl md:text-justify md:text-lg">
                We’re all wrestling with complexity. Every company, work function,
                and team now faces a tall order: to be more adaptive, strategic,
                effective, human, and equitable amidst growing uncertainty.
              </p>
              <Details/>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Connect;
