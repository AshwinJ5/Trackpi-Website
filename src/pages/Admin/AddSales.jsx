import React, { useState, useRef,useEffect } from "react";
import "../../CSS/addsales.css";
// import { addSalesEmployee,updateSalesEmployee } from "../../Api Services/salesManagemntApi";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RiImageAddLine } from "react-icons/ri";
function AddSales() {
const location = useLocation();
  const { employeeData } = location.state || { employeeData: {} }
  const [formData, setFormData] = useState({
    name: employeeData.name || "",
    empID: employeeData.empID ||  "",
    email:employeeData.email || "",
    phoneNumber:employeeData.phoneNumber ||  "",
    fullAddress:employeeData.fullAddress ||  "",
    gender:employeeData.gender||  "",
    dob:employeeData.dob||  "",
    bloodGroup:employeeData.bloodGroup||  "",
    dateOfJoining:employeeData.dateOfJoining||  "",
    jobRole:employeeData.jobRole||  "",
    employeeStatus: employeeData.employeeStatus|| "",
    jobLevel:employeeData.jobLevel||  "",
    instagram:employeeData.instagram ||  "",
    linkedin:employeeData.linkedin || "",
    twitter: employeeData.twitter || "",
    feedback:employeeData.feedback || "",
  });

const [profileImage, setProfileImage] = useState(null);
  

  const fileInputRef = useRef(null);
  const [businessCard, setBusinessCard] = useState(null);
const businessCardInputRef = useRef(null);
  const { id } = useParams();  // For editing, we'll get the intern ID from URL params
  const navigate = useNavigate();


const handleBusinessCardFileChange = (e) => {
    setBusinessCard(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

// Update form data when employeeData changes
useEffect(() => {
  // Only update formData if employeeData changes
  setFormData((prevFormData) => {
    if (JSON.stringify(prevFormData) !== JSON.stringify(employeeData)) {
      return {
        name: employeeData.name || "",
        empID: employeeData.empID || "",
        email: employeeData.email || "",
        phoneNumber: employeeData.phoneNumber || "",
        fullAddress: employeeData.fullAddress || "",
        gender: employeeData.gender || "",
        dob: employeeData.dob || "",
        bloodGroup: employeeData.bloodGroup || "",
        dateOfJoining: employeeData.dateOfJoining || "",
        jobRole: employeeData.jobRole || "",
        employeeStatus: employeeData.employeeStatus || "",
        jobLevel: employeeData.jobLevel || "",
        instagram: employeeData.instagram || "",
        linkedin: employeeData.linkedin || "",
        twitter: employeeData.twitter || "",
        feedback: employeeData.feedback || "",
      };
    }
    return prevFormData; // Avoid unnecessary updates
  });
}, [employeeData]);

useEffect(() => {
  // Fetch the image only if it changes and is valid
  if (employeeData.image) {
    fetch(employeeData.image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        setProfileImage(file);
      })
      .catch((error) => console.error("Failed to fetch image:", error));
  }
}, [employeeData.image]);

 

  const handleAddSales = async (e) => {
    e.preventDefault();

    if (
        Object.values(formData).some((value) => !value.trim()) ||
        !profileImage ||
        !businessCard
    ) {
        toast.warning("Please fill all the fields!");
        return;
    }

    const fd = new FormData();
    for (const [key, value] of Object.entries(formData)) {
        fd.append(key, value.trim());
    }
    fd.append("image",profileImage);
    fd.append("businessCard", businessCard);

    const header = {
        Authorization: `token ${localStorage.getItem("admin")}`,
    };
    try {
      if (id) {
        // Update logic
        // Example: const res = await updateSalesEmployee(fd, header);
        console.log("Updating employee with ID:", id);
        toast.success("Sales Employee updated successfully!");
      } else {
        // Add logic
        // Example: const res = await addSalesEmployee(fd, header);
        console.log("Adding new Sales Employee");
        toast.success("Sales Employee added successfully!");
      }
      navigate(`/admin/salesManagement-detail/${id || "new"}`);
    } catch (error) {
      console.error(id ? "Error updating employee" : "Error adding employee:", error);
      toast.error("Something went wrong! Please try again.");
    }
    
};

const handleCancel = () => {
  navigate(-1);
 } // Go back to previous page

  return (
    <div className="container mx-auto mt-0 my-5 px-5  pb-5 bg-white shadow rounded-md">
      <form onSubmit={handleAddSales} className="row g-5">
        {/* Profile Picture Section */}
        <div className=" d-flex align-items-center mb-4">
          <div className="me-4 r pt-10">
          <h2 className="mb-4 text-[22px]">{id ? "Edit Sales Details" : "Add Sales Details"}</h2>
            <div
              className="d-flex justify-content-center align-items-center border border-secondary rounded-2xl position-relative"
              style={{ width: "150px", height: "120px" }}
            >
                  {profileImage instanceof File && (
  <img
    src={URL.createObjectURL(profileImage)}
    alt="Uploaded"
    style={{
      width: "150px",
      height: "120px",
      borderRadius: "12%",
      objectFit: "cover",
    }}
  />
)}
               <div
                className="position-absolute bottom-2 end-2 bg-warning rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "25px", height: "25px" }}
              >
              <button
                type="button"
                className="btn btn-sm p-0  text-white"
                onClick={() => fileInputRef.current.click()}
                style={{background: "none" , border: "none" }}
              >
               <RiImageAddLine />
              </button>
            </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {/* Personal Information */}
          <div className="mt-3 flex-grow-1 row justify-evenly">
            <div className="col-md-4">
              <label className="form-label font-bold text-[15px]">Name</label>
              <input
                type="text"
                name="name"
                 placeholder="Name"
                className="form-control rounded-2xl plac"
                value={formData.name}
                onChange={handleInputChange}
                style={{fontSize: '12px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
                
              />
            </div>
            <div className="col-md-4">
              <label className="form-label  font-bold text-[15px]">Employee Id</label>
              <input
                type="text"
                name="empID"
                className="form-control rounded-2xl plac"
                placeholder="Employee Id"
                value={formData.empID}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
              />
            </div>
            <div className="col-md-4 ">
              <label className="form-label  font-bold text-[15px]">Email Id</label>
              <input
                type="email"
                name="email"
                className="form-control rounded-2xl plac"
                placeholder="Email-Id"
                value={formData.email}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                }}
              />
            </div>
          </div>
        </div>

    {/* Personal Information Section */}
    <div className="flex justify-between ">
          <div className=" flex flex-col w-[310px]">
          <h4 className="mb-4 text-[22px]">Personal Information</h4>
          <div className="mb-3">
            <label className="form-label text-[15px] font-md text-[15px]" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phoneNumber"
              className="form-control plac"
              placeholder="Phone Number"

              onChange={handleInputChange}
              value={formData.phoneNumber}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-[15px]" htmlFor="address">
              Full Address
            </label>
            <input
              type="text"
              id="address"
              name="fullAddress"
              className="form-control plac"
              placeholder="Address"
              onChange={handleInputChange}
              value={formData.fullAddress}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
            />
          </div>
          <div className="flex gap-5">
          <div className="mb-3 w-[100px]">
            <label className="form-label  text-[15px]" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="form-select rounded-lg plac"
              onChange={handleInputChange}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              value={formData.gender}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3 w-[170px]">
            <label className="form-label text-[15px]" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control rounded-lg plac"
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onChange={handleInputChange}
              value={formData.dob}
              
            />
          </div>
          </div>
          <div className="mb-3  w-[100px]">
            <label className="form-label text-[15px]" htmlFor="bloodgroup">
              Blood Group
            </label>
            <select
              id="bloodgroup"
              name="bloodGroup"
              className="form-select plac"
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onChange={handleInputChange}
              value={formData.bloodGroup}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
        <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
        {/* Employment Overview Section */}
        <div className="flex flex-col w-[310px]">
          <h4 className="mb-4 text-[22px]">Employment Overview</h4>
          <div className="mb-3">
            <label className="form-label text-[15px]" htmlFor="doj">
              Date of Joining
            </label>
            <input
              type="date"
              id="doj"
              name="dateOfJoining"
              className="form-control plac"
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onChange={handleInputChange}
              value={formData.dateOfJoining}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-[15px]" htmlFor="jobrole">
              Job Role
            </label>
            <select
              id="jobrole"
              name="jobRole"
              className="form-select plac"
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onChange={handleInputChange}
              value={formData.jobRole}
            >
              <option value="Business Development Executive">
                Business Development Executive
              </option>
              <option value="Business Development Manager">
                Business Development Manager
              </option>
              <option value="Area Business Manager">
                Area Business Manager
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-[15px]" htmlFor="empsatus">
              Employee Status
            </label>
            <select
              id="empsatus"
              name="employeeStatus"
              className="form-select plac"
              onChange={handleInputChange}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              value={formData.employeeStatus}
            >
              <option value="Full time">Full time</option>
              <option value="Part time">Part time</option>
              <option value="Freelancer">Freelancer (Work from home)</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-[15px]" htmlFor="joblevel">
              Job Level
            </label>
            <select
              id="joblevel"
              name="joblevel"
              className="form-select plac"
              onChange={handleInputChange}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
              }}
              value={formData.jobLevel}
            >
              <option value="Manager Level">Manager Level</option>
              <option value="Executive Level">Executive Level</option>
            </select>
          </div>
        </div>
        <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
        {/* Social Media Section */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-[22px]">Social Media</h4>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                    Select Platform 1
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                    <option value="">Instagram</option>
                    <option value="">Facebook</option>
                    <option value="">LinkedIn</option>
                    <option value="">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Platform 1 Link
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                      <option value="">URL Link</option>
                    <option value="">URL LInk</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                  </select>
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Select Platform 2
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                   <option value="">Instagram</option>
                    <option value="">Facebook</option>
                    <option value="">LinkedIn</option>
                    <option value="">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Platform 1 Link
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                    <option value="">URL Link</option>
                    <option value="">URL LInk</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                  </select>
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Select Platform 3
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                  <option value="">Instagram</option>
                    <option value="">Facebook</option>
                    <option value="">LinkedIn</option>
                    <option value="">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Platform 2 Link
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                      <option value="">URL Link</option>
                    <option value="">URL LInk</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                  </select>
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Select Platform 4
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                 <option value="">Instagram</option>
                    <option value="">Facebook</option>
                    <option value="">LinkedIn</option>
                    <option value="">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                    Platform 3 Link
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.15),2px 1px 4px 0px rgba(10, 10, 10, 0.15),0px -2px 4px 0px rgba(10, 10, 10, 0.15)';
                    }}
                    onChange={handleInputChange}
                    
                    // value={formData.gender}
                  >
                    <option value="">URL Link</option>
                    <option value="">URL LInk</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                    <option value="">URL Link</option>
                  </select>
                </div>
          </div>
        </div>
        
        </div>
      
        {/* Business Card Section */}
        <div className="flex flex-col ">
          <div className="w-[300px] self-center">
          
          <h6 className="mb-3  text-[18px]">Business Card</h6></div>
          <div
            className="border border-secondary self-center rounded p-4 text-center position-relative"
            style={{
              width: "300px",
              height: "150px",
              overflow: "hidden",
            }}
          >
            {businessCard ? (
              <img
                src={URL.createObjectURL(businessCard)}
                alt="Uploaded Business Card"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <p>Upload the file</p>
            )}
            <button
              onClick={() => businessCardInputRef.current.click()}
              className="btn btn-link"
              aria-label="Upload Business Card"
            >
              <i
                className="fa-solid fa-arrow-up-from-bracket"
                style={{ fontSize: "20px", color: "black" }}
              />
            </button>
          </div>
          <input
            type="file"
            ref={businessCardInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleBusinessCardFileChange}
          />
        </div>




        {/* Submit and Cancel Buttons */}
        <div className=" flex justify-center gap-4 mt-4">
                                    <button type="submit"  className="px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center me-3">
                                    {id ? "Update" : "Save"}
                                    </button>
                                    <button type="button"  onClick={handleCancel} className=" px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center">
                                      Cancel
                                    </button>
                      </div>
      </form>
    </div>
  );
}

export default AddSales;