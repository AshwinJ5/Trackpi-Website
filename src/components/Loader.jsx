import React, {  useRef } from 'react';
import trackpiLogo from '../images/trackpil.png'; 
import '../CSS/loader.css'

function Loader() {
  const imageRef = useRef(null);

  return (
    <>
         <div className="text-center  loader_main">
      <div className=''>
        {/* <img src={trackpiLogo} alt="TrackPi Logo Blured" className='img-overlay' /> */}
        <img
          src={trackpiLogo}
          ref={imageRef}
          className=" mx-auto mb-3 image-animation"
          alt="TrackPi Logo"
        />
      </div>
    </div>
    </>
  )
}

export default Loader