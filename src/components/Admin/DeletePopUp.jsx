import React, { useEffect, useState } from 'react'
import deleteImg from '../../images/deletePopupimg.svg'

function DeletePopUp({onClose, dataDeleted,datas ,functions}) {

    const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true); 
    return () => setIsAnimating(false); 
  }, []);

  const handleClose = () => {
    setIsAnimating(false); 
    setTimeout(onClose, 300); 
  };


  
  return (
    <>
            <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-[550px] h-[224px] grid items-center justify-center bg-white rounded-[20px] py-[30px] shadow-lg transform transition-transform duration-300 ${
          isAnimating ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
      >
        <div className="flex justify-start items-center gap-[10px] mb-4">
          <img className="h-[30px] w-[30px]" src={deleteImg} alt="Delete Icon" />
          <div className="text-[#FF9D00] text-[24px] font-bold">Delete {datas}</div>
        </div>
        <p className="text-[#0A0A0A] text-[18px] font-semibold mb-6">
          Are you sure you want to delete  {dataDeleted}?
        </p>
        <div className="flex gap-[30px] justify-center items-center">
          <button
            onClick={handleClose}
            className="text-[18px] font-bold text-white bg-[#FF9D00] flex items-center justify-center h-[42px] w-[200px] rounded-[10px]"
          >
            Cancel
          </button>
          <button
            onClick={() => functions()}
            className="text-[18px] font-bold text-white bg-[#FF9D00] flex items-center justify-center h-[42px] w-[200px] rounded-[10px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default DeletePopUp