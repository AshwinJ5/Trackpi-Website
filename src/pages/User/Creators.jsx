import React from 'react';
import CreatorCard from '../../components/User/teamCreatorsCard';
import creator1 from "../../images/creator1.png"
import creator2 from "../../images/creator2.png"

// Sample data
const designers = [
  { name: 'Alifen Sunny', role: 'UI/UX Designer', image: creator1 },
  { name: 'V Ranjana Priya', role: 'UI/UX Designer', image: creator2 }
];

const developers = [
  { name: 'Shalu Menon', role: 'React Developer', image: creator2},
  { name: 'Aswin Joseph', role: 'React Developer', image: creator1 },
  { name: 'Nidha Fathima', role: 'React Developer', image: creator2 }
];

const Creators = () => {
  return (
    <div className="w-full xl:mt-[98px] mt-[80px] flex flex-col items-center">
      <h2 className="text-[62px] font-bold text-center text-[#FF9D00]">
        Creators
      </h2>

      {/* Designers Section */}
      <h3 className="text-[46px] font-bold text-[#FFC100] text-center mt-6">Designers</h3>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-[900px]">
        {designers.map((designer, index) => (
          <CreatorCard key={index} {...designer} />
        ))}
      </div>

      {/* Developers Section */}
      <h3 className="text-[46px] font-bold text-[#FFC100] text-center mt-8">Developers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[900px]">
        {developers.map((developer, index) => (
          <CreatorCard key={index} {...developer} />
        ))}
      </div>
    </div>
  );
};

export default Creators;
