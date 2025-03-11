import "./FetchTrains.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal";

const FetchTrains = ({ type, train }) => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();
  const bookClicked = (e) => {
    if (myContext.currUser.email === "") {
      myContext.displayPortal(true);
      return;
    }
    myContext.setPrice(e.target.value);
    navigate("/checkout");
  };

  if (type === "trains") {
    console.log(train);
    const train_id = train.trainId;
    const source = train.source;
    const destination = train.destination;
    // const totalSeats = train.totalSeats;
    const price = train.price;
    const trainClass = train.trainClass;

    const departureTimeRaw = train.departureTime;
    const arrivalTimeRaw = train.arrivalTime; // Fixed typo

    console.log("Raw Departure Time:", departureTimeRaw);
    console.log("Raw Arrival Time:", arrivalTimeRaw);
    console.log(trainClass);

    // If it's a full timestamp, convert it to a Date
    const departureTime = departureTimeRaw.includes("T") 
      ? new Date(departureTimeRaw).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) 
      : departureTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice

    const arrivalTime = arrivalTimeRaw.includes("T") 
      ? new Date(arrivalTimeRaw).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) 
      : arrivalTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice

    console.log("Formatted Departure Time:", departureTime);
    console.log("Formatted Arrival Time:", arrivalTime);


    const calculateDuration = (departureTimeRaw, arrivalTimeRaw) => {
      const getMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes; // Convert to total minutes
      };
    
      const depMinutes = getMinutes(departureTimeRaw);
      const arrMinutes = getMinutes(arrivalTimeRaw);
    
      let durationMinutes = arrMinutes - depMinutes;
    
      // Handle trains that cross midnight
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
    
    console.log("Train Duration:", duration);
    


    return (
      <div className="fetch-trains">

        <nav className="left-section">
          <div>
            Train ID: <br />
            <p className="detail">{train_id}</p>
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
            Train Class: <br />
            <p className="detail">{trainClass}</p>
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
export default FetchTrains;
