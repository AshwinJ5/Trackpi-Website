import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import imagepersonnel1 from '../../images/personnel-1-400x286.jpg'
import imagepersonnel2 from '../../images/personnel-2-400x286.jpg'
import imagepersonnel3 from '../../images/personnel-3-400x310.jpg'
import imagepersonnel4 from '../../images/personnel-4-400x310.jpg'
import imagepersonnel5 from '../../images/personnel-5-400x310.jpg'
import imagepersonnel6 from '../../images/personnel-6-400x310.jpg'

const data = [
  {
    sl_no: 1,
    name: 'Ava Thompson',
    email: 'ava.thompson@gmail.com',
    desig: 'Software Engineer',
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',
    image:imagepersonnel1,
    title:'employee image',
  },
  {
    sl_no: 2,
    name: 'Liam Anderson',
    email: 'liam.anderson@yahoo.com',
    desig: 'Product Manager',
    image:imagepersonnel2,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 3,
    name: 'Noah Clark',
    email: 'noah.clark@hotmail.com',
    desig: 'UX Designer',
    image:imagepersonnel3,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 4,
    name: 'Emma Moore',
    email: 'emma.moore@gmail.com',
    desig: 'Data Scientist',
    image:imagepersonnel4,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 5,
    name: 'Mason Hall',
    email: 'mason.hall@outlook.com',
    desig: 'Marketing Specialist',
    image:imagepersonnel5,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 6,
    name: 'Isabella Wright',
    email: 'isabella.wright@domain.com',
    desig: 'Business Analyst',
    image:imagepersonnel6,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 7,
    name: 'Elijah King',
    email: 'elijah.king@company.com',
    desig: 'DevOps Engineer',
    image:imagepersonnel1,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 8,
    name: 'Sophia Turner',
    email: 'sophia.turner@gmail.com',
    desig: 'Quality Assurance',
    image:imagepersonnel2,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 9,
    name: 'James Baker',
    email: 'james.baker@domain.com',
    desig: 'HR Manager',
    image:imagepersonnel3,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',

  },
  {
    sl_no: 10,
    name: 'Charlotte Adams',
    email: 'charlotte.adams@website.com',
    desig: 'Finance Executive',
    image:imagepersonnel4,
    selfIntroduction:'dolor sit amet consectetur. Rutrum sollicitudin ut urna magnis eget urna lectus suspendisse. Placerat faucibus leo pulvinar eu elementum etiam magna mauris. Leo mollis sem fermentum tellus euismod pharetra mauris lacinia nec. Mauris enim id arcu viverra vitae diam volutpat auctor.',


  },
];

const TableEmployee = () => {
  const navigate = useNavigate();
  const handleViewProfile = rowDatas => {
    console.log(rowDatas, 'rowDatas');
    navigate('/admin/employeeManagement-detail', { state: { rowDatas } });
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  border-dark border-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md font-bold text-black uppercase border-b-2 border-dark">
            <tr>
              <th scope="col" className=" border-r-2 text-center">
                SL No.
              </th>
              <th scope="col" className="px-2 py-3 border-r-2 text-center">
                Name
              </th>

              <th scope="col" className="px-2 py-3 border-r-2 text-center">
                Email ID
              </th>
              <th scope="col" className="px-2 py-3 border-r-2 text-center">
                Designation{' '}
              </th>
              <th scope="col" className="px-2 py-3 border-r-2 text-center">
                View
              </th>
              <th scope="col" className="px-2 py-3 border-r-2 text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white text-md font-semibold text-black dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 custom-table"
              >
                <>
                  <td key={rowIndex} className=" border-r-2  text-center">
                    {row.sl_no}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    {row.name}
                  </td>

                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    {/* <div className="flex justify-center items-center gap-2 "> */}
                    {row.email}
                    {/* </div> */}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    {row.desig}
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    <div
                      className="flex justify-center items-center gap-2 text-[#FF9D00] cursor-pointer"
                      onClick={() => handleViewProfile(row)}
                    >
                      View Profile <FiExternalLink size={15} />
                    </div>
                  </td>
                  <td className={`px-2 py-3 border-r-2 text-center`}>
                    <div className="flex justify-center items-center">
                      <RiDeleteBin6Line size={20} />
                    </div>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{' '}
    </div>
  );
};

export default TableEmployee;