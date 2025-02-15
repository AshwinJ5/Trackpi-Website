import React, { useState } from "react";
import "./Voucherpage.css";

import voucher3 from "./assets/sales_training.svg";

const vouchers = [
  {
    id: 1,
    title: "sales_consultation",
    image: "/assets/svg/sales_consultation.svg",
  },
  {
    id: 2,
    title: "operational_consultation",
    image: "/assets/svg/operational_consultation.svg",
  },
  { id: 3, title: "sales_training", image: voucher3 },
  {
    id: 4,
    title: "branding_and_marketing",
    image: "/assets/svg/branding_and_marketing.svg",
  },
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
      <h2 className="text-center text-2xl font-bold text-black">
        Choose Your Complimentary Gifts!
      </h2>
      <p className="text-center text-sm text-gray-700 mt-2">
        To thank you for participating in our online job fair, we are offering
        special and free gifts to help expand your business.
      </p>

      {/* Voucher Container */}
      <div className="bg-[#0A0A0A33] rounded-[20px] p-6 mt-6">
        <div className="flex justify-center items-center w-full relative">
          <h3 className="text-lg font-bold text-black text-center">
            Special Offers on Trackpi Services
          </h3>
          <p className="absolute right-0 text-sm text-gray-700">
            {selectedVouchers.length} / 2 Selected
          </p>
        </div>

        {/* Voucher List - One per Row */}
        <div className="flex flex-col gap-6 mt-4">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="relative flex items-center w-full">
              <div className="absolute left-3 top-1/4 transform -translate-y-1/4">
                <input
                  type="checkbox"
                  id={voucher.id}
                  className="w-6 h-6 border border-gray-500 rounded-md appearance-none checked:bg-black checked:border-black checked:after:content-['\2713'] checked:after:text-white checked:after:text-xs checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  checked={selectedVouchers.includes(voucher.id)}
                  onChange={() => handleCheckboxChange(voucher.id)}
                />
              </div>
              <img
                src={voucher.image}
                alt={voucher.title}
                className="w-full rounded-md shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-black font-bold mt-6">
          Choose any 2 vouchers from the 4 options above, and note that each{" "}
          <span className="text-red-600">*</span>
          <br />
          voucher is valid for single use only.
        </p>
      </div>
    </div>
  );
};

export default VoucherSection;
