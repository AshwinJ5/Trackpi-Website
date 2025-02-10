import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import logo from '../../images/trackpi_logo_one.png';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../Api Services/baseURL';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  // Prevent logged-in users from accessing login page
  useEffect(() => {
    if (adminToken) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [adminToken, navigate]);

  const onLogin = async () => {
    if (!data.username || !data.password) {
      toast.error('Please fill in both fields.');
      return;
    }

    try {
      const response = await baseURL.post('/adminlogin', data);
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken._id;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminId', adminId);

      toast.success('Successfully Logged In!');

      //  Prevent the login page from staying in history (so back button won't return here)
      setTimeout(() => {
        navigate('/admin/admin-management', { replace: true });
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, '', window.location.href);
        };
      }, 500);
    } catch (e) {
      console.error(e);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="bg-white d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Row className="px-3 py-2">
        <Col sm={12} className="d-flex justify-content-center">
          <img src={logo} alt="logo" className="img-fluid" width={200} />
        </Col>
        <Col sm={12}>
          <h3 className="font-bold text-center mt-5 mb-4">Login</h3>
        </Col>
        <Col sm={12} className="d-flex justify-content-center">
          <form
            onSubmit={e => {
              e.preventDefault();
              onLogin();
            }}
          >
            <Row>
              <Col sm={12} className="mb-3">
                <label htmlFor="username" className="d-block font-semibold">
                  User Name/ Email id
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg border-gray-500 my-2 border-2 shadow-md"
                  placeholder="Username/Email"
                  value={data.username}
                  onChange={e => setData({ ...data, username: e.target.value })}
                  style={{ fontSize: '16px' }}
                  autoComplete="current-username"
                />
              </Col>
              <Col sm={12} className="mb-3">
                <label htmlFor="password" className="d-block font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg border-gray-500 my-2 border-2 shadow-md"
                  placeholder="Password"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  style={{ fontSize: '16px' }}
                  autoComplete="current-password"
                />
              </Col>
              <Col sm={12} className="d-flex justify-content-center mt-3">
                <button
                  className="w-50 py-2 bg-[#FF9D00] rounded-lg text-white"
                  style={{ fontWeight: 'bolder' }}
                  type="submit"
                >
                  Login
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLogin;
