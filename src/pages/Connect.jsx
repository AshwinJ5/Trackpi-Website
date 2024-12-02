import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


function Connect() {
  return (
    <div>
      <section className='flex justify-center items-center p-3 w-full h-screen bg1'>
        <div className='flex flex-col items-center'>
          <h1 className='text-5xl md:text-7xl hover:text-sky-500 home-text'>
            Connect With Us
          </h1>
        </div>
      </section>

      <section className='mt-32 w-full'>

        <Container className='flex flex-col items-center text-justify'>

          <Row className='mt-5 md:w-1/2'>
            <h1 className='mb-3 fw-bold display-5'>You’re ready to <br /> take the next step</h1>
            <p className='mb-5 text-xl md:text-justify md:text-lg'>We’re all wrestling with complexity. Every company, work function, and team now faces a tall order: to be more adaptive, strategic, effective, human, and equitable amidst growing uncertainty.</p>
            <Form className='flex flex-col'>
              <FloatingLabel
                controlId="floatingInput"
                label=" Name" r
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" className="bg-transparent border border-black"/>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label=" Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" className="bg-transparent border border-black" />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label=" Where Are You Located? "
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" className="bg-transparent border border-black"/>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Name Of Organization"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" className="bg-transparent border border-black"/>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="How Did You Hear About Us?"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" className="bg-transparent border border-black" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea" label="Message">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '150px' }}
                  className="bg-transparent mb-3 border border-black"
                />
              </FloatingLabel>

              <Row className='flex flex-col items-center gap-5 mt-5 mb-5'>

                <Button type='submit' className='bg-black mb- p-3 rounded-pill w-50 text-yellow-300 btn md:btn-lg'>
                  CONNECT WITH US
                </Button>

                <h6 className='text-center'>Or email hello@trackpi.com to get in touch with our team.</h6>
              </Row>

            </Form>

          </Row>

        </Container>

      </section>

    </div >
  )
}

export default Connect