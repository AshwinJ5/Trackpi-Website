import '../../CSS/employeeinternship.css';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import EmpDetails from '../../components/User/EmpDetails';
import {Puff}  from 'react-loader-spinner'
import { SERVER_URL } from "../../Api Services/serverUrl";

function SalesManagementDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve employeeData passed via navigate
  const employeeData = location.state.rowDatas || {};
 
  // Handle Back button functionality
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  const handleEdit = () => {
    const salesId = employeeData._id || employeeData.id;// Replace this with the actual intern's ID
   
    if (salesId) {
      navigate(`/admin/salesManagement-add/${salesId}`, { state: { employeeData } }); // Navigate to the edit page with the internId
    }
  };
  
  if (!employeeData) {
    return (
      <div className="flex justify-center items-center ">
        <Puff
          visible={true}
          height={80}
          width={80}
          color="#FF9D00"
          ariaLabel="puff-loading"
        />
      </div>
    );
  }
  return (
    <div >
      <div className="bg-white   w-full py-4 px-6 mx-auto flex justify-end items-end gap-3">
        <button onClick={handleEdit} className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center">
          <FaRegEdit /> &nbsp; Edit
        </button>
        <button
          onClick={handleBack}
          className="px-4 py-2 text-white bg-[#FF9D00] rounded-lg flex justify-center items-center"
        >
          <IoMdArrowBack /> &nbsp; Back
        </button>
      </div>
      <div className="bg-white w-full py-2 px-14 lg:px-16 xl:px-18 2xl:px-18 mx-auto ">
        <EmpDetails employeeData={employeeData} />
        <div className="  text-center flex justify-center mt-19 md:mt-19 2xl:mt-8 ">
          <div
            className=" w-[225px] md:w-[500px] h-[121px] md:h-[300px] rounded-lg d-flex justify-content-center align-items-center"
            style={{ backgroundColor: '#2A2A2A' }}
          >
            {employeeData.businessCard ? (
                <img
                  src={`${SERVER_URL}${employeeData.businessCard}#toolbar=0`}
                  className="w-[225px] md:w-[500px] h-[300px] rounded-lg"
                  style={{ border: 'none',objectFit: "cover" }}
                  title="Business Card"
                
                />
          ) : (
                <div
                  className="w-[225px] md:w-[500px] h-[121px] md:h-[300px] rounded-lg d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: '#2A2A2A' }}
                >
                  <h6 className="text-white text-center container w-50">Business Card</h6>
                </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesManagementDetail;
