import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import HeaderSection from "../../components/JobFair/Header";
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

  return (
    <>
      <HeaderSection />
      <div className="container mt-4 my-5">
        <form className="form-container shadow-lg">
          <h3 className="text-center mb-4 fw-bold">Company Information</h3>
          <div>
            <div className="mb-3">
              <label>
                Company Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                className="form-control"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>
                Industry/Domain Name <span className="text-danger">*</span>
              </label>
              <select name="industry" value={formData.industry} onChange={handleChange} className="form-select">
                <option value="">Select Industry</option>
                <option>Healthcare & Pharmaceuticals</option>
                <option>Information Technology (IT) & Services</option>
                <option>Financial Services</option>
                <option>Education & E-Learning</option>
                <option>Manufacturing & Engineering</option>
                <option>Retail & E-commerce</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Company Website</label>
              <input
                type="text"
                name="website"
                className="form-control"
                placeholder="www.yourcompany.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <label>Company Location</label>
            <Row className="g-2">
              <Col xs={12} md={6} lg={3}>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  placeholder="Zip Code"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <input type="text" name="country" className="form-control" placeholder="Country" value={formData.country} readOnly />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <input type="text" name="state" placeholder="State" className="form-control" value={formData.state} readOnly />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <input type="text" name="city" placeholder="City" className="form-control" value={formData.city} readOnly />
              </Col>
            </Row>

            <div className="mb-3 mt-3">
              <label>
                Company Size <span className="text-danger">*</span>
              </label>
              <select name="companySize" className="form-select" value={formData.companySize} onChange={handleChange}>
                <option value="">Select Company Size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>101-500 employees</option>
                <option>1,001-5,000 employees</option>
                <option>5,001-10,000 employees</option>
                <option>10,000+ employees</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning w-100 w-md-50 fw-bold">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobFairReg;
