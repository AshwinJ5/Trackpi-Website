import React from "react";

const UploadProfile = () => {
  return (
    <div className="profile flex items-center justify-center bg-gray-100 rounded-lg shadow-md relative">
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => console.log(e.target.files[0])} 
      />
      <label
        htmlFor="profile-upload"
        className="absolute bottom-2 right-2 bg-orange-500 rounded-full cursor-pointer shadow-md hover:bg-orange-600"
        style={{ width: '20px', height: '20px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5v-9m0 0-3.75 3.75m3.75-3.75 3.75 3.75M21 12.75A9.75 9.75 0 1 1 2.25 12.75 9.75 9.75 0 0 1 21 12.75z"
          />
        </svg>
      </label>
    </div>
  );
};

export default UploadProfile;
