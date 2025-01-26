//import React from 'react';
import OurTeam from "./OurTeam";
import PopUp from "../../components/User/PopUp";
import ConnectButtons from "../../components/ConnectButtons";
import HeaderBanner from "../../components/User/HeaderBanner";

function About() {
    return (
        <>
            <PopUp />
                <HeaderBanner title="About Us" description="Learn more about our journey as the best business consultant in Kerala and what drives us forward."classname='bgTwo' 
                brochureMain={true} noButton={true} class123={'headerbannerCenterContentOther'}/>
                <section >
                    <OurTeam />  
                </section>
            <section className="mb-5"></section>
            <ConnectButtons />
        </>
    );
}

export default About;
