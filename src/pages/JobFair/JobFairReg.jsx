import React, { useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import "./jobfair.css";

function JobFairReg() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    companySize: "",
  });

  // Function to fetch city & state based on pincode
  const fetchLocationDetails = async (pin) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        setFormData((prev) => ({
          ...prev,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
      } else {
        setFormData((prev) => ({ ...prev, city: "", state: "" }));
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      fetchLocationDetails(value);
    }
  };

  return (
    <div className="mt-4 back mx-5">
      <Card className="p-4 shadow-lg">
        <h3 className="text-center mb-4 fw-bold">Company Information</h3>
        <Form className="fr">
          <Form.Group className="mb-3">
            <Form.Label>
              Company Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="companyName"
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
              <option>Select</option>
              <option>Healthcare & Pharmaceuticals</option>
              <option>Information Technology(IT) & Services</option>
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
              placeholder="www.yourcompany.com"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Label>Company Location</Form.Label>
          <Row className="g-2">
            <Col md={6} lg={3}>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Zip Code"
                value={formData.pincode}
                onChange={handleChange}
              />
            </Col>
            <Col md={6} lg={3}>
              <Form.Control type="text" name="country" placeholder="Country" value={formData.country} readOnly />
            </Col>
            <Col md={6} lg={3}>
              <Form.Control type="text" name="state" placeholder="State" value={formData.state} readOnly />
            </Col>
            <Col md={6} lg={3}>
              <Form.Control type="text" name="city" placeholder="City" value={formData.city} readOnly />
            </Col>
          </Row>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>
              Company Size <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select name="companySize" value={formData.companySize} onChange={handleChange}>
              <option>Number of employees</option>
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>101-500 employees</option>
              <option>1,001-5000 employees</option>
              <option>5,001-10,000 employees</option>
              <option>10,000+ employees</option>
            </Form.Select>
          </Form.Group>

          <Button variant="warning" className="w-100 fw-bold">
            Next
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default JobFairReg;
