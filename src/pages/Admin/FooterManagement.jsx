import React, { useEffect, useRef, useState } from "react";
import editImg from "../../images/editbtn.svg";
import uploadImg from "../../images/uploadimg.svg";
import baseURL from "../../Api Services/baseURL";
import { SERVER_URL } from "../../Api Services/serverUrl";
import { toast } from "react-toastify";

const FooterManagement = () => {
    const [fileNameImage, setFileNameImage] = useState("Upload Image");
    const [fileNameVideo1, setFileNameVideo1] = useState("Upload Video");
    const [fileNameVideo2, setFileNameVideo2] = useState("Upload Video");
    const [fileNameVideo3, setFileNameVideo3] = useState("Upload Video");
    const [videoEditMode1, setVideoEditMode1] = useState(false);
    const [videoEditMode2, setVideoEditMode2] = useState(false);
    const [videoEditMode3, setVideoEditMode3] = useState(false);
    const [imageEditMode, setImageEditMode] = useState(false);
    const [imageHeadingEditMode, setImageHeadingEditMode] = useState(false);
    const [videoHeading1EditMode, setVideoHeading1EditMode] = useState(false);
    const [bannerHeading2EditMode, setBannerHeading2EditMode] = useState(false);

    const [footerVideoDetails, setFooterVideoDetails] = useState({});
    const [footerVideo, setFooterVideo] = useState({});

    const adminToken = localStorage.getItem("adminToken");

    const getAllFooterDatas = async () => {
        try {
            const response = await baseURL.get("/api/footer/getfooterdetails", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (response.data && response.data.length > 0) {
                setFooterVideoDetails(response.data[0]);
                setFooterVideo(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching footer data:", error);
        }
    };

    useEffect(() => {
        getAllFooterDatas();
    }, []);
    // console.log(footerVideoDetails);
    const editFooterDetailMainHeading=async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("videoheading", footerVideoDetails.videoheading);

            const response = await baseURL.patch(`/api/footer/updatefooterdetails`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                getAllFooterDatas();
                toast.success("Footer Heading updated successfully!");
                setVideoHeading1EditMode(false)
            }
        } catch (error) {
            console.error("Error in updating footer heading:", error);
            // setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating footer heading.");
            }
        }
    }
    const editFooterDetailSubHeading=async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("imageheading", footerVideoDetails.imageheading);

            const response = await baseURL.patch(`/api/footer/updatefooterdetails`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                getAllFooterDatas();
                toast.success("Footerbanner Heading updated successfully!");
                setImageHeadingEditMode(false)
            }
        } catch (error) {
            console.error("Error in updating footerbanner heading:", error);
            // setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating footerbanner heading.");
            }
        }
    }

    const editFooterDetails = async (e) => {
        e.preventDefault();
        if (!videoEditMode1 && !videoEditMode2 && !videoEditMode3) {
            toast.error("Please select any footer field to be updated");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("videofile1", footerVideoDetails.videofile1);
            formData.append("videourl1", footerVideoDetails.videourl1);
            formData.append("videofile2", footerVideoDetails.videofile2);
            formData.append("videourl2", footerVideoDetails.videourl2);
            formData.append("videofile3", footerVideoDetails.videofile3);
            formData.append("videourl3", footerVideoDetails.videourl3);
            // formData.append("videoheading", footerVideoDetails.videoheading);

            const response = await baseURL.patch(`/api/footer/updatefooterdetails`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                getAllFooterDatas();
                toast.success("Footer Details updated successfully!");
                setVideoEditMode1(false);
                setVideoEditMode2(false);
                setVideoEditMode3(false);
                setFileNameVideo1("Upload Video");
                setFileNameVideo2("Upload Video");
                setFileNameVideo3("Upload Video");
            }
        } catch (error) {
            console.error("Error in updating footer details:", error);
            // setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating footer details.");
            }
        }
    };
    const editFooterBannerDetails = async (e) => {
        e.preventDefault();
        if (!imageEditMode && !imageHeadingEditMode) {
            toast.error("Please select banner edit button");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("imagefile", footerVideoDetails.imagefile);
            // formData.append("imageheading", footerVideoDetails.imageheading);

            const response = await baseURL.patch(`/api/footer/updatefooterdetails`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                getAllFooterDatas();
                toast.success("Footer Details updated successfully!");
                setImageEditMode(false);
                setImageHeadingEditMode(false);
                setFileNameImage("Upload Image");
            }
        } catch (error) {
            console.error("Error in updating footer details:", error);
            // setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating footer details.");
            }
        }
    };

    const uploadVideoAdd1 = (e) => {
        const file1 = e.target.files[0];
        if (file1) {
            if (["video/mp4", "video/avi"].includes(file1.type)) {
                setFooterVideoDetails({ ...footerVideoDetails, videofile1: file1 });
                setFileNameVideo1(file1.name);
            } else {
                toast.info("Please upload a file in AVI, MP4 format.");
                setFooterVideoDetails({ ...footerVideoDetails, videofile1: null });
                setFileNameVideo1("Upload Video");
            }
        }
    };

    const uploadVideoAdd2 = (e) => {
        const file2 = e.target.files[0];
        if (file2) {
            if (["video/mp4", "video/avi"].includes(file2.type)) {
                setFooterVideoDetails({ ...footerVideoDetails, videofile2: file2 });
                setFileNameVideo2(file2.name);
            } else {
                toast.info("Please upload a file in AVI, MP4 format.");
                setFooterVideoDetails({ ...footerVideoDetails, videofile2: null });
                setFileNameVideo2("Upload Video");
            }
        }
    };
    const uploadVideoAdd3 = (e) => {
        const file3 = e.target.files[0];
        console.log(file3.type);

        if (file3) {
            if (["video/mp4", "video/avi"].includes(file3.type)) {
                setFooterVideoDetails({ ...footerVideoDetails, videofile3: file3 });
                setFileNameVideo3(file3.name);
            } else {
                toast.info("Please upload a file in AVI, MP4 format.");
                setFooterVideoDetails({ ...footerVideoDetails, videofile3: null });
                setFileNameVideo3("Upload Video");
            }
        }
    };
    const uploadImageAdd = (e) => {
        const file4 = e.target.files[0];
        if (file4) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file4.type)) {
                setFooterVideoDetails({ ...footerVideoDetails, imagefile: file4 });
                setFileNameImage(file4.name);
            } else {
                toast.info("Please upload a file in JPG, JPEG, or PNG format.");
                setFooterVideoDetails({ ...footerVideoDetails, imagefile: null });
                setFileNameImage("Upload Image");
            }
        }
    };
    const cancelFooterUpdate = async () => {
        setVideoEditMode1(false);
        setVideoEditMode2(false);
        setVideoEditMode3(false);
        setFileNameVideo1("Upload Video");
        setFileNameVideo2("Upload Video");
        setFileNameVideo3("Upload Video");
        getAllFooterDatas();
    };
    const cancelBannerUpdate = async () => {
        setImageEditMode(false);
        setImageHeadingEditMode(false);
        setFileNameVideo3("Upload Image");
        setFileNameImage("Upload Image");
        getAllFooterDatas();
    };
    const inputRefHeading = useRef(null);
    const inputRefHeading2 = useRef(null);
    const inputRefVideo1 = useRef(null);
    const inputRefVideo2 = useRef(null);
    const inputRefVideo3 = useRef(null);

    return (
        <div className="bg-white w-[calc(100vw-300px)]">
            <div className="py-[40px] px-[30px] grid gap-[40px] w-full">
                <div className="text-[24px] font-bold mb-4">Footer Management</div>
                <div className="bg-white partnerContainer border rounded-lg grid p-[30px] gap-[30px]">
                    <form className="grid gap-[30px] py-[20px]">
                        <div className=" grid gap-[10px]">
                            <label className="block text-[14px] font-semibold">Heading</label>
                            <div className="flex items-center gap-[20px]">
                                <input
                                 ref={inputRefHeading}
                                    readOnly={!videoHeading1EditMode}

                                    value={footerVideoDetails.videoheading}
                                    onChange={(e) =>
                                        setFooterVideoDetails({ ...footerVideoDetails, videoheading: e.target.value })
                                    }
                                    type="text"
                                    className="border partnerInput rounded-lg px-[15px] h-[45px] w-1/2 text-[20px] font-semibold"
                                />
                                {/* <button type="submit" className="bg-[#FF9D00] p-[10px] rounded-[8px] h-[45px] w-[45px]"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    videoHeadingEditMode?setVideoHeadingEditMode(false):setVideoHeadingEditMode(true)
                                }}>
                                    <img src={editImg} alt="" />
                                </button> */}
                                {!videoHeading1EditMode ? (
                                    <button
                                        className="bg-[#FF9D00] p-[10px] rounded-[8px]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setVideoHeading1EditMode(true);
                                            inputRefHeading.current.focus();
                                        }}
                                    >
                                        <img src={editImg} alt="Edit" />
                                    </button>
                                ) : (
                                    <div className=" flex justify-start gap-[10px]">
                                        <button
                                            className=" w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white h-[45px]"
                                            onClick={editFooterDetailMainHeading}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className=" h-[45px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setVideoHeading1EditMode(false);
                                                getAllFooterDatas();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid py-[20px] gap-[30px] ">
                            <div className="flex  gap-[40px] items-center w-100">
                                <div className="flex justify-between gap-[30px] w-100 items-center">
                                    <div className="videoBtn min-w-[120px] text-center">Video 1</div>
                                    <input
                                    ref={inputRefVideo1}
                                        readOnly={!videoEditMode1}
                                        className="px-[20px] py-[15px] footerBanner outline-none rounded-[10px] w-100 border"
                                        type="text"
                                        placeholder="Video Link"
                                        value={footerVideoDetails.videourl1}
                                        onChange={(e) =>
                                            setFooterVideoDetails({ ...footerVideoDetails, videourl1: e.target.value })
                                        }
                                    />
                                    <div className="relative me-10">
                                        <input
                                            type="file"
                                            id="fileInput1"
                                            className="hidden"
                                            onChange={uploadVideoAdd1}
                                            disabled={!videoEditMode1}
                                        />
                                        <label
                                            htmlFor="fileInput1"
                                            className="uploadBtn flex items-center justify-center min-w-[200px] gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
                                        >
                                            {/* {fileName1 ? (
                                                <>
                                                    <span>
                                                        {fileName1.length > 15
                                                            ? `${fileName1.substring(0, 15)}...`
                                                            : fileName1}
                                                    </span>
                                                    <button
                                                        onClick={handleRemoveFile1}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <> */}
                                            <div>{fileNameVideo1}</div>
                                            <img src={uploadImg} alt="Upload Icon" />
                                            {/* </>
                                            )} */}
                                        </label>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            videoEditMode1 ? setVideoEditMode1(false) : setVideoEditMode1(true);
                                            inputRefVideo1.current.focus()

                                        }}
                                        className="bg-[#FF9D00] min-h-[44px] min-w-[44px] p-[10px] rounded-[8px]"
                                    >
                                        <img src={editImg} alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-[40px] items-center w-100">
                                <div className="flex justify-between gap-[30px] w-100 items-center">
                                    <div className="videoBtn min-w-[120px] text-center">Video 2</div>
                                    <input
                                        ref={inputRefVideo2}
                                        readOnly={!videoEditMode2}
                                        className="px-[20px] py-[15px] footerBanner outline-none rounded-[10px] w-100 border"
                                        type="text"
                                        placeholder="Video Link"
                                        value={footerVideoDetails.videourl2}
                                        onChange={(e) =>
                                            setFooterVideoDetails({ ...footerVideoDetails, videourl2: e.target.value })
                                        }
                                    />
                                    <div className="relative me-10">
                                        <input
                                            type="file"
                                            id="fileInput2"
                                            className="hidden"
                                            onChange={uploadVideoAdd2}
                                            disabled={!videoEditMode2}
                                        />
                                        <label
                                            htmlFor="fileInput2"
                                            className="uploadBtn flex items-center justify-center min-w-[200px] gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
                                        >
                                            {/* {fileName2 ? (
                                                <>
                                                    <span>
                                                        {fileName2.length > 15
                                                            ? `${fileName2.substring(0, 15)}...`
                                                            : fileName2}
                                                    </span>
                                                    <button
                                                        onClick={handleRemoveFile2}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <> */}
                                            <div>{fileNameVideo2}</div>
                                            <img src={uploadImg} alt="Upload Icon" />
                                            {/* </>
                                            )} */}
                                        </label>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            videoEditMode2 ? setVideoEditMode2(false) : setVideoEditMode2(true);
                                            inputRefVideo2.current.focus()
                                        }}
                                        className="bg-[#FF9D00] min-h-[44px] min-w-[44px] p-[10px] rounded-[8px]"
                                    >
                                        <img src={editImg} alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-[40px] items-center w-100">
                                <form className="flex justify-between gap-[30px] w-100 items-center">
                                    <div className="videoBtn min-w-[120px] text-center">Video 3</div>
                                    <input
                                    ref={inputRefVideo3}
                                        readOnly={!videoEditMode3}
                                        className="px-[20px] py-[15px] footerBanner outline-none rounded-[10px] w-100 border"
                                        type="text"
                                        placeholder="Video Link"
                                        value={footerVideoDetails.videourl3}
                                        onChange={(e) =>
                                            setFooterVideoDetails({ ...footerVideoDetails, videourl3: e.target.value })
                                        }
                                    />
                                    <div className="relative me-10">
                                        <input
                                            type="file"
                                            id="fileInput3"
                                            className="hidden"
                                            onChange={uploadVideoAdd3}
                                            disabled={!videoEditMode3}
                                        />
                                        <label
                                            htmlFor="fileInput3"
                                            className="uploadBtn flex items-center justify-center min-w-[200px] gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
                                        >
                                            {/* {fileName3 ? (
                                                <>
                                                    <span>
                                                        {fileName3.length > 15
                                                            ? `${fileName3.substring(0, 15)}...`
                                                            : fileName3}
                                                    </span>
                                                    <button
                                                        onClick={handleRemoveFile3}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <> */}
                                            <div>{fileNameVideo3}</div>
                                            <img src={uploadImg} alt="Upload Icon" />
                                            {/* </>
                                            )} */}
                                        </label>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            videoEditMode3 ? setVideoEditMode3(false) : setVideoEditMode3(true);
                                            inputRefVideo3.current.focus()
                                        }}
                                        className="bg-[#FF9D00] min-h-[44px] min-w-[44px] p-[10px] rounded-[8px]"
                                    >
                                        <img src={editImg} alt="" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className=" flex justify-center gap-[30px]">
                            <button
                                className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white"
                                onClick={editFooterDetails}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                onClick={cancelFooterUpdate}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-around gap-[60px]">
                        <a
                            target="_blank"
                            href={`${footerVideo.videourl1}`}
                            className="aspect-[9/16] cursor-pointer max-h-[500px] text-decoration-none"
                        >
                            <video
                                muted
                                autoPlay
                                loop
                                className=" rounded-[10px] "
                                src={`${SERVER_URL}${footerVideo.videofile1}`}
                            ></video>
                        </a>
                        <a
                            target="_blank"
                            href={`${footerVideo.videourl2}`}
                            className="aspect-[9/16] cursor-pointer max-h-[500px] text-decoration-none"
                        >
                            <video
                                muted
                                autoPlay
                                loop
                                className=" rounded-[10px] "
                                src={`${SERVER_URL}${footerVideo.videofile2}`}
                            ></video>
                        </a>
                        <a
                            target="_blank"
                            href={`${footerVideo.videourl3}`}
                            className="aspect-[9/16] cursor-pointer max-h-[500px] text-decoration-none"
                        >
                            <video
                                muted
                                autoPlay
                                loop
                                className=" rounded-[10px] "
                                src={`${SERVER_URL}${footerVideo.videofile3}`}
                            ></video>
                        </a>
                    </div>
                </div>
                <div className="bg-white partnerContainer  border rounded-lg grid p-[30px] gap-[30px]">
                    <form className="grid gap-[30px]">
                        <div className=" grid gap-[10px]">
                            <label className="block text-[14px] font-semibold">Banner Heading</label>
                            <div className="flex items-center gap-[20px]">
                                <input
                                ref={inputRefHeading2}
                                    readOnly={!imageHeadingEditMode}
                                    value={footerVideoDetails.imageheading}
                                    onChange={(e) =>
                                        setFooterVideoDetails({ ...footerVideoDetails, imageheading: e.target.value })
                                    }
                                    type="text"
                                    defaultValue="Want to Learn More"
                                    className="border partnerInput rounded-lg px-[15px] h-[45px] w-3/5 text-[20px] font-semibold"
                                />
                                {!imageHeadingEditMode ? (
                                    <button
                                        className="bg-[#FF9D00] p-[10px] rounded-[8px]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setImageHeadingEditMode(true);
                                            inputRefHeading2.current.focus();
                                        }}
                                    >
                                        <img src={editImg} alt="Edit" />
                                    </button>
                                ) : (
                                    <div className=" flex justify-start gap-[10px]">
                                        <button
                                            className=" w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white h-[45px]"
                                            onClick={editFooterDetailSubHeading }
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className=" h-[45px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageHeadingEditMode(false);
                                                getAllFooterDatas();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-[30px] items-center justify-start">
                            <div className="relative w-[250px] ">
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={uploadImageAdd}
                                    disabled={!imageEditMode}
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
                                >
                                    {/* {fileName ? (
                                        <>
                                            <span>
                                                {fileName.length > 15 ? `${fileName.substring(0, 15)}...` : fileName}
                                            </span>
                                            <button
                                                onClick={handleRemoveFile}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    ) : (
                                        <> */}
                                    <div>{fileNameImage}</div>
                                    <img src={uploadImg} alt="Upload Icon" />
                                    {/* </>
                                    )} */}
                                </label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-[#FF9D00] p-[10px] rounded-[8px]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        imageEditMode ? setImageEditMode(false) : setImageEditMode(true);
                                    }}
                                >
                                    <img src={editImg} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className=" flex justify-center gap-[30px]">
                            <button
                                type="submit"
                                className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white"
                                onClick={editFooterBannerDetails}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                onClick={cancelBannerUpdate}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div>
                        <img
                            className="w-100 rounded-[20px] footerBanner"
                            src={`${SERVER_URL}${footerVideo.imagefile}`}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterManagement;
