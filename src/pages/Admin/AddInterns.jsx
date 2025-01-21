import React, { useState, useRef,useEffect } from "react";
import '../../CSS/addsales.css';
import { toast } from "react-toastify";
// import { addInternEmployee,getInternEmployeeById,updateInternEmployee } from "../Api Services/internsManagementApi";
import { useNavigate, useParams ,useLocation} from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import baseURL from '../../Api Services/baseURL';
import { SERVER_URL } from "../../Api Services/serverUrl";


function AddInterns() {
  const adminToken = localStorage.getItem('adminToken'); 
  const { id } = useParams();  // For editing, we'll get the intern ID from URL params
  const navigate = useNavigate(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab') || 'Intern';
  const { employeeData } = location.state || { employeeData: {} }
  const [formData, setFormData] = useState({
    name: employeeData.name || "",
    empID: employeeData.empID ||  "",
    email:employeeData.email || "",
    phone:employeeData.phone ||  "",
    fullAddress:employeeData.fullAddress ||  "",
    gender:employeeData.gender||  "",
    dob: employeeData.dob ? new Date(employeeData.dob).toISOString().substring(0, 10) : "",
    bloodGroup:employeeData.bloodGroup|| "A+",
    dateOfJoining: employeeData.dateOfJoining
    ? new Date(employeeData.dateOfJoining).toISOString().substring(0, 10)
    : "",
    jobRole:employeeData.jobRole||  "Business Development Executive",
    employeeStatus: employeeData.employeeStatus || "Full time",
    jobLevel:employeeData.jobLevel|| "Manager Level",
    socialmedia1: employeeData.socialmedia1 || "Instagram" ,
    socialmedia2: employeeData.socialmedia2 || "Instagram" ,
    socialmedia3: employeeData.socialmedia3 || "Instagram" ,
    socialmedia4: employeeData.socialmedia4|| "Instagram" ,
    platform1: employeeData.platform1 || "",
    platform2: employeeData.platform2 || "",
    platform3: employeeData.platform3 || "",
    platform4: employeeData.platform4 || "",
    feedback: employeeData.feedback ? employeeData.feedback.split('\n') : [],
    category: "intern",
  });
   
  
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
    const [certificate, setCertificate] = useState(null);
    const certificateInputRef = useRef(null);
 
 
   // Update form data when employeeData changes
   useEffect(() => {
     if (id && employeeData) {
       setFormData({
         name: employeeData.name || "",
         empID: employeeData.empID || "",
         email: employeeData.email || "",
         phone: employeeData.phone || "",
         fullAddress: employeeData.fullAddress || "",
         gender: employeeData.gender || "",
         dob: employeeData.dob ? new Date(employeeData.dob).toISOString().substring(0, 10) : "",
         bloodGroup: employeeData.bloodGroup || "A+",
         dateOfJoining: employeeData.dateOfJoining
         ? new Date(employeeData.dateOfJoining).toISOString().substring(0, 10)
         : "",        
          jobRole: employeeData.jobRole ||  "Business Development Executive",
         employeeStatus: employeeData.employeeStatus  || "Full time",
         jobLevel: employeeData.jobLevel || "Manager Level",
         socialmedia1: employeeData.socialmedia1 || "Instagram",
         socialmedia2: employeeData.socialmedia2 || "Instagram",
         socialmedia3: employeeData.socialmedia3 || "Instagram",
         socialmedia4: employeeData.socialmedia4 || "Instagram",
         platform1: employeeData.platform1 || "",
         platform2: employeeData.platform2 || "",
         platform3: employeeData.platform3 || "",
         platform4: employeeData.platform4 || "",
         feedback: employeeData.feedback ? employeeData.feedback.split('\n') : [],
         category: "intern",
       });
     }
   }, [id, employeeData]); // Only trigger when id or employeeData changes
 useEffect(() => {
    if (employeeData && employeeData.profileImage) {
        setProfileImage(`${SERVER_URL}${employeeData.profileImage}`);
    }
}, [employeeData]);
      
useEffect(() => {
  if (employeeData && employeeData.Certificate) {
    setCertificate(`${SERVER_URL}${employeeData.Certificate}`);
  }
}, [employeeData]);

      

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Dynamically update the input value
      }));
     
  
      
    };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCertificateFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]); // Update state with the new file
    }
  };
  
// Function to handle adding a new feedback point
const handleFeedbackChange = (e) => {
  const value = e.target.value;
  setFormData((prevData) => ({
    ...prevData,
    feedback: value.split('\n'), // Split the feedback by new lines into an array
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const empID = formData.empID;
      // Validate empID format
  
  const empIDPattern = /^TPEID\d{6}$/; // Regular expression to match 'TPE1D' followed by 6 digits
  if (!empIDPattern.test(empID)) {
    toast.error("Employee ID must start with 'TPE1D' followed by 6 digits (e.g., TPE1D123456).");
    return; // Prevent form submission
  }
    try {
      const feedbackString = formData.feedback.join('\n');
      const formDataToSend = new FormData();
    
      formDataToSend.append('name', formData.name);
      formDataToSend.append('empID', formData.empID);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('fullAddress', formData.fullAddress);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob); 
      formDataToSend.append('bloodGroup', formData.bloodGroup);
      formDataToSend.append('dateOfJoining', formData.dateOfJoining);
      formDataToSend.append('jobRole', formData.jobRole);
      formDataToSend.append('employeeStatus', formData.employeeStatus);
      formDataToSend.append('jobLevel', formData.jobLevel);
      formDataToSend.append('socialmedia1', formData.socialmedia1);
      formDataToSend.append('socialmedia2', formData.socialmedia2);
      formDataToSend.append('socialmedia3', formData.socialmedia3);
      formDataToSend.append('socialmedia4', formData.socialmedia4);
      formDataToSend.append('platform1', formData.platform1);
      formDataToSend.append('platform2', formData.platform2);
      formDataToSend.append('platform3', formData.platform3);
      formDataToSend.append('platform4', formData.platform4);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('feedback', feedbackString);

      
  
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage); // Add image file
      }
      if (certificate instanceof File) {
        formDataToSend.append('Certificate', certificate); // Append the certificate file
      }
      if (id) {
        // Update operation
        const response = await baseURL.put(`/api/employee/employees/${id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 200) {
          toast.success('Intern Employee Details Updated Successfully!');
          navigate(`/admin/employee-management?tab=${tab}`);
        }
      } else {
        // Create operation
        const response = await baseURL.post('/api/employee/employees', formDataToSend, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 201) {
          toast.success('Intern Employee Details Added Successfully!');
          navigate(`/admin/employee-management?tab=${tab}`);
        }
      }
  
      // Reset form
      setFormData({
        name:'',
  empID,
  email:'',
  phone:'',
  fullAddress:'',
  gender:'',
  dob:'',
  bloodGroup:'A+',
  dateOfJoining:'',
jobRole:'Business Development Executive',
category:'intern',
  employeeStatus:'Full time',
  jobLevel:'Manager Level',
  socialmedia1:'Instagram',
  socialmedia2:'Instagram',
  socialmedia3:'Instagram',
  socialmedia4:'Instagram',
  platform1:'',
  platform2:'',
  platform3:'',
  platform4:'',
      });
      setProfileImage(null);
      setCertificate(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error('Error submitting employee data:', error);
      if (error.response) {
        console.error('Error response:', error.response);  // Log the full error object
        console.error('Error response data:', error.response.data); // More details from API
        console.error('Error response status:', error.response.status); // HTTP status code
        const message = error.response.data.message || "Failed to save intern details.";
        toast.error(message);
      } else {
        console.error('Error:', error.message);  // If error is not from response (e.g., network error)
        toast.error("Network error. Please try again.");
      }
    }
      
  };
  
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  }
  return (
    <div className="container mx-auto mt-0  my-5 px-5 pb-5 bg-white shadow rounded-md">
      <form className="row g-4" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center  mb-4 ">
          <div className="me-4 pt-10 ">
            <h2 className="mb-4 text-[22px]">{id ? "Edit Intern Details" : "Add Intern Details"}</h2>
            <div
              className="d-flex justify-content-center align-items-center  border border-secondary rounded-2xl"
              style={{
               
                width: "150px",
                height: "120px",
                position: "relative",
              }}
            >
             {profileImage ? (
    <img
        src={
            profileImage instanceof File
                ? URL.createObjectURL(profileImage) // Local file preview
                : profileImage // URL of the existing image
        }
        alt="Uploaded"
        style={{
            width: "150px",
            height: "120px",
            borderRadius: "12%",
            objectFit: "cover",
        }}
    />
) : (
    <span>No image available</span> // Placeholder for no image
)}
              <div
                className="position-absolute bottom-2 end-2 bg-warning rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "25px", height: "25px" }}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-sm p-0 text-white"
                  style={{ background: "none", border: "none" }}
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
          <div className="mt-3 flex-grow-1 row justify-evenly ">
            <div className="col-md-3  ">
              <label className="form-label font-md text-[15px]">Name</label>
              <input
                type="text"
                name="name"
                 placeholder="Name"
                className="form-control rounded-2xl plac"
                value={formData.name ||'' } 
              onChange={handleInputChange}  
                // value={formData.name}
                style={{fontSize: '12px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                
              />
            </div>
            <div className="col-md-3">
              <label className="form-label   font-md text-[15px]">Employee ID</label>
              <input
                type="text"
                name="empID"
                className="form-control rounded-2xl plac"
                placeholder="Employee ID"
                value={formData.empID } 
              onChange={handleInputChange}
                // value={formData.empID}
                
                style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
            </div>
            <div className="col-md-3 ">
              <label className="form-label   font-md  text-[15px]">Email ID</label>
              <input
                type="email"
                name="email"
                className="form-control rounded-2xl plac"
                placeholder="Email-ID"
                value={formData.email ||'' } 
              onChange={handleInputChange}
                // value={formData.email}
              
                style={{fontSize: '12px' ,border:'1px solid whie',boxShadow: '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
            </div>
          </div>
        </div>

    {/* Personal Information Section */}
    <div className="flex justify-between ">
          <div className=" flex flex-col  p-8 w-[310px]">
          <h4 className="mb-4 text-[22px]">Personal Information</h4>
          <div className="mb-3">
            <label className="form-label text-[15px] font-md text-[15px]" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control plac"
              placeholder="Phone Number"
              value={formData.phone ||'' } 
              onChange={handleInputChange}
              // value={formData.phoneNumber}
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
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
              value={formData.fullAddress || ''} 
              onChange={handleInputChange}
             
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
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
              value={formData.gender ||'' } 
              onChange={handleInputChange} 
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow ='-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              // value={formData.gender}
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
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              value={formData.dob ||'' } 
              onChange={handleInputChange} 
              // value={formData.dob}
              
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
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              value={formData.bloodGroup } 
              onChange={handleInputChange} 
              // value={formData.bloodGroup}
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
          {/* <div className="mb-3  w-[170px]">
            <label className="form-label text-[15px]" htmlFor="category">
              Type
            </label>
            <select
              id="category"
              name="category"
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
              value={formData.category ||'' } 
              onChange={handleInputChange} 
              // value={formData.bloodGroup}
            >
              <option value="employee+">  Employee</option>
              <option value="sales">Sales</option>
              <option value="intern">Intern</option>
       
            </select>
          </div> */}
          
        
        </div>
        <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
        {/* Employment Overview Section */}
        <div className="flex flex-col p-8 w-[310px]">
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
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow ='-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              value={formData.dateOfJoining ||'' } 
              onChange={handleInputChange} 
              // value={formData.dateOfJoining}
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
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              value={formData.jobRole  } 
              onChange={handleInputChange} 
              // value={formData.jobRole}
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
              value={formData.employeeStatus  } 
              onChange={handleInputChange} 
              
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              // value={formData.employeeStatus}
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
              name="jobLevel"
              className="form-select plac"
              style={{fontSize: '12px' ,border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
              onFocus={ e => {
                
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              onBlur={e => {
                  
                e.target.style.borderColor = 'white';
                e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
              }}
              value={formData.jobLevel  } 
              onChange={handleInputChange} 
              // value={formData.jobRole}
            >
              <option value="Manager Level">
              Manager Level
              </option>
              <option value="Executive Level">
                Executive Level
              </option>
             
            </select>
          </div>
        </div>
        <div className="vertical-line w-[1px] h-[400px] bg-gray-400"></div>
        {/* Social Media Section */}
        <div className="flex  flex-col p-8">
          <h4 className="mb-4 text-[22px]">Social Media</h4>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="socialmedia1">
                    Select Platform 1
                  </label>
                  <select
                    id="socialmedia1"
                    name="socialmedia1"
                    value={formData.socialmedia1 }
                    onChange={handleInputChange}
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,  width:'140px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                   
                    
                    
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="likedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="socialmedia1">
                  Platform 1 Link
                  </label>
                  <input
               type="url"
               name="platform1"
               id="platform1"
                className="form-control rounded-2xl plac"
                placeholder="URL Link"
                value={formData.platform1 || ''}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,  width:'170px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
                    
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="socialmedia1">
                  Select Platform 2
                  </label>
                  <select
                    id="socialmedia2"
                    name="socialmedia2"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' ,  width:'140px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow ='-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onChange={handleInputChange}
                    
                    value={formData.socialmedia2 }
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="likedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Platform 2 Link
                  </label>
                  <input
               type="url"
               name="platform2"
               id="platform2"
                className="form-control rounded-2xl plac"
                placeholder="URL Link"
                value={formData.platform2 || ''}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,  width:'170px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow ='-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="socialmedia1">
                  Select Platform 3
                  </label>
                  <select
                    id="socialmedia3"
                    name="socialmedia3"
                    className="form-select rounded-lg plac"
                    style={{fontSize: '12px' , width:'140px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow =  '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onChange={handleInputChange}
                    
                    value={formData.socialmedia3 }
                  >
                  <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="likedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                  Platform 3 Link
                  </label>
                  <input
                type="url"
                name="platform3"
                id="platform3"
                className="form-control rounded-2xl plac"
                placeholder="URL Link"
                value={formData.platform3 || ''}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,  width:'170px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
                </div>
          </div>
          <div className="flex gap-5">
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="socialmedia1">
                  Select Platform 4
                  </label>
                  <select
                    id="socialmedia4"
                    name="socialmedia4"
                    
                    className="form-select rounded-lg plac"
                    value={formData.socialmedia4 }
                    onChange={handleInputChange}
                    style={{fontSize: '12px' ,  width:'140px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                    onFocus={ e => {
                      
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                    onBlur={e => {
                  
                      e.target.style.borderColor = 'white';
                      e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                    }}
                   
                    
                    
                  >
                 <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="likedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-[15px]" htmlFor="gender">
                    Platform 4 Link
                  </label>
                  <input
                type="url"
                name="platform4"
                id="platform4"
                className="form-control rounded-2xl plac"
                placeholder="URL Link"
                value={formData.platform4 || ''}
                onChange={handleInputChange}
                style={{fontSize: '12px' ,  width:'170px',border:'1px solid whie',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                onFocus={ e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow ='-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
                onBlur={e => {
                  
                  e.target.style.borderColor = 'white';
                  e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                }}
              />
                    
                 
                </div>
          </div>
        </div>
        
        </div>
                    <div className="mt-5 flex justify-between">
                              <div className="  w-[660px] h-[150px] ">
                                            <h4 className="text-[22px]">Feedback</h4>
                                            <textarea
                                            name="feedback"
                                              className="form-control w-[660px] h-[150px]  plac"
                                              placeholder="Enter here"
                                              rows="4"
                                              value={formData.feedback.join('\n') ||'' } 
                                              onChange={handleFeedbackChange} 
                                              style={{border:'1px solid whie',fontSize:'14px',boxShadow:'-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)'}}
                                                      onFocus={ e => {
                                                        
                                                        e.target.style.borderColor = 'white';
                                                        e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                                                      }}
                                                      onBlur={e => {
                                                    
                                                        e.target.style.borderColor = 'white';
                                                        e.target.style.boxShadow = '-2px 2px 4px 0px rgba(10, 10, 10, 0.04),2px 1px 4px 0px rgba(10, 10, 10, 0.04),0px -2px 4px 0px rgba(10, 10, 10, 0.02)';
                                                      }}
                                              
                                            ></textarea>
                              </div>
                             

                              <div className="">
                                              <h4 className="text-[22px]">Internship Certificate</h4>
                                              <div 
                                                    className="border border-secondary rounded p-4 text-center position-relative"
                                                    style={{
                                                      width: "330px",
                                                      height: "150px",
                                                      overflow: "hidden",
                                                     
                                                    }}
                                                   
                                                  >
                                                    {certificate ? (
      typeof certificate === "string" ? (
        <a
          href={certificate}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link text-black"
        >
          View Certificate
        </a>
      ) : (
        <div>
          <p>{certificate.name}</p>
          <a
            href={URL.createObjectURL(certificate)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link text-black"
          >
            View
          </a>
        </div>
      )
    ) : (
      <p>Upload the file</p>
    )}
                                                    <button
                                                    type="button"
                                                      onClick={() => certificateInputRef.current.click()}
                                                      className="btn btn-link text-black "
                                                      aria-label="Upload Internship Certificate"
                                                    >
                                                    <i
                                                          className="fa-solid fa-arrow-up-from-bracket"
                                                          style={{ fontSize: "20px", color: "black" }}
                                                        />
                                                    </button>
                                             </div>
                                            <input
                                            type="file"
                                            ref={certificateInputRef}
                                            style={{ display: "none" }}
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleCertificateFileChange}
                                          />
                                            
    
                               </div>
                          </div>
                      <div className=" flex justify-center gap-4 mt-4">
                                    <button type="submit" className="px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center me-3">
                                    {id ? "Update" : "Save"}
                                    </button>
                                    <button type="button"onClick={handleCancel} className=" px-14 py-2 text-white bg-[#FF9D00] rounded-xl flex justify-center items-center">
                                      Cancel
                                    </button>
                      </div>
         </form>
    </div>
  );
}

export default AddInterns;