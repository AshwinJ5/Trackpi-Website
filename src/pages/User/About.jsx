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
                description="Trackpi is one of the best business consulting companies in Kerala, based in Kochi. We help businesses succeed by providing a strategic advantage over competitors with expert guidance. Trackpi also offers opportunities for freelance associates to earn and grow, becoming part of its organic and boundless freelance community."
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
