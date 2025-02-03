import React, { useEffect, useState } from "react";
import uploadImg from "../images/uploadimg.svg";
import baseURL from "../Api Services/baseURL";
import { toast } from "react-toastify";

function AddNews({ newsData, getAllNews }) {
    const [fileName, setFileName] = useState("Upload Image");
    const [newsDatas, setNewsDatas] = useState({
        newsLink: "",
        newsFile: null,
    });

    const adminToken = localStorage.getItem("adminToken");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)&& file.size < 5 * 1024 * 1024) {
                setNewsDatas({ ...newsDatas, newsFile: file });
                setFileName(file.name);
            } else {
                toast.info("Upload a JPG, JPEG, or PNG file under 5 MB.");
                setNewsDatas({ ...newsDatas, newsFile: null });
                setFileName("Upload Image");
            }
        }
    };

    const addNewNewsData = async (e) => {
        e.preventDefault();
        if (!newsDatas.newsLink || !newsDatas.newsFile) {
            toast.info("All fields are required!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("newsLink", newsDatas.newsLink);
            formData.append("newsFile", newsDatas.newsFile);

            const response = await baseURL.post("/api/news/news", formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });            

            if (response.status === 200) {
                getAllNews()
                toast.success("News added successfully!");
                setNewsDatas({ newsLink: "", newsFile: null });
                setFileName("Upload Image");
            }
        } catch (error) {
            console.error("Error adding news:", error);
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while adding news data.");
            }
        }
    };

    return (
        <form className="grid gap-[40px]">
            <div className="flex justify-between items-end w-100">
                <div className=" w-[103px] h-[42px] text-[18px] font-bold rounded-[10px] mx-auto newsBtn flex items-center">
                <span className="mx-auto">News {newsData.length + 1}</span> 
                </div>
                <div className="w-[500px]">
                    <div className="grid gap-[10px]">
                        <label className="block text-[14px] font-semibold">News Link</label>
                        <input
                            value={newsDatas.newsLink}
                            onChange={(e) => setNewsDatas({ ...newsDatas, newsLink: e.target.value })}
                            type="text"
                            placeholder="Link"
                            className="border rounded-[10px] px-[20px] py-[10px] text-[14px] partnerInput"
                        />
                    </div>
                </div>
                <div className="relative w-[250px] h-max mx-auto">
                    <div className="text-[12px] font-semibold text-red-400 mb-2">*Please upload an image of aspect ratio 1:1  (eg: 1075px * 1075px)</div>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="fileInput"
                        className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] h-[42px] rounded-[10px] text-[#FF9D00] cursor-pointer"
                    >
                        <div>{fileName}</div>
                        <img src={uploadImg} alt="Upload Icon" />
                    </label>
                </div>
            </div>
            <div className="flex justify-center gap-[30px]">
                <button
                    type="submit"
                    className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-semibold text-white"
                    onClick={addNewNewsData}
                >
                    Add
                </button>
                <button
                    type="button"
                    className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                    onClick={() => {
                        setNewsDatas({ newsLink: "", newsFile: null });
                        setFileName("Upload Image");
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddNews;
