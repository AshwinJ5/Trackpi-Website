import React from "react";
import NotFoundImage from "../images/404.svg";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen px-[30px]">
            <img className="max-w-[90vw] max-h-[90vh]" src={NotFoundImage} alt="" />
        </div>
    );
};

export default NotFound;
