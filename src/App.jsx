import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/our-services" element={<OurServices />}></Route>
        <Route path="/our-team" element={<OurTeam />}></Route>
        <Route
          path="/employee-verification"
          element={<EmployeeVerification />}
        ></Route>
        <Route path="/connect-us" element={<Connect />}></Route>

        <Route path="/personel" element={<Personel />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
