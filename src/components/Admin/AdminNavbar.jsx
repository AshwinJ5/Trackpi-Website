import React from "react";

import searchImg from "/assets/svg/searchnav.svg";

function AdminNavbar() {
  const today = new Date();
  const formattedDate = `${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear()}`;

  return (
    <div className="adminHeader bg-white flex mx-auto justify-between items-center px-10">
      <div className="h-[60px] flex gap-[20px] items-center justify-between adminProfilePic">
        <div>
          <img
            src="/assets/images/profile.png"
            className=" w-[60px] h-[60px] rounded-[40px] object-cover "
            alt=""
          />
        </div>
        <div className="grid">
          <div className="font-bold text-[24px]">Paul Walker</div>
          <div className="text-[14px]">Managing Director</div>
        </div>
      </div>
      <div className="h-[40px] flex gap-[40px] items-center justify-between ">
        <div className="text-[18px] ">{formattedDate}</div>
        <form className="adminInput flex items-center ">
          <input type="text" placeholder="Search here..." />
          <button className="ms-[290px] absolute" type="submit">
            <img src={searchImg} alt="" />
          </button>
        </form>
        <div className="">
          <img src="/assets/svg/notify.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
