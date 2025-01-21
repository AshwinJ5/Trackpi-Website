import React , {useState,useEffect} from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import { BsDownload } from 'react-icons/bs';
import baseURL from '../../Api Services/baseURL';
import DeleteModal from './DeleteModal';

const TableIntern = () => {
  const navigate = useNavigate();
     const [employees, setEmployees] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const adminToken = localStorage.getItem("adminToken");
        const [isModalOpen, setIsModalOpen] = useState(false);
          const [deleteId, setDeleteId] = useState("");
          const [dataDeleted, setDataDeleted] = useState("");
       // Fetch employee data from the backend
       useEffect(() => {
        // Fetch employee data from the backend
        const fetchEmployees = async () => {
          try {
            const response = await baseURL.get('/api/employee/employees', {
              params: { category: 'intern' },
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            });
            setEmployees(response.data);
          } catch (error) {
            setError('Failed to load employees.');
          } finally {
            setLoading(false);
          }
        
        };
    
        fetchEmployees();
      }, []);
  const handleViewProfile = employee => {
    console.log(employee,"employee")
    navigate('/admin/intern-management-detail', { state: { rowDatas: employee } });
    
  };
  const handleAdd = () => {
    navigate('/admin/intern-management-add/'); // Navigate Add intern page
  }
  const handleDelete = async () => {
    
    try {
      await baseURL.delete(`/api/employee/employees/${deleteId}`,{
        headers: {
          Authorization: `Bearer ${adminToken}`,
      },}); // Assuming `id` is the unique identifier
      setEmployees(employees.filter((employee) => employee._id !== deleteId));
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete the record. Please try again.');
    }
  };
  const handleExportCSV = async () => {
    console.log("clicked");
  
    try {
      // const token = localStorage.getItem('adminToken');  // Get token from localStorage
  
      // if (!token) {
      //   return console.error("Token is missing!");
      // }
  
      const response = await baseURL.get("/export/csv-data?type=employee&category=intern", {
        headers: {
          // Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json',
        },
        responseType: "blob",  // Important for handling file download
      });
  
      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "intern-data.csv"); // Set the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };
  

  if (loading) return <div className="text-center mt-4">Loading sales data...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;
  return (
    <div>
       <div className="flex items-center justify-between">
                  <h4 className="font-bold my-4">Intern Management</h4>
                    <div className="flex gap-2">
                          <div className="px-4 py-1 rounded-md bg-[#FF9D00] text-white flex items-center gap-2 cursor-pointer">
                            <BsUpload color="white" className="font-bold" onClick={handleExportCSV}/> |{' '}
                            <BsDownload color="white" />
                          </div>
                          <div onClick={handleAdd} className="px-4 py-1 rounded-md bg-[#FF9D00] text-white flex items-center gap-2 cursor-pointer" >
                            <MdAdd color="white" />
                            Add Intern
                          </div>
                    </div>
         </div>
      <div className="relative overflow-x-auto  shadow-md sm:rounded-lg  border-[#939393] border-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-[#939393]"style={{ tableLayout: "fixed" }}>
          <thead className="text-md font-bold text-black uppercase border-[#939393] border-b ">
            <tr>
              <th scope="col" className=" border-r text-center" style={{ width: "10%" }}>
                SL No.
              </th>
              <th scope="col" className="px-2 py-3 border-r text-center" style={{ width: "25%" }}>
                Name
              </th>
              <th scope="col" className="px-2 py-3 border-r text-center" style={{ width: "25%" }}>
                Employee ID{' '}
              </th>
              <th scope="col" className="px-2 py-3 border-r text-center" style={{ width: "25%" }}>
                Email ID
              </th>
              <th scope="col" className="px-2 py-3 border-r text-center" style={{ width: "25%" }}>
                Phone{' '}
              </th>
              <th scope="col" className="px-2 py-3 border-r text-center" style={{ width: "25%" }}>
                View
              </th>
              <th scope="col" className="px-2 py-3 border-b text-center" style={{ width: "10%" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee._id  || index}
                className="bg-white text-md font-semibold text-black dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 custom-table"
              >
                <>
                  <td className=" border-r-2  text-center"
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                  {index + 1}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                    {employee.name}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                    {employee.empID}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                    {/* <div className="flex justify-center items-center gap-2 "> */}
                    {employee.email}
                    {/* </div> */}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                    {employee.phone}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    boxSizing: 'border-box',
                  }}>
                    <div className="flex justify-center items-center gap-2 text-[#FF9D00] cursor-pointer"  onClick={() => handleViewProfile(employee)}>
                      View Profile <FiExternalLink size={15} />
                    </div>
                  
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    <div className="flex justify-center items-center" onClick={() =>{
                            setIsModalOpen(true);
                            setDataDeleted(`Intern ${index+ 1 }`);
                            setDeleteId(employee._id);
                        } }>
                      <RiDeleteBin6Line size={20} />
                    </div>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{' '}
      {isModalOpen && <DeleteModal onClose={() => setIsModalOpen(false)} dataDeleted={dataDeleted} datas={"Intern"} functions={handleDelete} />} 
    </div>
  );
};

export default TableIntern;
