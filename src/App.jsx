import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/User/Header";
import Footer from "./components/User/Footer";
import Sidebar from "./components/User/Sidebar";
import AdminSidebar from "./components/Admin/AdminSidebar";
import ScrollUp from "./components/ScrollUp";
import Loader from "./components/User/Loader";

// Page Imports
import Home from "./pages/User/Home";
import About from "./pages/User/About";
import OurServices from "./pages/User/OurServices";
import OurTeam from "./pages/User/OurTeam";
import EmployeeVerification from "./pages/User/EmployeeVerification";
import Connect from "./pages/User/Connect";
import Personel from "./pages/User/Personel";
import NewProject from "./pages/User/NewProject";
import EmployeeSales from "./pages/User/EmployeeSales";
import EmployeeInternship from "./pages/User/EmployeeInternship";
import FormManagement from "./pages/Admin/FormManagement";
import FooterManagement from "./pages/Admin/FooterManagement";
import PartnershipManagement from "./pages/Admin/PartnershipManagement";
import NewsManagement from "./pages/Admin/NewsManagement";
import EmployeeManagement from "./pages/Admin/EmployeeManagement";
import AdminManagement from "./pages/Admin/AdminManagement";
import AdminLogin from "./pages/Admin/AdminLogin";
import InternManagementDetail from "./pages/Admin/InternManagementDetail";
import SalesManagement from "./pages/SalesManagement";
import SalesManagementDetail from "./pages/Admin/SalesManagementDetail";
import AddSales from "./pages/Admin/AddSales";
import AddEmployee from "./pages/Admin/AddEmployee";
import AddInterns from "./pages/Admin/AddInterns";
import EmployeeManagementDetail from "./pages/Admin/EmployeeManagementDetail";
import ProjectManagement from "./pages/Admin/ProjectManagement";
import ProjectManagementDetail from "./pages/Admin/ProjectManagementDetail";
import NotFound from "./pages/NotFound";
import AdminNavbar from "./components/Admin/AdminNavbar";
import Dashboard from "./components/Admin/Dashboard";
import FormManagementDetails from "./pages/Admin/FormManagementDetails";
import TermsAndConditions from "./pages/User/TermsAndConditions";
import TermsAndConditionForNewProject from "./pages/User/TermsAndConditionForNewProject";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";

function App() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    // useEffect(() => {
    //     if (location.pathname === "/") {
    //         setLoading(true);
    //         const timeout = setTimeout(() => setLoading(false), 1050);
    //         return () => clearTimeout(timeout);
    //     } else {
    //         setLoading(false);
    //     }
    // }, [location.pathname]);
    useEffect(() => {
    const hasLoaded = sessionStorage.getItem("homeLoaded");

    if (location.pathname === "/" && !hasLoaded) {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("homeLoaded", "true"); // Mark as loaded
        }, 1050);

        return () => clearTimeout(timeout);
    } else {
        setLoading(false);
    }
}, [location.pathname]);

    const showHeaderFooter = [
        "/",
        "/about-trackpi",
        "/business-consulting-services",
        "/contact-us",
        "/employee-verification",
        "/project-submission",
        "/employeesales",
        "/employeeinternship",
        "/termsconditions",
        "/termsconditions-submit-new-project"
    ].includes(location.pathname);
    const isNotFoundRoute = location.pathname === "/not-found";
    const isAdminRoute =
        location.pathname.startsWith("/admin") && location.pathname !== "/admin/admin-login" && !isNotFoundRoute;
    const isAdminRouted =
        location.pathname.startsWith("/admin") && location.pathname !== "/admin/admin-login" && !isNotFoundRoute;

        const fontClass = isAdminRoute ? "font-inter" : "font-urbanist";
    return (
        <div className={fontClass}>
            <ScrollUp />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {showHeaderFooter && <Header />}
                    {!isAdminRoute && !isNotFoundRoute && location.pathname !== "/admin/admin-login" && <Sidebar />}
                    <div style={isAdminRoute ? { display: "flex" } : {}}>
                        {isAdminRoute && !isNotFoundRoute && <AdminSidebar />}
                        <div style={isAdminRoute ? { width:"100%", overflowY: "scroll", height: "100%" } : {}}>
                            {isAdminRouted && !isNotFoundRoute && <AdminNavbar />}
                            <div style={isAdminRoute ? styles.content : null}>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about-trackpi" element={<About />} />
                                    <Route path="/business-consulting-services" element={<OurServices />} />
                                    <Route path="/employee-verification" element={<EmployeeVerification />} />
                                    <Route path="/contact-us" element={<Connect />} />
                                    <Route path="/personnel" element={<Personel />} />
                                    <Route path="/project-submission" element={<NewProject />} />
                                    <Route path="/employeesales" element={<EmployeeSales />} />
                                    <Route path="/employeeinternship" element={<EmployeeInternship />} />
                                    <Route path="/termsconditions" element={<TermsAndConditions />} />
                                    <Route path="/termsconditions-submit-new-project" element={<TermsAndConditionForNewProject />} />


                                    {/* Admin Routes */}
                                    <Route path="/admin/admin-login" element={<AdminLogin />} />
                                    <Route element={<PrivateRoute/>}>
                                    <Route path="/admin/dashboard" element={<Dashboard />} />
                                    <Route path="/admin/admin-management" element={<AdminManagement />} />
                                    <Route path="/admin/form-management" element={<FormManagement />} />
                                    <Route path="/admin/form-details/:formId" element={<FormManagementDetails />} />
                                    <Route path="/admin/partnership-management" element={<PartnershipManagement />} />
                                    <Route path="/admin/news-management" element={<NewsManagement />} />
                                    <Route path="/admin/project-management" element={<ProjectManagement />} />
                                    <Route path="/admin/project-details/:projectId" element={<ProjectManagementDetail />} />
                                    <Route path="/admin/employee-management" element={<EmployeeManagement />} />
                                    <Route path="/admin/employeeManagement-addEmployee/:id" element={<AddEmployee />} />

                                   <Route path="/admin/employeeManagement-addEmployee/:id" element={<AddEmployee />} />
                                   <Route path="/admin/employeeManagement-addEmployee/" element={<AddEmployee />} />
                                   <Route path="/admin/employeeManagement-detail" element={<EmployeeManagementDetail />} />
                                   <Route path="/admin/sales-management" element={<SalesManagement />} />
                                   <Route path="/admin/salesManagement-add/:id" element={<AddSales />} />
                                   <Route path="/admin/salesManagement-add/" element={<AddSales />} />
                                   <Route path="/admin/salesManagement-detail" element={<SalesManagementDetail />} />
                                   <Route path="/admin/intern-management-add/:id" element={<AddInterns />} />
                                   <Route path="/admin/intern-management-add/" element={<AddInterns />} /> 
                                  <Route path="/admin/intern-management-detail" element={<InternManagementDetail />} />
                                   <Route path="/admin/footer-management" element={<FooterManagement />} />
                                   </Route>

                                    {/* 404 Not Found */}
                                    <Route path="/not-found" element={<Navigate to={"/not-found"} />} />
                                    <Route path="/*" element={<NotFound />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    {showHeaderFooter && <Footer />}
                </>
                
            )}
                  <ToastContainer position="top-center" autoClose={5000} hideProgressBar />

        </div>
    );
}

const styles = {
    content: {
        padding: "2px",
        overflowY: "scroll",
        height: "calc(100vh - 80px)",
        backgroundColor:"white"
    },
};

export default App;