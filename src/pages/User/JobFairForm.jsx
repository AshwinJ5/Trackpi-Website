import React from "react";
import HeaderJobfair from "../../components/JobFair/Header";

const JobFairForm = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <HeaderJobfair />

      {/* Form Section */}
      <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-300 p-6 sm:p-8 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
            Contact Person & Company Information
          </h2>

          <form className="space-y-4">
            {/* Contact Person Details */}
            <div>
              <label className="block text-gray-700 font-semibold">Full Name *</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Designation *</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                defaultValue=""
              >
                <option disabled value="">Select Designation</option>
                <option>HR Manager</option>
                <option>CEO</option>
                <option>CMO</option>
                <option>CTO</option>
                <option>CLO</option>
                <option>CFO</option>
                <option>CPO</option>
                <option>COO</option>
                <option>CHRO</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email Address *</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Phone Number *</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="px-4 py-2 bg-gray-200">+91</span>
                <input
                  type="tel"
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Alternate Contact Details</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Alternate Contact Details"
              />
            </div>

       
          

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobFairForm;
