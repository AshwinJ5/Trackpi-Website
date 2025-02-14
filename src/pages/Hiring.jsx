import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


function Hiring() {
    const options = { threshold: 0.1 };

    const [refIntro, inViewIntro] = useInView(options);
    const [refAbout, inViewAbout] = useInView(options);
    const [refRole, inViewRole] = useInView(options);

    return (
        <div>
            <section ref={refIntro} className="flex justify-center items-center p-5 w-full">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inViewIntro ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                >
                    <h1 className="text-5xl md:text-7xl text-amber-500 hiring_heading">Hiring & Retention</h1>
                </motion.div>
            </section>

            <section ref={refAbout} className="pb-10 px-10">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <motion.div
                        className="md:w-1/2 p-4 w-100"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inViewAbout ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    >
                        <h1 className="text-4xl text-amber-500 font-bold mb-4">
                            About our
                            <br />
                            Hiring Process
                        </h1>
                        <p style={{ textAlign: "justify" }} className="text-xl md:text-justify md:text-lg">
                            We experiment with our own hiring practice to attract and choose people based on demonstrable
                            skills rather than experience, identity, or connections. We want to minimize bias as much as
                            possible, which is why we won’t ask for your resume. Instead, we anonymously review answers to a
                            series of application questions and our interviews are designed as experiential working
                            sessions—rather than performative Q&As—to give insight into what working with The Ready might
                            actually feel like.
                        </p>
                    </motion.div>
                    <div className="md:w-1/2 p-4 w-100">
                        <motion.img
                            src="/assets/images/hiring.jpg"
                            alt="Hiring Process"
                            className="w-full rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: -50 }}
                            animate={inViewAbout ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </section>

            <section ref={refRole} className="pb-10 px-10">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 p-4 w-100"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inViewRole ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    >
                        <h1 className="text-4xl text-amber-500 font-bold mb-4">Transformer Role</h1>
                        <p style={{ textAlign: "justify" }} className="text-xl md:text-justify md:text-lg">
                            The majority of our members at The Ready are in the Transformer role (what we call our
                            “consultants” here). We regularly open our Transformer hiring process, as our business is
                            growing and expanding.
                        </p>
                    </motion.div>
                    <div className="md:w-1/2 p-4 w-100">
                        <motion.img
                            src="/assets/images/consult.jpg"
                            alt="Transformer Role"
                            className="w-full rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: 50 }}
                            animate={inViewRole ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hiring;
