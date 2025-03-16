import "./FetchFlights.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal";

const FetchFlights = ({ type, flight }) => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();

  const bookClicked = (e) => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }
    navigate("/checkout");
  };

  // const checkAvailabilityClicked = (e) => {
  //   if (!myContext.currUser.email) {
  //     myContext.displayPortal(true);
  //     return;
  //   }
  //   navigate("/flight/availability");
  // }
  const checkAvailabilityClicked = () => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }
    
    navigate(`/available-flights`, { state: { flightId: flight.flightId } });
  };
  

  if (type === "flights") {
    const flight_id = flight.flightId;
    const airlineName = flight.airlineName;
    const source = flight.source;
    const destination = flight.destination;
    const price = flight.price;
    const flightClass = flight.flightClass;

    const departureTimeRaw = flight.departureTime;
    const arrivalTimeRaw = flight.arrivalTime;

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
    
      // Handle flights that cross midnight
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
      <div className="fetch-flights">

        <nav className="left-section">
          <div>
            Flight ID: <br />
            <p className="detail">{flight_id}</p>
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
            Airline: <br />
            <p className="detail">{airlineName}</p>
          </div>
          <div>
            Price: <br />
            <p className="detail">₹ {price}</p>
          </div>
          <div>
            Flight Class: <br />
            <p className="detail">{flightClass}</p>
          </div>
          <button value={price} onClick={checkAvailabilityClicked} id="check-btn">
              Check Availability
          </button>
        </nav>

        {/* <div className="buttons-container">
            <button value={price} onClick={bookClicked} id="book-btn">
              Book
            </button>
            <button value={price} onClick={checkAvailabilityClicked} id="book-btn">
              Check Availability
            </button>
        </div> */}

            <button value={price} onClick={bookClicked} id="book-btn">
              Book
            </button>
            <button value={price} onClick={checkAvailabilityClicked} id="check-btn">
              Check Availability
          </button>
            


        {myContext.portalView && createPortal(<Modal type={"notLogedIn"} />, document.getElementById("portal"))}

      </div>
    );
  }
  
};
export default FetchFlights;
