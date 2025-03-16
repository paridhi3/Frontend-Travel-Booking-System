// import { useState } from "react";
import Header from "./components/Header/Header";
// import Header2 from "./components/Header2/Header2";
import Footer from "./components/Footer/Footer";
import { ContextProvider } from "./components/Context/Context";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Flights from "./components/Flights/Flights/Flights";
import AvailableFlights from "./components/Flights/AvailableFlights/AvailableFlights";
import Trains from "./components/Trains/Trains/Trains";
import Buses from "./components/Buses/Buses/Buses";
import "./styles/App.css";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/Not Found/NotFound";

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
          <Route path='/' element={<Flights />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/flights' element={<Flights />} />
          <Route path="/available-flights" element={<AvailableFlights />} />
          <Route path='/buses' element={<Buses />} />
          <Route path='/trains' element={<Trains />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
      <Footer />
    </ContextProvider>
  );
}

export default App;
