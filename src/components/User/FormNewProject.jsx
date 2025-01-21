import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { GoUpload } from 'react-icons/go';
import { Link } from 'react-router-dom';
import BaseURL from '../../Api Services/baseURL';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';

const FormNewProject = () => {
  const initialFormData = {
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    userType: '',
    qualification: '',
    institute_company: '',
    projectName: '',
    problemSolved: '',
    beneficiaries: '',
    successReason: '',
    summary: '',
    skills: '',
    agreeTerms:'false'
  };
  const storedData = localStorage.getItem('formData');
  const [formData, setFormData] = useState(storedData ? JSON.parse(storedData) : initialFormData);
  console.log(formData, 'formDataa');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Handle input change
 const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value, // ✅ Handle checkboxes correctly
    }));
  };

  // Handle radio button selection
  const handleRadioChange = e => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };
  // Handle file selection
  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    document.getElementById('fileInput').value = ''; // Reset file input
  };

  const handlePhoneChange = (value, country) => {
    if (!value) {
        setFormData({...formData,phone:""});
      return;
    }
    const formattedPhone = `+${country.dialCode} ${value.slice(country.dialCode.length)}`;
    setFormData({...formData,phone:formattedPhone});
    // console.log(formattedPhone); 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("Clicked Submit");
    e.preventDefault();
    setLoading(true);
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    if (file) {
      formDataToSend.append("projectFile", file);
    }
  
    try {
      const response = await BaseURL.post("api/projects/submit", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      console.log(response.data, "Response Data");
  
      setFormData({
        ...initialFormData,
        agreeTerms: false, // Replace `yourCheckboxField` with your actual checkbox state key
      });
      
      setFile(null);
      setFileName("");
      localStorage.removeItem('formData'); // Clear stored data after submission
      toast.success("Submitted New Project")
      
    } catch (error) {
      console.error(error);
      toast.error(error)

    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className=" bg-white md:px-12 lg:px-0 py-3 ">
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col  max-w-[712px] mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl mx-auto text-sm sm:text-lg md:text-lg xl:text-lg xl-leading-7 2xl:leading-10 2xl:text-2xl"
        >
          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="rounded-lg placeholder-black p-3 place"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="tel"
              id="contactNumber"
              placeholder="Contact Number"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border-black text-black placeholder-black p-3 place"
              required
            />
          </div>
          {/* <div className="mb-4 flex justify-center w-100 connectPhoneInput items-center">
        <PhoneInput 
        value={formData.contactNumber}
        country={"in"}
        enableSearch={true}
        onChange={(value, country) => handlePhoneChange(value, country)}
      />
      </div> */}

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="email"
              id="emailAddress"
              placeholder="Email Address"
              value={formData.emailAddress}
              onChange={handleChange}
              className="  border-black text-black placeholder-[#0A0A0A] p-3 place"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex px-2 justify-between mr-0 lg:mr-96">
              {['Student', 'Fresher', 'Working'].map(option => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value={option}
                    checked={formData.userType === option}
                    onChange={handleRadioChange}
                    required
                  />
                  <span className="text-sm text-[#0A0A0A]">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Form.Select
              id="qualification"
              className=" p-3  placeholder-black place"
              style={{
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                borderRadius: '11.55px',
                color: 'rgba(0, 0, 0, 0.985)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              value={formData.qualification}
              onChange={handleChange}
              required
            >
              <option value="" defaultValue disabled>
                Qualification{' '}
              </option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="Bcom">Bcom</option>
              <option value="Btech">BTech</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>

          <div className="mb-4 overflow-x-auto">
            <Form.Control
              id="institute_company"
              className=" p-3 max-w-full  placeholder-black place"
              placeholder="Institute/Company Name"
              style={{
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                borderRadius: '11.55px',
                color: 'rgba(0, 0, 0, 0.985)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              value={formData.institute_company}
              onChange={handleChange}
              required
            >
              {/* <option value="" disabled selected>
                Institute/Company Name
              </option>
              <option value="socialMedia">Social Media</option>
              <option value="searchEngine">Search Engine</option>
              <option value="friendFamily">Friend or Family</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option> */}
            </Form.Control>
          </div>

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="projectName"
              placeholder="Project/Idea Name"
              value={formData.projectName}
              onChange={handleChange}
              className="  border-black text-black placeholder-black p-3 place"
            />
          </div>

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="problemSolved"
              value={formData.problemSolved}
              onChange={handleChange}
              placeholder="What problem does your Idea Solve?"
              className="  border-black text-black placeholder-black p-3 place"
            />
          </div>

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="beneficiaries"
              value={formData.beneficiaries}
              onChange={handleChange}
              placeholder="Who would benefit from this idea?"
              className="  border-black text-black placeholder-black p-3 place"
            />
          </div>

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="successReason"
              value={formData.successReason}
              onChange={handleChange}
              placeholder="Why do you think this idea will succeed?"
              className="  border-black text-black placeholder-black p-3 place"
            />
          </div>
          {/* Text Fields */}
          {/* {[
            'project_idea/Idea Name',
            'What Problem Does Your Idea Solve?',
            'Who would benefit from this idea?',
            'Why Do You Think This Idea Will Succeed?',
            'Do You Have Any Business or Technical Skills?',
          ].map(field => (
            <div key={field} className="mb-4">
              <Form.Control
                type="text"
                id={field}
                placeholder={field.replace('_', ' ')}
                value={formData[field]}
                onChange={handleChange}
                className="  border-black text-black placeholder-black p-3 place"
                style={{
                  borderRadius: '11.55px',
                  border: '0.2px solid rgba(10, 10, 10, 0.82)',
                  height: '53.4px',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                  e.target.style.boxShadow =
                    '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          ))} */}

          {/* <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '53.4px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              type="text"
              id="message"
              placeholder="Do you have any business or teachnical skills?"
              className="  border-black text-black placeholder-black p-3 place"
            />
          </div> */}

          <div className="mb-4">
            <Form.Control
              style={{
                borderRadius: '11.55px',
                border: '0.2px solid rgba(10, 10, 10, 0.82)',
                height: '150px',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow =
                  '0 0 0 0.2rem rgba(131, 133, 134, 0.25)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(10, 10, 10, 0.82)';
                e.target.style.boxShadow = 'none';
              }}
              as="textarea"
              id="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Summarize your project Ideas"
              className="  border-red text-black placeholder-black p-3 place"
            />
          </div>

          <div className="flex flex-col items-center mediaUploadDiv">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center text-[#FF9D00] rounded-lg px-2 py-3 cursor-pointer xl:text-lg custom-file-label"
              style={{ border: '1px solid #FF9D00' }}
            >
              {fileName ? (
                <>
                  <span>{fileName}</span>
                  <button
                    onClick={handleRemoveFile}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-0 font-semibold">
                    Upload Supporting Documents or Files
                  </p>
                  <GoUpload className="inline-block mx-1.5" />
                </>
              )}
              {/* Message Display */}
             
            </label>
          </div>

          <div className="flex justify-center items-center mt-3">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms || false}
              onChange={handleChange}
              className="form-checkbox border-gray-300"
              required
            />
            <label htmlFor="agreeTerms" className="text-sm">
              <Link
                to="/termsconditions-submit-new-project"
                className="text-[#212529] items-center text-[14px] no-underline mx-2 cursor-pointor"
              >
                Agreement to Terms & Conditions
              </Link>
              <span className="text-[12px] learnMore">Learn more</span>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 transform hover:scale-105 hover:bg-blue-700 bg-gradient-to-r from-[#FFC100] to-[#FF9D00] px-16 py-2 rounded-md font-bold text-white"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormNewProject;
