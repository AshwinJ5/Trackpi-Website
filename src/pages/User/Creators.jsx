import React, { useEffect, useState } from 'react';
import CreatorCard from '../../components/User/teamCreatorsCard';
import creator1 from '../../images/creator1.png';
import creator2 from '../../images/creator2.png';
import '../../CSS/User/Creators.css';
import { SERVER_URL } from '../../Api Services/serverUrl';

const designers = [
  { name: 'Alifen Sunny', role: 'UI/UX Designer', image: creator1 },
  { name: 'V Ranjana Priya', role: 'UI/UX Designer', image: creator2 },
];

const developers = [
  { name: 'Shalu V', role: 'React Developer', image: creator2 },
  {
    name: 'Aswin Joseph',
    role: 'React Developer',
    image: `${SERVER_URL}/uploads/images/ashwin.jpeg`,
  },
  { name: 'Nidha Fathima', role: 'React Developer', image: creator2 },
];

const Creators = () => {
  return (
    <div className="w-full xl:mt-[150px] mt-[90px] mb-20 flex flex-col items-center">
      <h2 className=" text-[22px] md:text-[28px] lg:text-[62px] font-bold text-center text-[#FF9D00] mb-0 ">
        Creators
      </h2>
      {/* Designers Section */}
      <div className="px-12">
        <h3 className="text-[18px]  md:text-[24px] lg:text-[46px]  font-bold text-[#FFC100] text-center mt-4 sm:mt-4 md:mt-8 lg:mt-2 2xl:mt-8  sm:mb-2 md:mb-4 lg:mb-4 xl:mb-8 2xl:mb-10">
          Designers
        </h3>
        <div className="flex justify-center gap-8 w-full custom-Cards ">
          {designers.map((designer, index) => (
            <CreatorCard key={index} {...designer} />
          ))}
        </div>

        {/* Developers Section */}
        <h3 className="text-[18px] md:text-[24px] lg:text-[46px]  font-bold text-[#FFC100] text-center mt-4 sm:mt-4 md:mt-8 lg:mt-12  2xl:mt-8 sm:mb-2 md:mb-4 lg:mb-4 xl:mb-8 2xl:mb-10 ">
          Developers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-8 w-full custom-Cards">
          {developers.map((developer, index) => (
            <div
              key={index}
              className={`${
                developers.length === 3 && index === 2
                  ? 'col-span-2 flex justify-center lg:col-span-1'
                  : ''
              }`}
            >
              <CreatorCard {...developer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Creators;
