import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { GoUpload } from 'react-icons/go';
import { Link } from 'react-router-dom';
import BaseURL from '../../Api Services/baseURL';
import formInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import '../../CSS/User/FormProjectStyles.css';
import PhoneInput from 'react-phone-input-2';

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
    agreeTerms: 'false',
  };
  const storedData = sessionStorage.getItem('formData');
  const [formData, setFormData] = useState(
    storedData ? JSON.parse(storedData) : initialFormData
  );
  console.log(formData, 'formDataa');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Handle input change
  const handleChange = e => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
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
      setFormData({ ...formData, contactNumber: '' });
      return;
    }
    const formattedPhone = `+${country.dialCode} ${value.slice(
      country.dialCode.length
    )}`;
    setFormData({ ...formData, contactNumber: formattedPhone });
    // console.log(formattedPhone);
  };

  // Handle form submission
  const handleSubmit = async e => {
    console.log('Clicked Submit');
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    if (file) {
      formDataToSend.append('projectFile', file);
    }

    try {
      const response = await BaseURL.post(
        'api/projects/submit',
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(response.data, 'Response Data');

      setFormData({
        ...initialFormData,
        agreeTerms: false, // Reset checkbox field
      });

      setFile(null);
      setFileName('');
      sessionStorage.removeItem('formData'); // Clear stored data after submission

      toast.success('Project submitted successfully!');
    } catch (error) {
      console.error('Error response:', error);

      // Check if there is a response from the server
      if (error.response) {
        const errorMessage =
          error.response.data.error || 'Something went wrong';

        toast.error(errorMessage); // Show toast with backend error message
      } else {
        toast.error('Network error or server is down');
      }
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
          <div className=" formInput">
            <Form.Control
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="form-control place"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className=" formInput">
            <PhoneInput
              value={formData.contactNumber}
              country={'in'}
              enableSearch={true}
              onChange={(value, country) => handlePhoneChange(value, country)}
              inputClass="w-100 "
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
            />
          </div>

          <div className=" formInput">
            <Form.Control
              type="email"
              id="emailAddress"
              placeholder="Email Address"
              value={formData.emailAddress}
              onChange={handleChange}
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              required
            />
          </div>
          <div className="radioMob mb-2.5">
            <div className="user-type-container">
              {['Student', 'Fresher', 'Working'].map(option => (
                <label key={option} className="user-type-label">
                  <input
                    type="radio"
                    name="userType"
                    value={option}
                    checked={formData.userType === option}
                    onChange={handleRadioChange}
                    required
                    className="user-type-radio"
                  />
                  <span className="user-type-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className=" formInput">
            <Form.Select
              id="qualification"
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
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

          <div className=" formInput overflow-x-auto">
            <Form.Control
              id="institute_company"
              placeholder="Institute/Company Name"
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
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

          <div className=" formInput">
            <Form.Control
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              type="text"
              id="projectName"
              placeholder="Project/Idea Name"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          <div className=" formInput">
            <Form.Control
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              type="text"
              id="problemSolved"
              value={formData.problemSolved}
              onChange={handleChange}
              placeholder="What problem does your Idea Solve?"
            />
          </div>

          <div className=" formInput">
            <Form.Control
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              type="text"
              id="beneficiaries"
              value={formData.beneficiaries}
              onChange={handleChange}
              placeholder="Who would benefit from this idea?"
            />
          </div>

          <div className=" formInput">
            <Form.Control
              className="form-control place"
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              type="text"
              id="successReason"
              value={formData.successReason}
              onChange={handleChange}
              placeholder="Why do you think this idea will succeed?"
            />
          </div>

          <div className=" formInput">
            <Form.Control
              className="form-control place"
              style={{ height: '150px' }}
              onFocus={e => {
                e.target.classList.add('focus');
              }}
              onBlur={e => {
                e.target.classList.remove('focus');
              }}
              as="textarea"
              id="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Summarize your project Ideas"
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
              className="flex items-center justify-center text-[#FF9D00] rounded-lg px-3 py-3 cursor-pointer xl:text-lg custom-file-label"
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
                className="text-[#FF9D00] font-bold items-center text-[14px] no-underline mx-2 cursor-pointer "
              >
                Agreement to Terms & Conditions
              </Link>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 transform hover:scale-105 hover:bg-blue-700 bg-gradient-to-r from-[#FFC100] to-[#FF9D00] px-16 py-2 rounded-md font-700 text-white"
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
