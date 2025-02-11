import React, { useState } from "react";
import HeaderSection from "../../components/JobFair/Header";
import { useNavigate } from "react-router-dom";
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

  const nav = useNavigate()

  const handleNext=()=>{
    nav('/job-fair/user')
  }

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
    <div className="cnt">
      <HeaderSection />
      <div className="form-container mt-4">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Company Information</h3>

          <div className="form-group">
            <label>Company Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="companyName"
              className="custom-Input"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            
            />
          </div>

          <div className="form-group">
            <label>Industry/Domain Name <span className="text-danger">*</span></label>
            <select name="industry" className="custom-Select" value={formData.industry} onChange={handleChange}>
              <option value="">Select Industry</option>
              <option>Healthcare & Pharmaceuticals</option>
              <option>Information Technology (IT) & Services</option>
              <option>Financial Services</option>
              <option>Education & E-Learning</option>
              <option>Manufacturing & Engineering</option>
              <option>Retail & E-commerce</option>
            </select>
          </div>

          <div className="form-group">
            <label>Company Website</label>
            <input
              type="text"
              name="website"
              className="custom-Input"
              placeholder="www.yourcompany.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Company Size <span className="text-danger">*</span></label>
            <select name="companySize" className="custom-Select" value={formData.companySize} onChange={handleChange}>
              <option value="">Select Company Size</option>
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>101-500 employees</option>
              <option>1,001-5,000 employees</option>
              <option>5,001-10,000 employees</option>
              <option>10,000+ employees</option>
            </select>
          </div>

          <label>Company Location</label>
          <div className="location-grid">
            <input
              type="text"
              name="pincode"
              className="custom-Input"
              placeholder="Zip Code"
              value={formData.pincode}
              onChange={handleChange}
            />
            <input type="text" name="country" className="custom-Input" placeholder="Country" value={formData.country}  />
            <input type="text" name="state" className="custom-Input" placeholder="State" value={formData.state}  />
            <input type="text" name="city" className="custom-Input" placeholder="City" value={formData.city}  />
          </div>

          <div className="button-container mt-3">
            <button type="submit" className="bt" onClick={handleNext}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobFairReg;
