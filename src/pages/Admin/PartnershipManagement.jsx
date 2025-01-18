import React, { useEffect, useState } from "react";
import editImg from "../../images/editbtn.svg";
import uploadImg from "../../images/uploadimg.svg";
import deleteImg from "../../images/deleteimg.svg";
import "../../CSS/partnershipAdmin.css";
import DeletePopUp from "../../components/Admin/DeletePopUp";
import baseURL from "../../Api Services/baseURL";
import { toast } from 'react-toastify';

const PartnershipManagement = () => {
    // store all datas from database
    const [allPartnersData, setAllPartnersData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [patnershipDatas, setPatnershipDatas] = useState({
        companylogo: null,
        companyname: "",
        description: "",
    });
    const [editPartnershipDatas, setEditPartnershipDatas] = useState({});
    const [fileName, setFileName] = useState("Upload Image");
        const [headingEditMode, setHeadingEditMode] = useState(false);
        const [subHeadingEditMode, setSubHeadingEditMode] = useState(false);
            const[heading,setHeading]=useState({})
        
    
    // console.log(editPartnershipDatas);

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataDeleted, setDataDeleted] = useState("");

    // const handleFileChange1 = (event) => {
    //     const file1 = event.target.files[0];
    //     if (file1) {
    //         setFileName1(file1.name);
    //     }
    // };
    // const handleRemoveFile1 = () => {
    //     setFileName1(null);
    //     document.getElementById("fileInput1").value = "";
    // };

    const uploadImageAdd = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                setPatnershipDatas({ ...patnershipDatas, companylogo: file });
                setFileName(file.name);
            } else {
                toast.info("Please upload a file in JPG, JPEG, or PNG format.");
                setPatnershipDatas({ ...patnershipDatas, companylogo: null });
                setFileName("Upload Image");
            }
        }
    };

    const uploadImageEdit = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                setEditPartnershipDatas({ ...editPartnershipDatas, companylogo: file });
                setFileName(file.name);
            } else {
                toast.info("Please upload a file in JPG, JPEG, or PNG format.");
                setEditPartnershipDatas({});
                setFileName("Upload Image");
            }
        }
    };

    const scrollToContainer = () => {
        const targetElement = document.getElementById("editFormPartner");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const adminToken = localStorage.getItem("adminToken");

    const getAllPartners = async () => {
        try {
            const response = await baseURL.get("/api/partner/getpartner", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (response.data && response.data.length > 0) {
                setAllPartnersData(response.data);
            }
        } catch (error) {
            console.error("Error fetching partner data:", error);
        }
    };

    const getAllHeadings = async () => {
        try {
            const response = await baseURL.get("/api/headingfornewspatnership/getallheading", );
            if (response.data && response.data.length > 0) {
                setHeading(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching haeding data:", error);
        }
    };

    useEffect(() => {
        getAllPartners();
        getAllHeadings()
    }, []);

    const editHeading=async (e)=>{
        e.preventDefault()
        try {
            const formDatas = new FormData();
            formDatas.append("partnershipHeading",heading.partnershipHeading);
            formDatas.append("partnershipSubHeading",heading.partnershipSubHeading);

            const response = await baseURL.patch('/api/headingfornewspatnership/updateallheading', formDatas, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                toast.success("Heading updated successfully!");
                getAllHeadings();
                setHeadingEditMode(false)
                setSubHeadingEditMode(false)
            }
        } catch (error) {
            console.error("Error updating heading:", error);
            setHeadingEditMode(false)
            setSubHeadingEditMode(false)
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating heading.");
            }
        }
    }

    const addNewPatners = async (e) => {
        e.preventDefault();
        if (!patnershipDatas.companylogo || !patnershipDatas.description || !patnershipDatas.companyname) {
            toast.info("All fields are required!");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("companyname", patnershipDatas.companyname);
            formData.append("description", patnershipDatas.description);
            formData.append("companylogo", patnershipDatas.companylogo);

            const response = await baseURL.post("/api/partner/createpartner", formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                getAllPartners();
                setFileName("Upload Image");
                toast.success("Patner added successfully!");
                setPatnershipDatas({ companyname: "", description: "", companylogo: null });
            }
        } catch (error) {
            console.error("Error adding partner:", error);
            setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while adding partner data.");
            }
        }
    };

    const deleteAPartner = async () => {
        try {
            await baseURL.delete(`/api/partner/deletepartner/${deleteId}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            getAllPartners();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting partner:", error);
        }
    };
    const editAPartnerDetails = async (e) => {
        e.preventDefault();
        if (!editPartnershipDatas.companylogo || !editPartnershipDatas.description || !editPartnershipDatas.companyname) {
            toast.info("Please fill empty Fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("companyname", editPartnershipDatas.companyname);
            formData.append("description", editPartnershipDatas.description);
            formData.append("companylogo", editPartnershipDatas.companylogo);

            const response = await baseURL.patch(`/api/partner/updatePartner/${editPartnershipDatas._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                getAllPartners();
                toast.success("Partnership updated successfully!");
                setIsEditMode(false);
                setFileName("Upload Image");
            }
        } catch (error) {
            console.error("Error updating news:", error);
            setFileName("Upload Image");
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
            } else {
                toast.error("An error occurred while updating news.");
            }
        }
    };

    return (
        <div className="bg-white w-full">
            <div className="py-[40px] px-[30px] grid gap-[30px]">
                <div className="text-[24px] font-bold mb-4">Partnership Management</div>
                <div className="grid gap-[30px]">
                    <div className=" grid gap-[10px]">
                        <label className="block text-[14px] font-semibold">Heading</label>
                        <form onSubmit={editHeading} className="flex items-center gap-[20px]">
                            <input
                            readOnly={!headingEditMode}
                                type="text"
                                value={heading.partnershipHeading}
                                onChange={(e) =>
                                    setHeading({ ...heading, partnershipHeading: e.target.value })}
                                className="border partnerInput rounded-lg px-[15px] h-[45px] w-3/5 text-[20px] font-bold"
                            />
                            {!headingEditMode?<button className="bg-[#FF9D00] p-[10px] rounded-[8px]"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setHeadingEditMode(true)
                                                            
                                                        }}
                                                        >
                                                            <img src={editImg} alt="Edit" />
                                                        </button>:
                                                        <div className=" flex justify-start gap-[10px]">
                                                        <button
                                                            className=" w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white h-[45px]"
                                                            // onClick={editFooterDetails}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className=" h-[45px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setHeadingEditMode(false)                                 
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>}
                        </form>
                    </div>
                    <div className=" grid gap-[10px]">
                        <label className="block text-[14px] font-semibold">Sub Heading</label>
                        <form onSubmit={editHeading} className="flex items-center gap-[20px]">
                            <input
                                type="text"
                                readOnly={!subHeadingEditMode}
                                value={heading.partnershipSubHeading}
                                onChange={(e) =>
                                    setHeading({ ...heading, partnershipSubHeading: e.target.value })}
                                className="border partnerInput rounded-lg px-[15px] h-[45px] w-3/5 text-[20px] font-semibold"
                            />
                            {!subHeadingEditMode?<button className="bg-[#FF9D00] p-[10px] rounded-[8px] "
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSubHeadingEditMode(true)
                                                            
                                                        }}
                                                        >
                                                            <img src={editImg} alt="Edit" />
                                                        </button>:
                                                        <div className=" flex justify-start gap-[10px]">
                                                        <button
                                                            className=" w-[200px] bg-[#FF9D00] rounded-[10px] font-bold text-white h-[45px]"
                                                            // onClick={editFooterDetails}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className=" h-[45px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSubHeadingEditMode(false)                                 
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>}
                        </form>
                    </div>
                </div>
                {/* Add Client Form */}
                <div id="editFormPartner" className="bg-white partnerContainer border rounded-lg grid p-[40px] gap-[40px]">
                    {!isEditMode ? (
                        <>
                            <div className="font-semibold text-[24px] text-center">Add Client</div>
                            <form className=" grid gap-[40px]">
                                <div className="flex gap-[40px]">
                                    <div className="grid w-1/3 gap-[30px]">
                                        <div className="grid gap-[10px]">
                                            <label className="block text-[14px] font-semibold">Company Name</label>
                                            <input
                                                value={patnershipDatas.companyname}
                                                onChange={(e) =>
                                                    setPatnershipDatas({ ...patnershipDatas, companyname: e.target.value })
                                                }
                                                type="text"
                                                placeholder="Company Name"
                                                className="border rounded-[10px] px-[20px] py-[10px] text-[14px] partnerInput"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="fileInput1"
                                                className="hidden"
                                                onChange={uploadImageAdd}
                                            />
                                            <label
                                                htmlFor="fileInput1"
                                                className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
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
                                                <div>{fileName}</div>
                                                <img src={uploadImg} alt="Upload Icon" />
                                                {/* </>
                                            )} */}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-2/3 gap-[10px]">
                                        <div className="text-[14px] font-semibold">Description</div>
                                        <textarea
                                            value={patnershipDatas.description}
                                            onChange={(e) =>
                                                setPatnershipDatas({ ...patnershipDatas, description: e.target.value })
                                            }
                                            type="text"
                                            required
                                            className="h-100 text-[16px] partnerInput border px-[15px] py-[10px] rounded-[10px]"
                                            placeholder="Description "
                                        />
                                    </div>
                                </div>
                                <div className=" flex justify-center gap-[30px]">
                                    <button
                                        type="submit"
                                        className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-semibold text-white"
                                        onClick={addNewPatners}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="font-semibold text-[24px] text-center">Edit Client</div>
                            <form className=" grid gap-[40px]">
                                <div className="flex gap-[40px]">
                                    <div className="grid w-1/3 gap-[30px]">
                                        <div className="grid gap-[10px]">
                                            <label className="block text-[14px] font-semibold">Company Name</label>
                                            <input
                                                value={editPartnershipDatas.companyname}
                                                onChange={(e) =>
                                                    setEditPartnershipDatas({ ...editPartnershipDatas, companyname: e.target.value })
                                                }
                                                type="text"
                                                placeholder="Company Name"
                                                className="border rounded-[10px] px-[20px] py-[10px] text-[14px] partnerInput"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="fileInput1"
                                                className="hidden"
                                                onChange={uploadImageEdit}
                                            />
                                            <label
                                                htmlFor="fileInput1"
                                                className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
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
                                                <div>{fileName}</div>
                                                {/* <img src={uploadImg} alt="Upload Icon" /> */}
                                                {/* </>
                                            )} */}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-2/3 gap-[10px]">
                                        <div className="text-[14px] font-semibold">Description</div>
                                        <textarea
                                            value={editPartnershipDatas.description}
                                            onChange={(e) =>
                                                setEditPartnershipDatas({ ...editPartnershipDatas, description: e.target.value })
                                            }
                                            type="text"
                                            required
                                            className="h-100 text-[16px] partnerInput border px-[15px] py-[10px] rounded-[10px]"
                                            placeholder="Verify the authenticity of employee credentials and background details."
                                        />
                                    </div>
                                </div>
                                <div className=" flex justify-center gap-[30px]">
                                    <button
                                        type="submit"
                                        className="p-[10px] w-[200px] bg-[#FF9D00] rounded-[10px] font-semibold text-white"
                                        onClick={editAPartnerDetails}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="p-[10px] w-[200px] text-[#FF9D00] border-[2px] border-[#FF9D00] font-medium rounded-[10px] font-bold"
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setFileName("Upload Image");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Clients Details */}
                <div className="grid gap-[30px]">
                    <div className="flex items-center justify-between">
                        <div className="text-[24px] font-bold ">Clients Details</div>
                        <div className="font-semibold text-[#FF9D00] text-[20px]">
                            {allPartnersData.length === 1 ? (
                                <span>({allPartnersData.length} Client)</span>
                            ) : (
                                <span>({allPartnersData.length} Clients)</span>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-[30px]">
                        {allPartnersData.length > 0
                            ? allPartnersData.map((partners, index) => (
                                  <div key={index} className="bg-white border partnerContainer rounded-lg  p-[20px] ">
                                      <form className="flex gap-[25px]">
                                          <div className="grid w-1/3 gap-[30px]">
                                              <div className="grid gap-[10px]">
                                                  <label className="block text-[14px] font-semibold">Company Name</label>
                                                  <input
                                                      readOnly
                                                      type="text"
                                                      value={`${partners.companyname}`}
                                                      className="border rounded-[10px] px-[20px] py-[10px] text-[14px] partnerInput"
                                                  />
                                              </div>
                                              <div className="relative">
                                                  <input
                                                      type="file"
                                                      id="fileInput2"
                                                      className="hidden"
                                                      //   onChange={handleFileChange2}
                                                      disabled
                                                  />
                                                  <label
                                                      htmlFor="fileInput2"
                                                      className="uploadBtn flex items-center justify-center gap-[15px] px-[20px] py-[10px] rounded-[10px] text-[#FF9D00] cursor-pointer"
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
                                                      <div>
                                                          {" "}
                                                          {partners.companyname.length > 25
                                                              ? `${partners.companyname.substring(0, 25)}...`
                                                              : partners.companyname}
                                                      </div>
                                                      {/* <img src={uploadImg} alt="Upload Icon" /> */}
                                                      {/* </>
                                                      )} */}
                                                  </label>
                                              </div>
                                          </div>
                                          <div className="flex flex-col w-2/3 gap-[10px]">
                                              <div className="text-[14px] font-semibold">Description</div>
                                              <textarea
                                                  type="text"
                                                  placeholder="Description"
                                                  className="h-100 text-[16px] partnerInput border px-[15px] py-[10px] rounded-[10px]"
                                                  readOnly
                                                  value={`${partners.description}`}
                                              />
                                          </div>
                                          <div className="grid gap-[40px]">
                                              <div
                                                  className="bg-[#FF9D00] h-[44px] w-[44px] p-[10px] rounded-[8px] cursor-pointer "
                                                  onClick={() => {
                                                      setIsEditMode(true);
                                                      scrollToContainer();
                                                      setEditPartnershipDatas(partners);
                                                  }}
                                              >
                                                  <img src={editImg} alt="" />
                                              </div>
                                              <div
                                                  onClick={() => {
                                                      setIsModalOpen(true);
                                                      setDataDeleted(`Client ${index + 1}`);
                                                      setDeleteId(`${partners._id}`);
                                                  }}
                                                  className=" cursor-pointer bg-[#FF9D00] h-[44px] w-[44px] p-[10px] rounded-[8px]"
                                              >
                                                  <img src={deleteImg} alt="" />
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <DeletePopUp
                    onClose={() => setIsModalOpen(false)}
                    dataDeleted={dataDeleted}
                    datas={"Client"}
                    functions={deleteAPartner}
                />
            )}
        </div>
    );
};

export default PartnershipManagement;
