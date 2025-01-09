//import React from 'react';
import OurTeam from "./OurTeam";
import PopUp from "../../components/PopUp";
import ConnectButtons from "../../components/ConnectButtons";
import HeaderBanner from "../../components/HeaderBanner";

function About() {
    return (
        <>
            <PopUp />
                <HeaderBanner title="About Us" description="Learn more about our journey and what drives us forward."classname='bgTwo' 
                brochureMain={true} noButton={true}/>
                <section >
                    <OurTeam />  
                </section>
            <section className="mb-5"></section>
            <ConnectButtons />
        </>
    );
}

export default About;
