import "./FetchBuses.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal";

const FetchBuses = ({ type, bus }) => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();

  const bookClicked = (e) => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }
    myContext.setPrice(e.target.value);
    navigate("/checkout");
  };

  if (type === "bus") {
    const bus_id = bus.busId;
    const source = bus.source;
    const destination = bus.destination;
    // const totalSeats = bus.totalSeats;
    const price = bus.price;
    const busClass = bus.busClass;

    const departureTimeRaw = bus.departureTime;
    const arrivalTimeRaw = bus.arrivalTime; // Fixed typo

    // If it's a full timestamp, convert it to a Date
    const departureTime = departureTimeRaw.includes("T") 
      ? new Date(departureTimeRaw).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) 
      : departureTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice

    const arrivalTime = arrivalTimeRaw.includes("T") 
      ? new Date(arrivalTimeRaw).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) 
      : arrivalTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice


    const calculateDuration = (departureTimeRaw, arrivalTimeRaw) => {
      const getMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes; // Convert to total minutes
      };
    
      const depMinutes = getMinutes(departureTimeRaw);
      const arrMinutes = getMinutes(arrivalTimeRaw);
    
      let durationMinutes = arrMinutes - depMinutes;
    
      // Handle buses that cross midnight
      if (durationMinutes < 0) {
        durationMinutes += 24 * 60; // Add 24 hours in minutes
      }
    
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
    
      return hours > 0 && minutes > 0
        ? `${hours}h ${minutes}min`
        : hours > 0
        ? `${hours}h`
        : `${minutes}min`;
    };
    
    const duration = calculateDuration(departureTimeRaw.slice(0, 5), arrivalTimeRaw.slice(0, 5));
    


    return (
      <div className="fetch-buses">

        <nav className="left-section">
          <div>
            Bus ID: <br />
            <p className="detail">{bus_id}</p>
          </div>
          <div>
            From: <br />
            <p className="detail">{source}</p>
          </div>
          <div>
            To: <br />
            <p className="detail">{destination}</p>
          </div>
        </nav>

        <nav className="middle-section">
          <div>
            Departure Time: <br />
            <p className="detail">{departureTime?.slice(0, 5) || "N/A"}</p> {/* Show only HH:mm */}
          </div>
          <div>
            Arrival Time: <br />
            <p className="detail">{arrivalTime?.slice(0, 5) || "N/A"}</p> {/* Show only HH:mm */}
          </div>
          <div>
            Duration: <br />
            <p className="detail">{duration}</p>
          </div>
        </nav>


        <nav className="right-section">
          <div>
            Price: <br />
            <p className="detail">₹ {price}</p>
          </div>
          <div>
            Bus Class: <br />
            <p className="detail">{busClass}</p>
          </div>
        </nav>

        <button value={price} onClick={bookClicked} id="book-btn">
          Book
        </button>

        {myContext.portalView &&
          createPortal(
            <Modal type={"notLogedIn"} />,
            document.getElementById("portal")
          )}
      </div>
    );
  }
  
};
export default FetchBuses;
