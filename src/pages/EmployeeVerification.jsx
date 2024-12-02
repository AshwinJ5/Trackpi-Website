import React, { useState } from 'react';
import { Verify } from 'react-puzzle-captcha';
import 'react-puzzle-captcha/dist/react-puzzle-captcha.css';

function EmployeeVerification() {
  const [formData, setFormData] = useState({
    employeeId: '',
  });

  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaMessage, setCaptchaMessage] = useState(''); // State for CAPTCHA messages

  // Dummy data (simulate a backend response)
  const dummyData = [
    { employeeId: 'EMP001', fullName: 'John Doe', department: 'HR' },
    { employeeId: 'EMP002', fullName: 'Jane Smith', department: 'IT' },
    { employeeId: 'EMP003', fullName: 'Alice Johnson', department: 'Finance' },
    { employeeId: 'EMP004', fullName: 'Bob Brown', department: 'IT' },
    { employeeId: 'EMP005', fullName: 'Charlie White', department: 'HR' },
  ];

  // Handle input changes
  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validation function
  const validate = () => {
    const validationErrors = {};
    const { employeeId } = formData;

    if (!employeeId) {
      validationErrors.general = 'Please fill the field.';
    }

    if (employeeId && !/^[a-zA-Z0-9]+$/.test(employeeId)) {
      validationErrors.employeeId = 'Employee ID must be alphanumeric.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Filter the dummy data based on the form inputs
      const filteredResults = dummyData.filter(employee => {
        const matchesEmployeeId = formData.employeeId
          ? employee.employeeId.includes(formData.employeeId)
          : true;
        return matchesEmployeeId;
      });

      if (filteredResults.length === 0) {
        setErrors({
          general: 'Invalid verification terms: No matching employee found.',
        });
        setSearchResults([]); 
      } else {
        setSearchResults(filteredResults);
        setErrors({}); 
      }
    }
  };

  // Handle CAPTCHA success
  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
    setCaptchaMessage('CAPTCHA verified successfully!');
  };

  // Handle CAPTCHA failure
  const handleCaptchaFail = () => {
    setCaptchaVerified(false);
    setCaptchaMessage('CAPTCHA verification failed. Please try again.');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex justify-center items-center p-3 w-full h-screen bg1 relative">
        <div className="flex flex-col items-center z-10">
          <h1 className="text-5xl md:text-7xl hover:text-sky-500 home-text">
            Employee Verification
          </h1>
          <p className="mt-4 text-xl text-center text-black-300">
            Verify employee credentials and details securely and efficiently.
          </p>
        </div>
      </section>

      {/* Verification Form Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-amber-600">
            Employee Verification Form
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Employee ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="employeeId"
              >
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter Employee ID"
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm">{errors.employeeId}</p>
              )}
            </div>
            
            {/* CAPTCHA */}
            {captchaVerified? null:
            <>
            <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="captcha"
              >
                Captcha 
              </label>
            <Verify id="captcha" 
              width={250}
              height={120}
              onSuccess={handleCaptchaSuccess} // Handle success
              onFail={handleCaptchaFail} // Handle failure
            /></>}

            {/* CAPTCHA Message */}
            {captchaMessage && (
              <p
                className={`text-sm text-center ${
                  captchaVerified ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {captchaMessage}
              </p>
            )}

            {/* General Error */}
            {errors.general && (
              <p className="text-red-500 text-center mb-4">{errors.general}</p>
            )}

            {/* Submission Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!captchaVerified} // Disable submit button until CAPTCHA is verified
                className="transform hover:scale-105 bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-300 text-black font-semibold px-6 py-2 rounded-md mt-4 hover:bg-blue-700"
              >
                Verify Employee
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <h2 className="font-semibold text-center text-gray-800 mb-6">
            Search Results
          </h2>
          <div className="max-w-5xl mx-auto">
            <table className="min-w-full table-auto bg-yellow-100 text-black">
              <thead>
                <tr>
                  <th className="py-2 px-4 border ">Employee ID</th>
                  <th className="py-2 px-4 border">Full Name</th>
                  <th className="py-2 px-4 border">Department</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((employee, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{employee.employeeId}</td>
                    <td className="py-2 px-4 border">{employee.fullName}</td>
                    <td className="py-2 px-4 border">{employee.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Benefits of Verification Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-black">
            Why Verify Employees?
          </h2>
          <p className="text-black mb-8">
            Ensuring that employee information is accurate helps maintain a
            trustworthy workplace environment and reduces the risk of fraudulent
            activities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hover:shadow-2xl transform hover:scale-105 p-6 bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-300 rounded-md shadow-lg">
              <h3 className="text-xl font-medium text-black mb-2">
                Authenticity
              </h3>
              <p className="text-black">
                Verify the authenticity of employee credentials and background
                details.
              </p>
            </div>
            <div className="p-6 hover:shadow-2xl transform hover:scale-105 bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-300 rounded-md shadow-lg">
              <h3 className="text-xl font-medium text-black mb-2">Security</h3>
              <p className="text-black">
                Protect your organization from unauthorized individuals.
              </p>
            </div>
            <div className="p-6 hover:shadow-2xl transform hover:scale-105 bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-300 rounded-md shadow-lg hover:bg-blue-500">
              <h3 className="text-xl font-medium text-black mb-2">
                Efficiency
              </h3>
              <p className="text-black">
                Streamline the hiring and employee verification process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmployeeVerification;
