// import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ContextProvider } from "./components/Context/Context";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPage from "./components/Admin/AdminPage";
import Transport from "./components/Transport/Transport";
import AvailableTransport from "./components/Transport/AvailableTransport";
import "./styles/App.css";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/Not Found/NotFound";
import AdminLogIn from "./components/Admin/AdminLogin";
import AdminViewBookings from "./components/Admin/AdminViewBookings";
import BookingHistory from "./pages/BookingHistory/BookingHistory";

function App() {
  return (
    <ContextProvider>
      <Header />
      <div id="main">
        <Routes>
          <Route path="/" element={<Transport />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminLogin" element={<AdminLogIn />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/adminViewBookings" element={<AdminViewBookings />} />
          <Route path="/manageFlight" element={<AdminPage />} />
          <Route path="/manageTrain" element={<AdminPage />} />
          <Route path="/manageBus" element={<AdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookingHistory" element={<BookingHistory />} />
          <Route path="/:transportType" element={<Transport />} />
          <Route
            path="/:transportType/:transportId"
            element={<AvailableTransport />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </ContextProvider>
  );
}

export default App;
