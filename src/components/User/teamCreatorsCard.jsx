import React from 'react';

const CreatorCard = ({ name, role, image }) => {
  return (
    <div
      className="bg-[#FFECEC]  rounded-lg w-[400px] text-center overflow-hidden cardDiv"
      style={{
        boxShadow: '2px 2px 4px 0px #0A0A0A33', // Applying the specified shadow
      }}
    >
      {/* Image with background */}
      <div className="bg-[#E3E5E8] flex justify-center pt-1 creatorImg">
        <img
          src={image}
          alt={name}
          className="w-[398px] h-[288px] rounded-lg object-contain"
        />
      </div>

      {/* Name & Role */}
      <div className="bg-white p-2 text-start">
        <h4 className=" text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] font-semibold mb-1">{name}</h4>
        <p className="  text-[10px] md:text-[14px]  lg:text-[18px]  xl:text-[20px] text-gray-600  mb-0">{role}</p>
      </div>
    </div>
  );
};

export default CreatorCard;
