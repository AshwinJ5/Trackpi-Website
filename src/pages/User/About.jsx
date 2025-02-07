//import React from 'react';
import OurTeam from "./OurTeam";
import PopUp from "../../components/User/PopUp";
import ConnectButtons from "../../components/ConnectButtons";
import HeaderBanner from "../../components/User/HeaderBanner";

function About() {
    return (
        <>
            <PopUp />
            <HeaderBanner
                title="About Us"
                description="Trackpi is one of the top business consultants in Kerala, helping businesses grow with expert advice. Our team in Kochi works to help companies succeed. We also offer freelancing opportunities for people to earn and grow in Kerala’s largest freelance community.
"
                classname="bgTwo"
                brochureMain={true}
                noButton={true}
                class123={"headerbannerCenterContentOther"}
            />
            <section>
                <OurTeam />
            </section>
            <section className="mb-5"></section>
            <ConnectButtons />
        </>
    );
}

export default About;
