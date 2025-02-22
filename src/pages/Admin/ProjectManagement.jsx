import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { FiExternalLink } from 'react-icons/fi';
import baseURL from '../../Api Services/baseURL';
import { Puff } from 'react-loader-spinner';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState('');

  const navigate = useNavigate();

  // Fetch the projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await baseURL.get('/api/projects/getAllProjects');
        setProjects(response.data); // Assuming the API returns an array of projects
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
      }
    };

    fetchProjects();
  }, [refresh]);

  // Group projects by date
  const groupedProjects = projects.reduce((acc, project) => {
    const date = project.createdAt.split('T')[0]; // Extract date part from createdAt
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(project);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedProjects).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const handleViewDetails = project => {
    navigate(`/admin/project-details/${project._id}`, { state: project });
  };

  const handleExportCSV = async () => {
    try {
      const response = await baseURL.get('export/csv-data?type=project', {
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
        <div className="flex justify-between items-center">
          <div className="text-[24px] font-bold">Project Management</div>
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
                <div className="text-[#FF9D00] text-[20px]">
                  {formatDate(date)}
                </div>

                <div className="relative shadow-md sm:rounded-lg ">
                  <div className="table-wrapper">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:[#939393] table-fixed">
                      <thead className="text-md font-bold text-black uppercase  ">
                        <tr>
                          <th
                            scope="col"
                            className="  text-center"
                            style={{ width: '10%' }}
                          >
                            {' '}
                            Sl No
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Email ID
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
                            style={{ width: '25%' }}
                          >
                            {' '}
                            Project Name
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3  text-center"
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
                        {groupedProjects[date].map((project, projectIndex) => (
                          <tr
                            key={project._id}
                            className="bg-white text-md font-semibold text-black hover:bg-gray-50 dark:hover:bg-gray-600 "
                          >
                            <td
                              className="  text-center"
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {projectIndex + 1}
                            </td>
                            <td
                              className={`px-2 py-3  text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {project.fullName}
                            </td>
                            <td
                              className={`px-2 py-3  text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {project.emailAddress}
                            </td>
                            <td
                              className={`px-2 py-3  text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {project.contactNumber}
                            </td>
                            <td
                              className={`px-2 py-3  text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {project.projectName}
                            </td>
                            <td
                              className={`px-2 py-3  text-center`}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              {formatTime(project.createdAt)}{' '}
                            </td>
                            <td
                              className="text-[#FF9D00] font-bold text-center cursor-pointer px-2 py-3  items-center gap-2 min-w-[150px]"
                              onClick={() => handleViewDetails(project)}
                              style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                boxSizing: 'border-box',
                              }}
                            >
                              <div className="flex justify-center gap-2">
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

export default ProjectManagement;
