import React, { useRef } from "react";
import "../../CSS/User/loader.css";

function Loader() {
    const imageRef = useRef(null);

    return (
        <>
            <div className="text-center  loader_main">
                <div className="">
                    <img src="/assets/images/trackpil.png" ref={imageRef} className=" mx-auto mb-3 image-animation" alt="TrackPi Logo" />
                </div>
            </div>
        </>
    );
}

export default Loader;
