import React from "react";
import notifyImg from '../images/notify.svg';
import profileImg from '../images/profile.png';
import searchImg from '../images/searchnav.svg';

function AdminNavbar() {
  return (
   <div className='adminHeader bg-white flex mx-auto justify-between items-center px-10'>
        <div className="h-[60px] flex gap-[20px] items-center justify-between adminProfilePic">
          <div>
          <img src={profileImg} className=' w-[60px] h-[60px] rounded-[40px] object-cover' alt="" />
          </div>
          <div className="grid">
            <div className="font-bold text-[24px]">Paul Walker</div>
            <div className="text-[14px]">Managing Director</div>
          </div>
        </div>
        <div className="h-[40px] flex gap-[40px] items-center justify-between ">
          <div className="text-[18px]">06 December 2024</div>
          <form className="adminInput flex items-center ">
            <input type="text" placeholder='Search here...' />
            <button className="ms-[290px] absolute" type="submit"><img src={searchImg} alt="" /></button>
          </form>
          <div className="">
            <img src={notifyImg} alt="" />
          </div>
        </div>
      </div>
  );
}

export default AdminNavbar;
