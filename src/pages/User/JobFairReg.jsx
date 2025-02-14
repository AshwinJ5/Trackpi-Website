import React, { useState } from "react";
import HeaderSection from "../../components/JobFair/Header";
import { useNavigate } from "react-router-dom";
import { registerCompany } from "../../Api Services/jobfairApi";
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

  const [errors, setErrors] = useState({});
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.companyName) tempErrors.companyName = "Company name is required";
    if (!formData.industry) tempErrors.industry = "Industry is required";
    if (!formData.companySize) tempErrors.companySize = "Company size is required";
    if (!formData.pincode) tempErrors.pincode = "Pincode is required";
    if (formData.pincode.length !== 6) tempErrors.pincode = "Pincode must be 6 digits";
    if (!isPincodeValid) tempErrors.pincode = "Invalid pincode";
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      tempErrors.website = "Invalid website URL";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const fetchLocationDetails = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data?.[0]?.Status === "Success" && data[0]?.PostOffice?.length) {
        setFormData((prev) => ({
          ...prev,
          city: data[0].PostOffice[0]?.District || "Unknown",
          state: data[0].PostOffice[0]?.State || "Unknown",
        }));
        setIsPincodeValid(true);
      } else {
        setFormData((prev) => ({ ...prev, city: "Invalid Pincode", state: "Invalid Pincode" }));
        setIsPincodeValid(false);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setIsPincodeValid(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pincode" && value.length === 6) {
      fetchLocationDetails(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerCompany(formData);
      console.log("Form submitted:", response.data);
      navigate("/job-fair/user");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  return (
    <div className="cnt">
      <HeaderSection />
      <div className="form-container mt-4">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Company Information</h3>

          <div className="form-group">
            <label>
              Company Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              className="custom-Input"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <span className="error-text">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label>
              Industry/Domain Name <span className="text-danger">*</span>
            </label>
            <select name="industry" className="custom-Select" value={formData.industry} onChange={handleChange}>
              <option value="">Select Industry</option>
              {[
                "Healthcare & Pharmaceuticals",
                "Information Technology (IT) & Services",
                "Financial Services",
                "Education & E-Learning",
                "Manufacturing & Engineering",
                "Retail & E-commerce",
              ].map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && <span className="error-text">{errors.industry}</span>}
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
            {errors.website && <span className="error-text">{errors.website}</span>}
          </div>

          <div className="form-group">
            <label>
              Company Size <span className="text-danger">*</span>
            </label>
            <select name="companySize" className="custom-Select" value={formData.companySize} onChange={handleChange}>
              <option value="">Select Company Size</option>
              {["1-10", "11-50", "101-500", "1,001-5,000", "5,001-10,000", "10,000+"].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.companySize && <span className="error-text">{errors.companySize}</span>}
          </div>

          <label>Company Location</label>
          <div className="location-grid">
            <input
              type="text"
              name="pincode"
              className="custom-Input"
              placeholder="Pin Code"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}

            <input type="text" name="country" className="custom-Input" placeholder="Country" value={formData.country} readOnly />
            <input type="text" name="state" className="custom-Input" placeholder="State" value={formData.state} readOnly />
            <input type="text" name="city" className="custom-Input" placeholder="City" value={formData.city} readOnly />
          </div>

          <div className="button-container mt-3">
            <button type="submit" className="bt">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobFairReg;
