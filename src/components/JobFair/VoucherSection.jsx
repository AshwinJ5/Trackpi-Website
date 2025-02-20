import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Importing info icon
import "./Voucherpage.css";

const vouchers = [
  { id: 1, title: "Sales Consultation", image: "/assets/svg/sales_consultation.svg" },
  { id: 2, title: "Operational Consultation", image: "/assets/svg/operational_consultation.svg" },
  { id: 3, title: "Sales Training Workshop", image: "/assets/svg/sales_training.svg" },
  { id: 4, title: "Branding & Marketing Consultation", image: "/assets/svg/branding_and_marketing.svg" },
];

const VoucherSection = () => {
  const [selectedVouchers, setSelectedVouchers] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedVouchers.includes(id)) {
      setSelectedVouchers(selectedVouchers.filter((voucher) => voucher !== id));
    } else if (selectedVouchers.length < 2) {
      setSelectedVouchers([...selectedVouchers, id]);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-10 px-4">
      {/* Heading */}
      <h2 className="text-center text-2xl font-bold text-black whitespace-nowrap">
        Choose Your Complimentary Gifts!
      </h2>
      <p className="text-center text-sm text-gray-700 mt-2">
        To thank you for taking the first step in participating in our online job fair, we have a number of special and free gifts that we believe will aid in the expansion and effectiveness of your business.
      </p>

      {/* Voucher Container */}
      <div className="bg-[#0A0A0A33] rounded-[20px] p-6 mt-6 w-full sm:w-[calc(100%+20px)] mx-auto">
        {/* Header Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between">
          {/* Title with Info Icon */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <h3 className="text-lg font-bold text-black">Special Offers on Trackpi Services</h3>
            <AiOutlineInfoCircle className="text-black-600 text-md sm:text-lg" />
          </div>
          {/* Selection Count */}
          <p className="text-sm text-black-700 mt-1 sm:mt-0 self-end sm:self-center">
            {selectedVouchers.length} / 2 Selected
          </p>
        </div>

        {/* Voucher List */}
        <div className="flex flex-col gap-6 mt-4">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="relative flex items-center w-full">
              {/* Checkbox */}
              <input
                type="checkbox"
                id={voucher.id}
                className="absolute left-[-24px] sm:left-4 top-1/2 transform -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 border border-black rounded-md appearance-none checked:bg-black checked:border-black checked:after:content-['\2713'] checked:after:text-white checked:after:text-xs checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                checked={selectedVouchers.includes(voucher.id)}
                onChange={() => handleCheckboxChange(voucher.id)}
              />
              {/* Image */}
              <img src={voucher.image} alt={voucher.title} className="w-full rounded-md shadow-md" />
            </div>
          ))}
        </div>

        {/* Desktop Footer */}
        <p className="hidden sm:block text-center text-sm text-black font-bold mt-6">
          Choose any 2 vouchers from the 4 options above, and note that each <span className="text-red-600">*</span>
          <br />
          voucher is valid for single use only.
        </p>

        {/* Mobile Footer */}
        <p className="block sm:hidden text-center text-xs text-black font-medium mt-6">
          Choose any 2 vouchers from the 4 options above, and <span className="text-red-600">*</span>
          <br />
          note that each voucher is valid for single use only.
        </p>
      </div>
    </div>
  );
};

export default VoucherSection;