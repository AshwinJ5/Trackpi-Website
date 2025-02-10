function ConnectUsPopup({ project, onClose }) {
    return (
        <div className="flex flex-col items-center justify-center absolute z-[10000] connectusModalMain">
            <div
                className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50  "
                onClick={() => setIsModalOpen(false)}
            >
                <div
                    className="bg-[rgba(250,245,240)]  rounded-[15px] lg:rounded-[30px] shadow-lg max-w-[300px] sm:max-w-[500px]  md:max-w-[650px] lg:max-w-[700px] xl:max-w-[790px] connectPopupDivOuter "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className={`relative z-[1] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px]   grid ${
                            !project
                                ? "gap-[15px] sm:gap-[18px] md:gap-[20px] lg:gap-[25px] xl:gap-[30px]"
                                : "gap-[15px] sm:gap-[18px] md:gap-[20px] lg:gap-[25px] xl:gap-[30px]"
                        } connectusModal rounded-[15px] lg:rounded-[30px]`}
                    >
                        <div
                            className="font-semibold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[34px]
 text-center headingOne"
                        >
                            {project ? "Your Idea is in Motion!" : "You Are Definitely on the Right Path!"}
                        </div>
                        {!project ? (
                            <div
                                className="font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[22px]
 text-center  grid gap-[10px] sm:gap-[18px] md:gap-[20px] lg:gap-[25px] xl:gap-[30px]
 headingTwo"
                            >
                                <div>Thank you for contacting us!</div>
                                <div>
                                    Your application form has been received and is in our system. A supporting agent will be
                                    in contact with you shortly.
                                </div>
                            </div>
                        ) : (
                            <div
                                className="font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[22px]
 text-center  headingTwo"
                            >
                                Thank you for sharing your business idea with us! We have received your details, and our
                                team will review them shortly.
                            </div>
                        )}

                        <div
                            className={`font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] xl:text-[20px]
  text-center headingThree`}
                        >
                            {project ? (
                                <div className="gap-[15px] sm:gap-[18px] md:gap-[20px] lg:gap-[25px] xl:gap-[30px] grid sectionBetween">
                                    <div>
                                        We appreciate your trust and look forward to connecting with you soon to discuss the
                                        next steps.
                                    </div>
                                    <div>Stay tuned!</div>
                                </div>
                            ) : (
                                "We are always ready to serve your needs!"
                            )}
                        </div>

                        <div className="mx-auto">
                            <div
                                className="w-[70px] sm:w-[90px] md:w-[120px] lg:w-[160px] xl:w-[180px]
 rounded-[6px]  sm:rounded-[9px] lg:rounded-[12px] py-[8px] sm:py-[9px] lg:py-[10px]  cursor-pointer text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px]
 font-semibold text-white bg-gradient-to-r from-[#FEDC3F]  to-[#FF9D00] sectionOne"
                                onClick={onClose}
                            >
                                Okay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectUsPopup;
