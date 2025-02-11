import React from "react";
import Header from "./Header";
import VoucherSection from "../../pages/User/VoucherSection";
import Cards from "./Cards";

const EmployeeCard = () => {  
  return (
    <div className="flex flex-col min-h-screen w-full items-center mx-auto">
      <div className="w-full">
        <Header />
      </div>
      <div className="mt-10 w-full max-w-[80%] mx-auto">
        <VoucherSection />
      </div>
      <div>
        <Cards /> 
      </div>
    </div>
  );
};

export default EmployeeCard;
