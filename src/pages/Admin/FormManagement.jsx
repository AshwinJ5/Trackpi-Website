import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { FiExternalLink } from 'react-icons/fi';
import baseURL from '../../Api Services/baseURL';
import { Puff } from 'react-loader-spinner';

function FormManagement() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState('');

  const navigate = useNavigate();

  // Fetch the projects from the API
  useEffect(() => {
    const getFormView = async () => {
      try {
        const response = await baseURL.get('/contactForm/getforms');
        setForms(response.data); // Assuming the API returns an array of projects
        setRefresh(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    getFormView();
  }, []);

  // Group projects by exact date (considering time correctly)
  const groupedContactForms = forms.reduce((acc, form) => {
    const date = new Date(form.createdAt); // Convert to Date object
    const formattedDate = date.toISOString().split('T')[0]; // Ensure correct date extraction

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(form);
    return acc;
  }, {});
  // Sort dates in descending order so the latest date appears first
  const sortedDates = Object.keys(groupedContactForms).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const handleViewDetails = form => {
    navigate(`/admin/form-details/${form._id}`, { state: form });
  };

  const handleExportCSV = async () => {
    try {
      const response = await baseURL.get('export/csv-data?type=form', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Important for handling file download
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'project-data.csv'); // Set the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: true
    }).format(date);

    return formattedDate;
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);

    // Convert "am" or "pm" to uppercase
    return formattedTime.replace(/am|pm/, match => match.toUpperCase());
  };

  return (
    <div className="bg-white w-full">
      <div className="py-[40px] px-[30px] grid gap-[30px]">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-[24px] font-bold">Form Management</div>
          <div>
            <button
              className="px-4 py-2 rounded-[10px] flex items-center gap-3 font-bold text-white bg-[#FF9D00]"
              onClick={handleExportCSV}
            >
              <FiUpload size={20} />
              Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-start mt-12 h-screen">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#FF9D00"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />{' '}
          </div>
        ) : (
          <div className="py-[10px] grid gap-[25px]">
            {sortedDates.map(date => (
              <div className="grid gap-[10px]" key={date}>
                {/* Date Heading */}
                <div className="text-[#FF9D00] text-[20px]">
                  {formatDate(date)}
                </div>

                <div className="relative shadow-md sm:rounded-lg">
                  <div className="table-wrapper">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:[#939393] table-fixed">
                      <thead className="text-md font-bold text-black uppercase border-[#939393] border-b ">
                        <tr>
                          <th
                            scope="col"
                            className=" border-r text-center"
                            style={{ width: '10%' }}
                          >
                            {' '}
                            Sl No
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 border-r text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 border-r text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Email ID
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 border-r text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 border-r text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Hear About Us
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 border-r text-center"
                            style={{ width: '20%' }}
                          >
                            {' '}
                            Time
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedContactForms[date].map((form, formIndex) => (
                          <tr
                            key={form._id}
                            className="bg-white text-md font-semibold text-black hover:bg-gray-50 dark:hover:bg-gray-600 custom-table"
                          >
                            <td
                              className=" border-r text-center"
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {formIndex + 1}
                            </td>
                            <td
                              className={`px-2 py-3 border-r text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {form.fullName}
                            </td>
                            <td
                              className={`px-2 py-3 border-r text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {form.email}
                            </td>
                            <td
                              className={`px-2 py-3 border-r text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {form.phone}
                            </td>
                            <td
                              className={`px-2 py-3 border-r text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {form.info_from}
                            </td>
                            <td
                              className={`px-2 py-3 border-r text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {formatTime(form.createdAt)}
                            </td>
                            <td
                              className="text-[#FF9D00] font-bold text-center cursor-pointer px-2 py-3 items-center gap-2 min-w-[150px]"
                              onClick={() => handleViewDetails(form)}
                            >
                              <div
                                className="flex justify-center gap-2"
                                style={{
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word',
                                  boxSizing: 'border-box',
                                }}
                              >
                                View Details <FiExternalLink size={20} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormManagement;

{
  /* import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import importImg from "/assets/svg/import.svg";
import viewMoreImg from "/assets/svg/viewMore.svg";
import "../../CSS/projectManagement.css";

function FormManagement() {

    const [formDetails, setFormDetails] = useState([]);
    const navigate = useNavigate();
    
            useEffect(() => {
                const fetchProjects = async () => {
                    setFormDetails(mockData);
                };
        
                fetchProjects();
            }, []);
        
            const handleViewDetails = (form) => {
                navigate(/admin/form-details/${form.id}, { state: form });
            };
        
            // Group data by date
            const groupedByDate = formDetails.reduce((acc, curr) => {
                (acc[curr.date] = acc[curr.date] || []).push(curr);
                return acc;
            }, {});
        
            // Sort dates in descending order
            const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
        
    return (
        <div className="bg-white ">
            <div className="py-[40px] px-[30px] grid gap-[30px] mainFormManagement">
                <div className="flex justify-between ">
                    <div className="text-[24px] font-bold">Form Management</div>
                    <div className="">
                        <button className="w-[55px] h-[45px] rounded-[10px] bg-[#FF9D00] ">
                            <img className="m-auto" src={importImg} alt="" />
                        </button>
                    </div>
                </div>
<div className="relative">
               {sortedDates.map((date, index) => (
  <div key={index} className="py-[10px] grid gap-[0] formTable">
    <div className="sticky top-[-2px]">
      <div className="text-[#FF9D00] text-[20px] bg-white z-10 p-2">
        {date}
      </div> */
}

{
  /* Displaying only the first header here */
}
{
  /* <div className="flex font-bold text-center items-center justify-center sticky top-0 bg-white z-10 tableHeaderForm">
        <div className="widthFirstTable">Sl No</div>
        <div className="widthCommonTable">Name</div>
        <div className="widthCommonTable">Email ID</div>
        <div className="widthCommonTable">Phone</div>
        <div className="widthCommonTable">Hear About Us</div>
        <div className="widthCommonTable">Time</div>
        <div className="widthCommonTable">View</div>
      </div>
    </div>

    <div className="overflow-x-auto table123"> */
}

{
  /* Table Rows */
}
{
  /* {groupedByDate[date].map((data, rowIndex) => (
        <div key={rowIndex} className="flex text-center justify-center tableContentForm">
          <div className="widthFirstTable ">{rowIndex+1}</div>
          <div className="widthCommonTable ">{data.name}</div>
          <div className="break-all widthCommonTable ">{data.email}</div>
          <div className="widthCommonTable ">{data.phone}</div>
          <div className="widthCommonTable ">{data.hearAboutUs}</div>
          <div className="widthCommonTable ">{data.time}</div>
          <div
            style={{ fontWeight: "700" }}
            onClick={() => handleViewDetails(data)}
            className="widthCommonTable  cursor-pointer px-1 mx-auto text-[#FF9D00] flex justify-center gap-[10px]"
          >
            <div className="text-[16px]">View Details </div>
            <img className="h-[17px]" src={viewMoreImg} alt="" />
          </div>
        </div>
      ))}
    </div>
  </div>
))}
</div>

            </div>
        </div>
);
}

export default FormManagement; */
}

{
  /* <div className="projectManagement relative overflow-y-auto h-max">
                            <table className="w-full text-center relative">
                                <thead className="sticky top-0">
                                    <th className="">Sl No</th>
                                    <th className="">Name</th>
                                    <th className="">Email ID</th>
                                    <th className="">Phone</th>
                                    <th className="">Hear About Us</th>
                                    <th className="">Time</th>
                                    <th className="">View</th>
                                </thead>
                                <tbody className="">
                                    {formDetails.map((form, index) => (
                                        <tr key={index}>
                                            <td className=" px-1 mx-auto">{index + 1}</td>
                                            <td className=" px-1 mx-auto">{form.name}</td>
                                            <td className=" px-1 mx-auto">{form.email}</td>
                                            <td className=" px-1 mx-auto">{form.phone}</td>
                                            <td className=" px-1 mx-auto">{form.hearAboutUs}</td>
                                            <td className=" px-1 mx-auto">{form.time}</td>
                                            <td
                                                style={{ fontWeight: "700" }}
                                                onClick={() => handleViewDetails(form)}
                                                className="cursor-pointer px-1 w-100 mx-auto text-[#FF9D00] flex justify-center gap-[10px]"
                                            >
                                                <div>View Details </div>
                                                <img src={viewMoreImg} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                <div className="text-[#FF9D00] mt-[25px] text-[20px]">02/01/2025</div> 
                                <table className="w-full text-center relative">
                                <tbody className="">
                                    {formDetails.map((form, index) => (
                                        <tr key={index}>
                                            <td className="w-[60px] px-1 mx-auto">{index + 1}</td>
                                            <td className="w-[170px] px-1 mx-auto">{form.name}</td>
                                            <td className="w-[170px] px-1 mx-auto break-words">{form.email}</td>
                                            <td className="w-[170px] px-1 mx-auto">{form.phone}</td>
                                            <td className="w-[170px] px-1 mx-auto">{form.hearAboutUs}</td>
                                            <td className="w-[170px] px-1 mx-auto">{form.time}</td>
                                            <td
                                                style={{ fontWeight: "700" }}
                                                onClick={() => handleViewDetails(form)}
                                                className="cursor-pointer px-1 w-100 mx-auto mx-auto text-[#FF9D00] flex justify-center gap-[10px]"
                                            >
                                                <div>View Details </div>
                                                <img src={viewMoreImg} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> */
}
