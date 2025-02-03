import React from "react";
import MarketPositioning from "./MarketPositioning";
import PopUp from "../../components/User/PopUp";
import HeaderBanner from "../../components/User/HeaderBanner";
import ServicesSub from "../../components/User/ServicesSub";
import financeImg1 from "../../images/fin1.png";
import financeImg2 from "../../images/fin2.png";
import assetImg1 from "../../images/asset1.png";
import assetImg2 from "../../images/asset2.png";
import hiring from "../../images/hiring.jpg";
import consult from "../../images/consult.jpg";
import strategyImg1 from "../../images/trainings.jpg";
import strategyImg2 from "../../images/strategy2.png";
import strategyImg3 from "../../images/strategy3.png";
import hiringImg1 from "../../images/sale.jpg";
import KeyBenefitServices from "../../components/User/KeyBenefitServices";
import ConnectButtons from "../../components/ConnectButtons";
import '../../CSS/ourservices.css'

function OurServices() {
    return (
        <div className="services_main">
            <PopUp />
            <div className="overflow-x-hidden">
                {/* Hero Section */}
                <HeaderBanner
                    title="Working Together"
                    description="We help organizations navigate and thrive in the face of complexity."
                    classname="bgThree"  class123={'headerbannerCenterContentOther'}
                />

                {/* Content Sections */}
                <section id="sales-outsourcing" className=" w-full">
                    <ServicesSub
                        heading="Sales Outsourcing"
                        classname="bg_common"
                        title1="End-to-End Sales Outsourcing Solutions"
                        description1="Select one of our sales outsourcing solutions and save time as we take care of your lead generation to deal closure activities. Our hand is always on the sales cycle, allowing our business to have strong growth over time. With business consulting services as one of our core functions, we redefine the direction of the business by aligning the strategies to goals placed before the business, enhancing your ability to grow faster."
                        img1={financeImg1}
                        title2="Sales Performance Enhancement Services"
                        description2="Take your team to the next level by hiring our sales performance enhancement services specialists. We have extensive experience working in the Kerala business environment and thus understand the formation of bottlenecks during the sales process and offer practical solutions for their elimination. Such a working experience allows a businessman to measure success in the quite dynamically changing marketplace, thus helping to remain competitive."
                        img2={financeImg2}
                    />
                </section>
                <section id="hiring" className=" w-full">
                    <ServicesSub
                        heading="Hiring & Retention"
                        title1="Our Hiring Process:"
                        description1="We have an effective hiring process that makes talent search easier. We will work with you to understand what you are looking for and subsequently hire applicants who fit your qualifications and procedures. To us, recruitment is more about fitting in to the company culture than fulfilling the job requirements, and it enhances the chances of better productivity."
                        img1={hiring}
                        title2="Transformer Role"
                        description2="Transform your workforce by hiring for those positions that have the greatest impact. Leveraging our experience in business consulting and in client retention, we help organizations in Kerala find and develop leaders who can create transformational change. These people help in driving growth and innovation in your company, which in turn adds tremendous value to your company and also creates an energized and engaged workforce."
                        img2={consult}
                    />
                </section>
                <section id="sales-training" className="w-full">
                    <ServicesSub
                        heading="Sales Training Strategies"
                        classname="bg_common"
                        title1="Customized Training"
                        description1="Let your sales team receive special training courses targeted to suit your corporate requirements. Our tailor-made approach merges into skill improvement, self-confidence building, and a refined strategy to fit the wider picture. As a good business consultant in Kerala, we also help ensure your teams do not get stagnated in meeting market challenges or even helping solve the latter, ensuring growth is always consistent."
                        img1={strategyImg1}
                        title2="Expert Guidance"
                        description2="Get exposure to a team of professionals who have seen it all and done it. All of those real-life interactions should integrate into the performance of trained sales teams. As trusted consultants in Kerala, we offer sales champions in training—and no one wins them easily, to our business clientele. In-depth training involves the best techniques imaginable along with novel strategies that should guarantee results that are out of this world."
                        img2={strategyImg2}
                        title3="Measurable Outcomes"
                        description3="Achieve target success rates in training using our outcomes-centered strategy across CTCR Institutes’ services. We focus on defining goals and improving KPIs such as conversion rates and customer satisfaction levels. As experienced management consultants in Kerala, we invest your money saved on sales training to ensure you obtain growth in revenues and profits."
                        img3={strategyImg3}
                    />
                </section>
                <section id="operations-training" className="w-full">
                <ServicesSub
                        heading="Operations Training & Strategies" subHeading='Leverage our custom-designed tactics to efficiently enhance your operations. Every process has room for improvement, and every member of the team has the potential to flourish while adapting to ever-evolving surroundings, which is why we execute extensive training sessions. Our focus on continuous enhancement guarantees that your business is proactively prepared to succeed in a highly competitive business environment.'
                        classname=""
                        title1="Why Employ Our Services?"
                        description1="Enhance Efficiency: Unclutter and automate your business processes to increase efficiency and cut costs. Improve Leadership: Provide managers with effective tools that they can use to accomplish operational success. Ensure Change: Promote change and ensure that significant organizational changes go smoothly. Customize Your Solutions: Applications to grant you solutions that solely match your operational problems.
"
                        img1={hiringImg1}
                        isPointWise={true}
                    />
                </section>
                <section>
                  <KeyBenefitServices/>
                </section>
                <section id="market-positioning" className=" w-full marketPositioning">
                    <MarketPositioning />
                </section>

                {/* Risk Management*/}
                <section id="risk-management" className=" w-full">
                    <ServicesSub
                        heading="Risk Management"
                        classname=""
                        title1="State-of-the-Art Procurement Solutions"
                        description1="We make it simple for our clients to procure companies by optimizing their processes and mitigating risks from supply chain disruptions and market volatility. Our primary objectives are seeking reliable suppliers, negotiating the best possible terms, and maintaining regulatory compliance. We understand and incorporate risk factors into all procurement tasks, assisting your organization to mitigate risks and achieve long-term operational goals."
                        img1={assetImg1}
                        title2="Holistic Risk Management Approaches"
                        description2="Our risk advisory services address risk in a multifaceted manner, i.e., all the business components are analyzed, and possible risk factors as well as mitigation plans are presented. Strategies are put in place to mitigate operational risks, financial risks, market risks, and regulatory threats so that the resiliency of the organization is strengthened. You are equipped with tools that allow you to tightly integrate your management with a rapidly evolving business environment through foresight and measurable strategies."
                        img2={assetImg2}
                    />
                </section>
                {/* Financial Consulting */}
                <section id="financial-consulting" className="w-full">
                    <ServicesSub
                        heading="Financial Consulting"
                        classname="bg_common"
                        title1="Financial Planning For Growth"
                        description1="Every business is unique, but what is a common theme across them is setting goals. Through setting goals, we can tailor our financial strategies to fulfill those goals. Forecasting, budgeting, and appropriate resource allocation are part of the package so that the business is ready for challenges but also growth. With a focus on achieving and sustaining success."
                        img1={financeImg1}
                        title2="Cash Flow Enhancement "
                        description2="Before deciding on a firm to partner with, it is crucial that you gauge the cash flow management strategies they propose. After assessing your income and expenditures, our team of experts recommends a series of actions that streamline and enhance the cash flow management process. Our approach reduces risk, assuring that your company’s needs are catered to even in bio challenges."
                        img2={financeImg2}
                    />
                </section>
                {/* Asset Management */}
                <section id="asset-management" className="w-full">
                    <ServicesSub
                        heading="Asset Management"
                        classname=""
                        title1="Asset Management"
                        description1="Asset Lifecycle Management Keep your asset value at an all-time high by employing strategies that are conducive towards its life cycle management. We assist you in purchasing, maintaining, and replacing or renewing assets while also looking out for financial efficiency and combining our strategy with your goals. "
                        img1={assetImg1}
                        title2="Portfolio Optimization"
                        description2="With our assistance, ensure a diverse and expanding portfolio of the assets. We apply advanced methods to assess the assets, find the weak areas in the portfolio, and formulate strategies for the enhancement of the return and the minimization of the risk factors. Our methodology helps ensure that the assets are not squandered and instead are employed efficiently and for the long term."
                        img2={assetImg2}
                    />
                </section>
                {/* Asset Management */}
                <section id="it-services" className="lg:mb-[50px] md:mb-[40px]  md:mb-[30px] mb-[20px] w-full">
                    <ServicesSub
                        heading="IT Services"
                        classname="bg_common"
                        title1="Application and Web Development"
                        description1="Breathe life into your vision using top app and website creations. We at our company specialize in designing responsive websites and feature-rich mobile applications, with the focus placed on functionality and user experience scalability, ensuring you get the kind of engagement results you need through your digital channels."
                        img1={financeImg1}
                        title2="Digital Transformation Solutions"
                        description2="Improve your business with the best-in-class digital tools and technologies. From cloud integration to workflow automation, we will modernize your processes for higher efficiency and agility. Our IT consulting services make sure your business takes advantage of technology to keep you ahead of the curve in the changing digital world."
                        img2={financeImg2}
                    />
                </section>
            </div>
            <ConnectButtons/>
        </div>
    );
}

export default OurServices;
