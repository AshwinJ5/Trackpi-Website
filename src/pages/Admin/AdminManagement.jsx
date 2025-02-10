import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { FaRegEdit } from 'react-icons/fa';
import { RiFileCopyLine } from 'react-icons/ri';
import baseURL from '../../Api Services/baseURL';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from 'react-icons/io';
import { IoIosWarning } from 'react-icons/io';

const adminToken = localStorage.getItem('adminToken');

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [addAdminData, setAddAdminData] = useState({
    username: '',
    password: '',
    adminType: '',
    email: '',
  });
  const [editModalData, setEditModalData] = useState({});

  const [editIndex, setEditIndex] = useState(null);
  //modal handeler
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [copied, setCopied] = useState({ status: false, username: '' });
  const [refresh, setRefresh] = useState('');
  const [loading, setLoading] = useState(true);

  const toggleStatus = async (adminId, status) => {
    const updatedAdmins = [...admins];

    // Find the admin using the ID
    const adminIndex = updatedAdmins.findIndex(admin => admin._id === adminId);
    if (adminIndex === -1) {
      console.error('Admin not found!');
      return;
    }

    // Optimistically update the state
    const newStatus = status ? 'activate' : 'deactivate';
    updatedAdmins[adminIndex].isActive = status;
    setAdmins(updatedAdmins);

    try {
      await baseURL.patch(
        `updateStatus/${adminId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setRefresh(!refresh); // Trigger refresh on success
    } catch (error) {
      console.error('Error updating admin status:', error);

      // Revert the state if the API call fails
      updatedAdmins[adminIndex].isActive = !status;
      setAdmins(updatedAdmins);
    }
  };

  const handleAdminAdd = async () => {
    // Basic validation to ensure no empty fields
    if (
      !addAdminData.username ||
      !addAdminData.password ||
      !addAdminData.adminType ||
      !addAdminData.email
    ) {
      alert('All fields are required!');
      return;
    }

    try {
      const newAdmin = {
        username: addAdminData.username,
        password: addAdminData.password,
        adminType: addAdminData.adminType,
        email: addAdminData.email,
      };

      // Make an API request to add the admin
      const response = await baseURL.post('/admin', newAdmin, {
        headers: {
          Authorization: `Bearer ${adminToken}`, // Include the token here
        },
      });

      if (response.status === 201) {
        // On success, add the admin to the table
        setAddAdminData({
          username: '',
          password: '',
          adminType: '',
          email: '',
        });

        setRefresh(response.data);
        toast.success('New Admin Added Successfully!!!');

        handleClose1();
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };
  const handleAdminAddClick = () => {
    handleShow1();
  };
  const handleEditClick = index => {
    const adminData = admins[index]; // Get the admin data to edit
    setEditModalData(adminData);
    handleShow(); // Open modal in edit mode
    setEditIndex(index);
  };

  const handleUpdateAdmin = async () => {
    if (
      !editModalData.username ||
      !editModalData.email ||
      !editModalData.password ||
      !editModalData.adminType
    ) {
      toast.error('All fields are required!');
      return;
    }

    // Extract adminId from editModalData or admins
    const adminId = editModalData._id || admins[editIndex]._id;

    // Find the existing admin data from the state
    const originalAdmin = admins[editIndex];

    // Check if any changes were made
    const isChanged =
      editModalData.username !== originalAdmin.username ||
      editModalData.email !== originalAdmin.email ||
      editModalData.password !== originalAdmin.password ||
      editModalData.adminType !== originalAdmin.adminType;

    if (!isChanged) {
      toast.info('No changes detected. Update not required.');
      return; // Stop execution if no changes are made
    }

    try {
      const updatedAdmin = {
        username: editModalData.username,
        email: editModalData.email,
        password: editModalData.password,
        adminType: editModalData.adminType,
      };

      const response = await baseURL.patch(`/admin/${adminId}`, updatedAdmin, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.status === 200) {
        // Update the state with the new admin data
        const updatedRows = [...admins];
        updatedRows[editIndex] = response.data.admin;
        setRefresh(response.data);
        setAdmins(updatedRows);
        toast.success('Admin Details Updated Successfully!!!');

        // Close the modal
        handleClose();
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  const handleCopy = (text, username) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied({ status: true, username });
        // Reset copied status after 2 seconds
        setTimeout(() => setCopied({ status: false, username: '' }), 3000);
      })
      .catch(error => {
        console.error('Failed to copy: ', error);
      });
  };

  const handleOpenDeleteBox = () => {
    handleShow2();
  };
  const handleAdminDelete = async () => {
    try {
      const adminId = editModalData._id; // Get the admin ID from the modal data
      if (!adminId) {
        console.error('Admin ID not found');
        return;
      }

      await baseURL.delete(`/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      // Filter out the deleted admin from the list
      const updatedAdmins = admins.filter(admin => admin._id !== adminId);
      setAdmins(updatedAdmins);
      handleClose();
      handleClose2();
      toast.success('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleDeleteCancel = () => {
    handleClose2();
  };
  const handleEditCancel = () => {
    handleClose();
  };
  const handleAddCancel = () => {
    handleClose1();
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await baseURL.get('/admin', {});
        setAdmins(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAdmins();
  }, [refresh]);

  return (
    <div className="w-full bg-white">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h4 className="font-bold my-4">Admin Management</h4>
          <div>
            <button
              className="py-2 px-8 rounded-3 flex items-center gap-2 bg-[#FF9D00] text-white font-bold"
              onClick={handleAdminAddClick}
            >
              <IoMdArrowBack /> Add Admin
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg  border-[#939393] border-1">
            <table
              className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-[#939393]"
              style={{ tableLayout: 'fixed' }}
            >
              <thead className="text-md font-bold text-black uppercase border-[#939393] border-b ">
                <tr>
                  <th
                    scope="col"
                    className=" border-r text-center"
                    style={{ width: '10%' }}
                  >
                    SL No.
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border-r text-center"
                    style={{ width: '25%' }}
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border-r text-center"
                    style={{ width: '25%' }}
                  >
                    Email ID
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border-r text-center"
                    style={{ width: '25%' }}
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border-r text-center"
                    style={{ width: '25%' }}
                  >
                    Admin Type
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border-r text-center"
                    style={{ width: '20%' }}
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3  text-center"
                    style={{ width: '25%' }}
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {admins.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white text-md font-semibold text-black dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 custom-table"
                  >
                    <>
                      <td
                        key={row._id}
                        className=" border-r text-center"
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {rowIndex + 1}
                      </td>
                      <td
                        className={`px-2 py-3 border-r text-center`}
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        {row.username}
                      </td>
                      <td
                        className={`px-2 py-3 border-r text-center`}
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        {row.email}
                      </td>
                      <td
                        className="px-2 py-3 border-r text-center"
                        style={{
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        }}
                      >
                        <div className="flex justify-center items-center gap-1 cursor-pointer">
                          {/* Show only the first few characters with '...' */}
                          <span
                            title={row.password} // Tooltip shows the full password
                            style={{
                              display: 'inline-block',
                              maxWidth: '150px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {row.password}
                          </span>
                          <i
                            className={`fa-copy cursor-pointer ${
                              copied.status && row.username === copied.username
                                ? 'text-warning fa-solid'
                                : 'fa-regular'
                            }`}
                            onClick={() =>
                              handleCopy(row.password, row.username)
                            }
                          ></i>
                        </div>
                      </td>

                      <td
                        className={`px-2 py-3 border-r text-center`}
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        {row.adminType}
                      </td>
                      <td
                        className={`px-2 py-3 border-r text-center`}
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        <div className="flex justify-center items-center">
                          <FaRegEdit
                            size={15}
                            onClick={() => handleEditClick(rowIndex)}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td
                        className={`px-2 py-3 border-r text-center`}
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div className="flex justify-center gap-2.5">
                          <button
                            onClick={() => toggleStatus(row._id, true)} // Explicit activation
                            className={`${
                              row.isActive
                                ? 'bg-[#FF9D00] text-white'
                                : 'bg-white text-black'
                            } ${
                              row.isActive ? 'py-1 px-2' : 'py-1 pr-7 pl-2'
                            } rounded-full cursor-pointer relative text-xs font-bold ${
                              row.isActive ? 'z-10' : 'z-0'
                            } mr-[-30px]`}
                            style={{
                              border: row.isActive ? 'none' : '1px solid black',
                            }}
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => toggleStatus(row._id, false)} // Explicit deactivation
                            className={`${
                              row.isActive
                                ? 'bg-white text-black'
                                : 'bg-[#FF0000] text-white'
                            } ${
                              row.isActive ? 'py-1 pr-2 pl-7' : 'py-1 px-2'
                            } rounded-full cursor-pointer relative text-xs font-bold ${
                              row.isActive ? 'z-0' : 'z-10'
                            }`}
                            style={{
                              border: row.isActive ? '1px solid black' : 'none',
                            }}
                          >
                            Deactivate
                          </button>
                        </div>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="border m-5 shadow rounded-4">
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show1}
              onHide={handleClose1}
            >
              <Modal.Body>
                <div className="flex justify-center items-center gap-32 pt-5 ">
                  <h3 className="text-center mx-10 font-bold text-[#0A0A0A]">
                    Add Admin
                  </h3>
                </div>

                <Row className="m-5">
                  <Col sm={6} className="mb-5">
                    <label htmlFor="username" className="d-block font-semibold">
                      User Name
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg border-gray-500 my-2 border-2 shadow-md"
                      placeholder="User Name"
                      value={addAdminData.username || ''}
                      onChange={e =>
                        setAddAdminData({
                          ...addAdminData,
                          username: e.target.value,
                        })
                      }
                      style={{ fontSize: '16px' }}
                    />
                  </Col>

                  <Col sm={6} className="mb-5">
                    <label htmlFor="emailid" className="d-block font-semibold">
                      Email ID
                    </label>
                    <input
                      type="email"
                      id="emailid"
                      className="form-control form-control-lg border-gray-500 my-2 border-2 shadow-md"
                      placeholder="Email ID"
                      value={addAdminData.email || ''}
                      onChange={e =>
                        setAddAdminData({
                          ...addAdminData,
                          email: e.target.value,
                        })
                      }
                      style={{ fontSize: '16px' }}
                    />
                  </Col>

                  <Col sm={6} className="mb-5">
                    <label htmlFor="password" className="d-block font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      id="password"
                      className="form-control form-control-lg border-gray-500 my-2 border-2 shadow-md"
                      placeholder="Password"
                      value={addAdminData.password || ''}
                      onChange={e =>
                        setAddAdminData({
                          ...addAdminData,
                          password: e.target.value,
                        })
                      }
                      style={{ fontSize: '16px' }}
                    />
                  </Col>

                  <Col sm={6} className="mb-5">
                    <label
                      htmlFor="adminType"
                      className="d-block font-semibold"
                    >
                      Admin Type
                    </label>
                    <select
                      className="form-select form-select-lg border-gray-500 my-2 border-2 shadow-md"
                      aria-label="Default select example"
                      id="adminType"
                      value={addAdminData.adminType || ''}
                      onChange={e =>
                        setAddAdminData({
                          ...addAdminData,
                          adminType: e.target.value,
                        })
                      }
                      style={{ fontSize: '16px' }}
                    >
                      <option defaultChecked value="">
                        Admin Type
                      </option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                  </Col>

                  <Col sm={12} className="d-flex   gap-12 justify-center mt-3">
                    <button
                      className="w-25 py-2 rounded-3 bg-[#FF9D00] text-white font-bold"
                      onClick={handleAdminAdd}
                    >
                      Add
                    </button>
                    <button
                      className="w-25 py-2 rounded-3 text-[#FF9D00] font-bold btnBorder"
                      onClick={handleAddCancel}
                    >
                      Cancel
                    </button>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <div className="flex justify-between items-center pr-4  pl-28 pt-5 pb-5">
            <div className="dummy"></div>
            <h4 className="text-center mx-10 font-bold text-[#0A0A0A]">
              Edit Admin Details
            </h4>
            <div className="flex flex-end">
              <button
                className="w-100 py-2 px-8 rounded-3  text-[#FF9D00] font-bold btnBorder"
                onClick={handleOpenDeleteBox}
              >
                <RiDeleteBin6Line
                  size={18}
                  className="inline-block mx-1.5 text-center"
                />{' '}
                Delete
              </button>
            </div>
          </div>
          <Row className="mx-3 my-2">
            <Col sm={6} className="mb-4">
              <label htmlFor="username" className="d-block font-semibold">
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control form-control-lg border-gray-500  my-2 border-2   shadow-md"
                placeholder="user name"
                value={editModalData.username || ''} // Use value instead of defaultValue
                onChange={e =>
                  setEditModalData({
                    ...editModalData,
                    username: e.target.value,
                  })
                }
                style={{ fontSize: '16px' }}
              />
            </Col>
            <Col sm={6} className="mb-4">
              <label htmlFor="emailid" className="d-block font-semibold">
                Email ID
              </label>
              <input
                type="text"
                id="emailid"
                className="form-control form-control-lg border-gray-500  my-2 border-2   shadow-md"
                placeholder="Email ID"
                defaultValue={editModalData.email || ''}
                onChange={e =>
                  setEditModalData({ ...editModalData, email: e.target.value })
                }
                style={{ fontSize: '16px' }}
              />
            </Col>
            <Col sm={6} className="mb-4">
              <label htmlFor="password" className="d-block font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg border-gray-500  my-2 border-2   shadow-md"
                placeholder="password"
                defaultValue={editModalData.password || ''}
                onChange={e =>
                  setEditModalData({
                    ...editModalData,
                    password: e.target.value,
                  })
                }
                style={{ fontSize: '16px' }}
              />
            </Col>

            <Col sm={6} className="mb-4">
              <label htmlFor="admintype" className="d-block font-semibold">
                Admin Type
              </label>
              <select
                className="form-select form-select-lg  border-gray-500  my-2 border-2   shadow-md"
                aria-label="admintype"
                id="admintype"
                defaultValue={editModalData.adminType || ''}
                onChange={e =>
                  setEditModalData({
                    ...editModalData,
                    adminType: e.target.value,
                  })
                }
                style={{ fontSize: '16px' }}
              >
                <option defaultValue disabled>
                  Admin Type
                </option>
                <option value="admin">admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </Col>
            <Col sm={12} className="d-flex   gap-12 justify-center mt-3">
              <button
                className="w-25 py-2 rounded-3 bg-[#FF9D00] text-white font-bold"
                onClick={handleUpdateAdmin}
              >
                Save
              </button>
              <button
                className="w-25 py-2 rounded-3 text-[#FF9D00] font-bold btnBorder"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* delete Modal */}
      <div className="custom-overlay"></div>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show2}
        onHide={handleClose2}
        className="bg-[#00000062]"
      >
        <Modal.Body className="mx-8">
          <div className="flex items-center text-[24px] font-700 py-2 justify-start gap-2 text-[#FF9D00]">
            <IoIosWarning />
            Delete Admin
          </div>
          <p className="text-start font-700 text-[#0A0A0A] mt-2 text-[18px]">
            Are you sure you want to delete this admin?
          </p>
          <div className="flex gap-4 justify-between items-center py-2">
            <div>
              <button
                onClick={handleAdminDelete}
                className="bg-[#FF9D00] text-white px-16 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
            <div>
              <button
                onClick={handleDeleteCancel}
                className="text-[#FF9D00] font-semibold btnBorder px-16 py-1 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default AdminManagement;
