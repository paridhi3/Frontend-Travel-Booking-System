// import { useState } from "react";
import Header from "./components/Header/Header";
// import Header2 from "./components/Header2/Header2";
import Footer from "./components/Footer/Footer";
import { ContextProvider } from "./components/Context/Context";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Flights from "./components/Flights/Flights/Flights";
// import AvailableFlights from "./components/Flights/AvailableFlights/AvailableFlights";
// import Trains from "./components/Trains/Trains/Trains";
// import AvailableTrains from "./components/Trains/AvailableTrains/AvailableTrains";
// import Buses from "./components/Buses/Buses/Buses";
// import AvailableBuses from "./components/Buses/AvailableBuses/AvailableBuses";
// import Admin from "./components/Admin/Admin";
import AdminPage from "./components/Admin/AdminPage"
import Transport from "./components/Transport/Transport";
import AvailableTransport from "./components/Transport/AvailableTransport";
import "./styles/App.css";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/Not Found/NotFound";
import AdminLogIn from "./components/Admin/AdminLogin";

function App() {

  // const [fixedHeader, setFixedHeader] = useState(false);
  // window.addEventListener('scroll', ()=>{
  //   if(window.pageYOffset>72){ // 72 means 72px(or 4.5rem)
  //     setFixedHeader(true);
  //   }else{
  //     setFixedHeader(false);
  //   }
  // })

  return (
    <ContextProvider>
      {/* {fixedHeader? <Header2 />: <Header /> } */}
      <Header />
      <div id="main">
      <Routes>
          <Route path='/' element={<Transport />} />
          {/* <Route path="/" element={<Navigate to="/flight" />} /> */}
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/adminLogin' element={<AdminLogIn />} />
          <Route path='/adminPage' element={<AdminPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/:transportType" element={<Transport />} />
          <Route path="/:transportType/:transportId" element={<AvailableTransport />} />
          {/* <Route path="/:mainType/:transportType/:transportId" element={<AvailableTransport />} /> */}
          {/* <Route path='/flights' element={<Flights />} /> */}
          {/* <Route path="/flight/:transportType/:transportId" element={<AvailableFlights />} /> */}
          {/* <Route path='/buses' element={<Buses />} /> */}
          {/* <Route path="/bus/:transportType/:transportId" element={<AvailableBuses />} /> */}
          {/* <Route path='/trains' element={<Trains />} /> */}
          {/* <Route path="/train/:transportType/:transportId" element={<AvailableTrains />} /> */}
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
      <Footer />
    </ContextProvider>
  );
}

export default App;
