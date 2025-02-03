import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurServices from './pages/OurServices';
import OurTeam from './pages/OurTeam';
import EmployeeVerification from './pages/EmployeeVerification';
import Connect from './pages/Connect';
import Personel from './pages/personel';
import Sidebar from './components/Sidebar';
import NotFound from './pages/NotFound';
import ScrollUp from './components/ScrollUp';
import Loader from './components/Loader';
import NewProject from './pages/NewProject';
import EmployeeSales from './pages/EmployeeSales';
import EmployeeInternship from './pages/EmployeeInternship';
import FormManagement from'./pages/FormManagement';
import FooterManagement from'./pages/FooterManagement';
import PartnershipManagement from'./pages/PartnershipManagement';
import NewsManagement from'./pages/NewsManagement';
import EmployeeManagement from'./pages/EmployeeManagement';
import AdminManagement from'./pages/AdminManagement';
import AdminLogin from'./pages/AdminLogin';
import InternManagement from'./pages/InternManagement';
import InternManagementDetail from'./pages/InternManagementDetail';
import SalesManagement from'./pages/SalesManagement';
import SalesManagementDetail from'./pages/SalesManagementDetail';
import AddSales from'./pages/AddSales';
import AddEmployee from'./pages/AddEmployee';
import AddInterns from'./pages/AddInterns';
import EmployeeManagementDetail from'./pages/EmployeeManagementDetail';
import JobFairReg from './pages/JobFair/JobFairReg';



import ProjectManagement from'./pages/ProjectManagement';
import ProjectManagementDetail from'./pages/ProjectManagementDetail';
function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" ) {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2250);

        return () => clearTimeout(timeout);
    } else {
        setLoading(false);
    }
  }, [location.pathname]);

  const showHeaderFooterSocialMedia = ["/", "/about","/our-services","/connect-us","/employee-verification","/new-project-form","/employeesales","/employeeinternship"].includes(location.pathname);

  return (
    <>
      <ScrollUp />
      {loading ? (
        <Loader />
      ) : (
        <>
           {showHeaderFooterSocialMedia && <Header />}
           {showHeaderFooterSocialMedia && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route
              path="/employee-verification"
              element={<EmployeeVerification />}
            />
            <Route path="/connect-us" element={<Connect />} />
            <Route path="/personnel" element={<Personel />} />
            <Route path="/new-project-form" element={<NewProject />} />
            <Route path="/employeesales" element={<EmployeeSales />} />
            <Route path="/employeeinternship" element={<EmployeeInternship />} />

            <Route path="/admin/admin-login" element={<AdminLogin/>} />
            <Route path="/admin/admin-management" element={<AdminManagement/>} />
            <Route path="/admin/form-management" element={<FormManagement/>} />
            <Route path="/admin/partnership-management" element={<PartnershipManagement/>} />
            <Route path="/admin/news-management" element={<NewsManagement/>} />
            <Route path="/admin/project-management" element={<ProjectManagement/>} />
            <Route path="/admin/project-management-detail" element={<ProjectManagementDetail/>} />
            <Route path="/admin/employee-management" element={<EmployeeManagement/>} />
            <Route path="/admin/employeeManagement-addEmployee" element={<AddEmployee/>} />
            <Route path="/admin/employeeManagement-detail" element={<EmployeeManagementDetail/>} />
            <Route path="/admin/sales-management" element={<SalesManagement/>} />
            <Route path="/admin/salesManagement-add" element={<AddSales/>} />
            <Route path="/admin/salesManagement-detail" element={<SalesManagementDetail/>} />
            <Route path="/admin/intern-management" element={<InternManagement/>} />
            <Route path="/admin/intern-management-add" element={<AddInterns/>} />
            <Route path="/admin/intern-management-detail" element={<InternManagementDetail/>} />
            <Route path="/admin/footer-management" element={<FooterManagement/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {showHeaderFooterSocialMedia && <Footer />}
          </>
      )}

      <Routes>
        <Route path='/jobfair' element={<JobFairReg />} />
      </Routes>
    </>
  );
}


export default App;
