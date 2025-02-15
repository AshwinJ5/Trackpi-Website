import React, { useEffect, useState } from "react";

import baseURL from "../Api Services/baseURL";
import { toast } from "react-toastify";

function EditNews({ newsData, editOnclickForBack, index, getAllNews }) {
    const [fileName, setFileName] = useState("Upload Image");
    const adminToken = localStorage.getItem("adminToken");

    const [editNewsData, setEditNewsData] = useState({
        newsFile: "",
        newsLink: "",
    });

    useEffect(() => {
        if (newsData) {
            setEditNewsData({
                newsFile: newsData.newsFile,
                newsLink: newsData.newsLink,
            });
            setFileName(newsData.newsFile ? newsData.newsFile.name || "Existing File" : "Upload Image");
        }
    }, [newsData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file.type) && file.size < 5 * 1024 * 1024) {
                setEditNewsData({ ...editNewsData, newsFile: file });
                setFileName(file.name);
            } else {
                toast.info("Upload a JPG, JPEG, or PNG file under 5 MB.")
                setFileName("Upload Image");
                setEditNewsData({ ...editNewsData, newsFile: "" });
            }
        }
    };

    const editNewsDataDetails = async (e) => {
        e.preventDefault();
        if (!editNewsData.newsLink || !editNewsData.newsFile) {
            toast.info("Both News Link and Image are required!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("newsLink", editNewsData.newsLink);
            formData.append("newsFile", editNewsData.newsFile);

            const response = await baseURL.put(`/api/news/news/${newsData._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("News updated successfully!");
                editOnclickForBack();
                getAllNews();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else if (error.response.status === 304) {
                toast.info("No changes detected");
            } else {
                toast.error("An error occurred while updating news.");
                console.error("Error updating news:", error);
            }
        }
    };

    return (
        <form className="grid gap-[40px]" onSubmit={editNewsDataDetails}>
            <div className="flex justify-between items-end">
                <div className=" w-[103px] h-[42px] text-[18px] font-bold rounded-[10px] mx-auto newsBtn flex items-center">
                    <span className="mx-auto">News {index + 1}</span> 
                </div>

                <div className="w-[500px]">
                    <div className="grid gap-[10px]">
                        <label className="block text-[14px] font-semibold">News Link</label>
                        <input
                            type="text"
                            placeholder="Link"
                            value={editNewsData.newsLink}
                            onChange={(e) => setEditNewsData({ ...editNewsData, newsLink: e.target.value })}
                            className="border rounded-[10px] px-[20px] py-[10px] text-[14px] partnerInput"
                        />
                    </div>
                </div>

                <div className="relative w-[250px] h-max mx-auto">
                <div className="text-[12px] font-semibold text-red-400 mb-2">*Please upload an image of aspect ratio 1:1  (eg: 1075px * 1075px)</div>                    
                <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                    <label
                        htmlFor="fileInput"
                        className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] rounded-[10px] h-[42px] text-[#FF9D00] cursor-pointer"
                    >
                        <div>{fileName}</div>
                        <img src="/assets/svg/uploadimg.svg" alt="Upload Icon" />
                    </label>
                </div>
            </div>

            <div className="flex justify-center gap-[30px]">
                <button type="submit" className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white">
                    Save
                </button>
                <button
                    type="button"
                    className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                    onClick={() => {
                        editOnclickForBack();
                        setEditNewsData({
                            newsFile: newsData.newsFile,
                            newsLink: newsData.newsLink,
                        });
                        setFileName(newsData.newsFile ? newsData.newsFile.name || "Existing File" : "Upload Image");
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditNews;
