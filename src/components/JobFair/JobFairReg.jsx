import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import HeaderSection from "./Header";
import "../../CSS/JobFair/jobfairreg.css";

function JobFairReg() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    pincode: "",
    country: "India",
    state: "",
    city: "",
    companySize: "",
  });

  const fetchLocationDetails = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        setFormData((prev) => ({
          ...prev,
          city: data[0].PostOffice[0].District || "Unknown",
          state: data[0].PostOffice[0].State || "Unknown",
        }));
      } else {
        setFormData((prev) => ({ ...prev, city: "Invalid Pincode", state: "Invalid Pincode" }));
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));

    if (name === "pincode" && value.length === 6) {
      fetchLocationDetails(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add form submission logic here
  };

  return (
    <>
    <div className="cnt">

         <HeaderSection />
        <Container className="mt-4 my-5 ">
          <Form className="form-container shadow-lg p-4" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4 fw-bold title">Company Information</h3>

            <Form.Group className="mb-3">
              <Form.Label>
                Company Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                  className="custom-input"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Industry/Domain Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="industry" value={formData.industry} onChange={handleChange}>
                <option value="">Select Industry</option>
                <option>Healthcare & Pharmaceuticals</option>
                <option>Information Technology (IT) & Services</option>
                <option>Financial Services</option>
                <option>Education & E-Learning</option>
                <option>Manufacturing & Engineering</option>
                <option>Retail & E-commerce</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                  className="custom-input"
                placeholder="www.yourcompany.com"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
              <Form.Label>
                Company Size <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="companySize" value={formData.companySize} onChange={handleChange}>
                <option value="">Select Company Size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>101-500 employees</option>
                <option>1,001-5,000 employees</option>
                <option>5,001-10,000 employees</option>
                <option>10,000+ employees</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Company Location</Form.Label>
            <Row className="g-2">
              <Col xs={12} md={6} lg={3}>
                <Form.Control
                  type="text"
                  name="pincode"
                    className="custom-input"
                  placeholder="Zip Code"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <Form.Control
                  className="custom-input" type="text" name="country" placeholder="Country" value={formData.country} readOnly />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <Form.Control type="text" name="state" placeholder="State" value={formData.state} readOnly />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <Form.Control type="text" name="city" placeholder="City" value={formData.city} readOnly />
              </Col>
            </Row>

            

            <div className="d-flex justify-content-center">
              <Button type="submit" variant="warning" className="mt-4 w-100 w-md-50 fw-bold bt">
                Next
              </Button>
            </div>
          </Form>
        </Container>
        </div>
   
    </>
  );
}

export default JobFairReg;
