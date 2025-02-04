import React from 'react'

const teamCreatorsCard = ({ name, role, image }) => {
  return (
    <div className="flex flex-col items-center bg-pink-100 shadow-lg rounded-lg p-6 w-[250px]">
    <img 
      src={image} 
      alt={name} 
      className="w-[120px] h-[120px] rounded-lg object-cover "
    />
    <h4 className="text-lg font-semibold mt-3 text-center">{name}</h4>
    <p className="text-gray-600 text-center">{role}</p>
  </div>
  )
}

export default teamCreatorsCard
