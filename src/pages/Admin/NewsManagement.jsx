import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import editImg from "../../images/editbtn.svg";
import deleteImg from "../../images/deleteimg.svg";
import AddNews from "../../components/AddNews";
import EditNews from "../../components/EditNews";
import DeletePopUp from "../../components/Admin/DeletePopUp";
import baseURL from "../../Api Services/baseURL";
import { SERVER_URL } from "../../Api Services/serverUrl";
import { toast } from "react-toastify";

const NewsManagement = () => {
    const [activeTab, setActiveTab] = useState("add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allNewsData, setAllNewsData] = useState([]);
    const [newDatas, setNewDatas] = useState("");
    const [idOfCard, setIdOfCard] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [dataDeleted, setDataDeleted] = useState("");
    const [headingEditMode, setHeadingEditMode] = useState(false);

    const [heading, setHeading] = useState({ newsHeading: "" });

    const navigate = useNavigate();
    const location = useLocation();

    const adminToken = localStorage.getItem("adminToken");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabFromUrl = queryParams.get("tab");
        if (tabFromUrl) {
            setActiveTab(tabFromUrl);
        }
    }, [location.search]);

    const getAllNews = async () => {
        try {
            const response = await baseURL.get("/api/news/newsdetails", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (response.data && response.data.length > 0) {
                setAllNewsData(response.data);
            }
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    const getAllHeadings = async () => {
        try {
            const response = await baseURL.get("/api/headingfornewspatnership/getallheading");
            if (response.data && response.data.length > 0) {
                setHeading(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching haeding data:", error);
        }
    };

    useEffect(() => {
        getAllNews();
        getAllHeadings();
    }, []);

    const editNewsFile = (newsData, tabName, index) => {
        setActiveTab(tabName);
        navigate(`?tab=${tabName}`);
        setNewDatas(newsData.news);
        setIdOfCard(index);
        const element = document.getElementById("editNewsContent");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const deleteANews = async () => {
        try {
            await baseURL.delete(`/api/news/newsdetails/${deleteId}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            toast.success("News details deleted successfully");
            getAllNews();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    const backToAddTab = () => {
        setActiveTab("add");
        navigate("?tab=add");
    };

    const editHeading = async (e) => {
        e.preventDefault();
        try {
            const formDatas = new FormData();
            formDatas.append("newsHeading", heading.newsHeading);

            const response = await baseURL.patch("/api/headingfornewspatnership/updateallheading", formDatas, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                toast.success("Heading updated successfully!");
                getAllHeadings();
                setHeadingEditMode(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setHeadingEditMode(false);
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else if (error.response.status === 304) {
                toast.info("No changes detected");
            } else {
                setHeadingEditMode(false);
                toast.error("An error occurred while updating heading.");
                console.error("Error updating heading:", error);
            }
        }
    };

    return (
        <div className="bg-white w-full">
            <div className="py-[40px] px-[30px] grid gap-[30px]">
                <h1 className="text-[24px] font-bold mb-4">News Management</h1>
                <div className="grid gap-[50px]">
                    <div className="grid gap-[10px]">
                        <label className="block text-[14px] font-semibold">Heading</label>
                        <form onSubmit={editHeading} className="flex items-center gap-[20px]">
                            <input
                                readOnly={!headingEditMode}
                                type="text"
                                value={heading.newsHeading}
                                onChange={(e) => setHeading({ ...heading, newsHeading: e.target.value })}
                                className="border partnerInput rounded-lg px-[15px] h-[45px] w-3/5 text-[20px] font-bold"
                            />
                            {!headingEditMode ? (
                                <button
                                    className="bg-[#FF9D00] p-[10px] rounded-[8px]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setHeadingEditMode(true);
                                    }}
                                >
                                    <img src={editImg} alt="Edit" />
                                </button>
                            ) : (
                                <div className=" flex justify-start gap-[10px]">
                                    <button
                                        className=" w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white h-[45px]"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className=" h-[45px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHeadingEditMode(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="grid partnerContainer border rounded-[20px] gap-[40px] p-[30px]">
                        <div className="flex justify-center gap-[70px] py-1">
                            <button className={`px-[30px] py-[10px] rounded-[10px] font-bold newsBtnActive`}>
                                {activeTab === "add" ? "Add News" : "Edit News"}
                            </button>
                        </div>
                        <div id="editNewsContent">
                            {activeTab === "add" ? (
                                <AddNews newsData={allNewsData} getAllNews={getAllNews} />
                            ) : (
                                <EditNews
                                    editOnclickForBack={backToAddTab}
                                    newsData={newDatas}
                                    index={idOfCard}
                                    getAllNews={getAllNews}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <section className="flex flex-wrap justify-between gap-[30px] w-full">
                    {allNewsData.length > 0 ? (
                        allNewsData.map((news, index) => (
                            <div className="grid gap-[10px] mx-auto" key={index}>
                                <div className="text-[18px] font-bold max-w-[300px]">News {index + 1}</div>
                                <div className="relative grid gap-[16px] w-[300px] aspect-[28/30] mx-auto bg-black text-white rounded-[6px]">
                                    <div className="absolute w-[300px] aspect-[28/30] rounded-[6px] opacity-[0] hover:opacity-[1] transition-opacity duration-300 cursor-pointer flex justify-between items-end">
                                        <div
                                            onClick={() => editNewsFile({ news }, "edit", index)}
                                            className="bg-[#FF9D00] w-[60px] h-[56px] rounded-bl-[6px] rounded-tr-[90%]"
                                        >
                                            <img
                                                src={editImg}
                                                alt="Edit"
                                                className="h-[24px] w-[24px] relative top-[18px] left-[14px]"
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setDataDeleted(`News ${index + 1}`);
                                                setDeleteId(news._id);
                                            }}
                                            className="bg-[#FF9D00] w-[60px] h-[56px] rounded-br-[6px] rounded-tl-[90%]"
                                        >
                                            <img
                                                src={deleteImg}
                                                alt="Delete"
                                                className="h-[24px] w-[24px] relative top-[18px] left-[21px]"
                                            />
                                        </div>
                                    </div>
                                    <img
                                        src={`${SERVER_URL}${news.newsFile}`}
                                        className="w-full h-full rounded-[6px]"
                                        alt={`News ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No news available</p>
                    )}
                </section>
            </div>

            {isModalOpen && (
                <DeletePopUp
                    onClose={() => setIsModalOpen(false)}
                    dataDeleted={dataDeleted}
                    datas="News"
                    functions={deleteANews}
                />
            )}
        </div>
    );
};

export default NewsManagement;
