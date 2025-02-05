import React from 'react';

const CreatorCard = ({ name, role, image }) => {
  return (
    <div
      className="bg-[#FFECEC]  rounded-lg w-[400px] text-center overflow-hidden"
      style={{
        boxShadow: '2px 2px 4px 0px #0A0A0A33', // Applying the specified shadow
      }}
    >
      {/* Image with background */}
      <div className="bg-[#E3E5E8] flex justify-center pt-1 ">
        <img
          src={image}
          alt={name}
          className="w-[398px] h-[288px] rounded-lg object-contain"
        />
      </div>

      {/* Name & Role */}
      <div className="bg-white p-2 text-start">
        <h4 className="text-lg font-semibold mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-0">{role}</p>
      </div>
    </div>
  );
};

export default CreatorCard;
