import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import projectManageBack from '../../images/projectManageBack.svg';
import { HiDownload } from 'react-icons/hi';
// import baseURL from "../../Api Services/baseURL"
import { SERVER_URL } from '../../Api Services/serverUrl';
// SERVER_URL
function ProjectManagementDetail() {
  const [fileUrl, setFileUrl] = useState('');
  console.log(fileUrl, 'fileurlsss');

  const location = useLocation();
  const mockData = location.state;

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);

    return formattedDate;
  };

  useEffect(() => {
    const url = `${SERVER_URL}${mockData?.file}`;
    setFileUrl(url);
  }, [mockData.file]);

  return (
    <div className="bg-white w-full">
      <div className="py-[40px] px-[30px] grid gap-[40px]">
        <div className="flex justify-between">
          <div className="text-[24px] font-bold">Project Management</div>
          <div className="flex items-center gap-4">
            <div className="text-[16px] font-bold">
              {formatDate(mockData.createdAt)}
            </div>

            <Link
              className="text-decoration-none"
              to={'/admin/project-management'}
            >
              <button className="w-[120px] h-[40px] rounded-[10px] text-white bg-[#FF9D00] flex gap-[10px] justify-center items-center">
                <div>
                  <img className="m-auto" src={projectManageBack} alt="" />
                </div>
                <div className="text-[18px] font-semibold">Back</div>
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-[10px] flex flex-wrap justify-between items-center w-100 gap-[20px] 2xl:gap-[90px]">
          <div className="grid gap-[15px]  min-w-[300px] projectDetailsBorderDiv 2xl:grow">
            <div className="text-[18px]">Name</div>
            <div className="text-[20px] font-bold">{mockData.fullName}</div>
          </div>
          <div className="grid gap-[15px]  min-w-[300px] projectDetailsBorderDiv 2xl:grow">
            <div className="text-[18px]">Contact</div>
            <div className="text-[20x] font-bold">{mockData.contactNumber}</div>
          </div>
          <div className="grid gap-[15px]  min-w-[300px] projectDetailsBorderDiv 2xl:grow">
            <div className="text-[18px]">Email</div>
            <div className="text-[20x] font-bold">{mockData.emailAddress}</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center w-100 gap-[20px] 2xl:gap-[90px]">
          <div className="grid gap-[15px] min-w-[300px] projectDetailsBorderDiv 2xl:grow ">
            <div className="text-[18px]">Current Status</div>
            <div className="text-[20px] font-bold">{mockData.userType}</div>
          </div>
          <div className="grid gap-[15px] min-w-[300px] projectDetailsBorderDiv 2xl:grow ">
            <div className="text-[18px]">Qualification</div>
            <div className="text-[20px] font-bold">
              {mockData.qualification}
            </div>
          </div>
          <div className="grid gap-[15px] min-w-[300px] projectDetailsBorderDiv 2xl:grow ">
            <div className="text-[18px]">Institute Name</div>
            <div className="text-[20px] font-bold">
              {mockData.institute_company}
            </div>
          </div>
        </div>
        <div className="flex gap-[40px] justify-between ">
          <div className="grid gap-[15px] w-100">
            <div className="projectDetailsBorderDiv min-h-[110px] grid gap-[15px]">
              <div className="text-[18px]">Project/Idea Name</div>
              <div className="text-[20px] font-bold">
                {mockData.projectName}
              </div>
            </div>
            <div
              className="projectDetailsBorderDiv min-h-[180px] break-words whitespace-normal max-w-full"
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                boxSizing: 'border-box',
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              <div className="text-[18px] pb-[15px] ">
                What Problem Does Your Idea Solve?
              </div>
              <div className="text-[20px] font-bold">
                {mockData.problemSolved}
              </div>
            </div>

            <div className="projectDetailsBorderDiv min-h-[180px]">
              <div className="text-[18px] pb-[15px]">
                Who would benefit from this idea?
              </div>
              <div className="text-[20px] font-bold">
                {mockData.beneficiaries}
              </div>
            </div>
          </div>
          <div className="grid gap-[15px] w-100">
            <div
              className="projectDetailsBorderDiv min-h-[110px] break-words whitespace-normal max-w-full"
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                boxSizing: 'border-box',
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              <div className="text-[18px] pb-[15px]">
                Do You Have Any Business or Technical Skills?
              </div>
              <div className="text-[20px] font-bold">{mockData.skills}</div>
            </div>
            <div
              className="projectDetailsBorderDiv min-h-[180px] break-words whitespace-normal max-w-full"
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                boxSizing: 'border-box',
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              <div className="text-[18px] pb-[15px]">
                Why Do You Think This Idea Will Succeed?
              </div>
              <div className="text-[20px] font-bold">
                {mockData.successReason}
              </div>
            </div>
            <div
              className="projectDetailsBorderDiv min-h-[180px] break-words whitespace-normal max-w-full"
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                boxSizing: 'border-box',
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              <div className="text-[18px] pb-[15px]">Summarize your project ideas.</div>
              <div className="text-[20px] font-bold">{mockData.summary}</div>
            </div>
          </div>
        </div>
        {/* <img src="http://192.168.43.197:3001/assets/1736698412080.JPG" alt="" /> */}

        <div className="flex justify-center">
          <div className="w-[500px] h-[230px] grid text-white projectDetailsDocument">
            <div className="relative bg-[#0A0A0A] h-[200px] flex justify-center items-center text-center my-auto text-[22px] overflow-hidden group">
              {fileUrl ? (
                <div className="relative w-full h-full">
                  {/* Semi-transparent overlay */}
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
                    style={{ zIndex: 1 }}
                  ></div>
                  {/* PDF Viewer */}
                  <iframe
                    src={fileUrl}
                    className="w-full h-full"
                    style={{
                      border: 'none',
                      position: 'relative',
                      zIndex: 0,
                      overflow: 'auto',
                    }}
                    scrolling="yes"
                    title="PDF Viewer"
                  ></iframe>
                  {/* Download Icon */}
                  <a
                    href={fileUrl}
                    download="document.pdf"
                    className="absolute top-4 right-4 hidden group-hover:flex items-center justify-center w-10 h-10 bg-[#FF9D00] rounded-md text-black"
                    style={{ zIndex: 2 }}
                  >
                    <HiDownload className="w-6 h-6" color="white" />
                  </a>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="h-[30px] bg-[#FF9D00] text-[14px] px-[7px] font-semibold flex items-center">
              {mockData.fileName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagementDetail;
