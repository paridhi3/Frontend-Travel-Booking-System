// import "./FetchFlights.css";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router";
// import { MyContext } from "../../Context/Context";
// import { createPortal } from "react-dom";
// import Modal from "../../Modal/Modal";

// const FetchFlights = ({ flight, filters }) => {
//   const myContext = useContext(MyContext);
//   const navigate = useNavigate();

//   // const filteredFlights = flight.filter(
//   //   (flight) =>
//   //     (!filters.source || flight.source.toLowerCase() === filters.source.toLowerCase()) &&
//   //     (!filters.destination || flight.destination.toLowerCase() === filters.destination.toLowerCase()) &&
//   //     (!filters.flightClass || flight.flightClass.toLowerCase() === filters.flightClass.toLowerCase()) &&
//   //     (!filters.departureDate || flight.departureDate === filters.departureDate)
//   // );

//   const bookClicked = (e) => {
//     if (!myContext.currUser.email) {
//       myContext.displayPortal(true);
//       return;
//     }
//     navigate("/checkout");
//   };

//   // const checkAvailabilityClicked = (e) => {
//   //   if (!myContext.currUser.email) {
//   //     myContext.displayPortal(true);
//   //     return;
//   //   }
//   //   navigate("/flight/availability");
//   // }

//   const checkAvailabilityClicked = () => {
//     if (!myContext.currUser.email) {
//       myContext.displayPortal(true);
//       return;
//     }

//     navigate(`/available-flights`, { state: { flightId: flight.flightId } });
//   };

//   const flight_id = flight.flightId;
//   const airlineName = flight.airlineName;
//   const source = flight.source;
//   const destination = flight.destination;
//   const price = flight.price;
//   const flightClass = flight.flightClass;

//   const departureTimeRaw = flight.departureTime;
//   const arrivalTimeRaw = flight.arrivalTime;

//   // If it's a full timestamp, convert it to a Date
//   const departureTime = departureTimeRaw.includes("T")
//     ? new Date(departureTimeRaw).toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : departureTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice

//   const arrivalTime = arrivalTimeRaw.includes("T")
//     ? new Date(arrivalTimeRaw).toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : arrivalTimeRaw.slice(0, 5); // If it's just HH:mm:ss, slice

//   const calculateDuration = (departureTimeRaw, arrivalTimeRaw) => {
//     const getMinutes = (time) => {
//       const [hours, minutes] = time.split(":").map(Number);
//       return hours * 60 + minutes; // Convert to total minutes
//     };

//     const depMinutes = getMinutes(departureTimeRaw);
//     const arrMinutes = getMinutes(arrivalTimeRaw);

//     let durationMinutes = arrMinutes - depMinutes;

//     // Handle flights that cross midnight
//     if (durationMinutes < 0) {
//       durationMinutes += 24 * 60; // Add 24 hours in minutes
//     }

//     const hours = Math.floor(durationMinutes / 60);
//     const minutes = durationMinutes % 60;

//     return hours > 0 && minutes > 0
//       ? `${hours}h ${minutes}min`
//       : hours > 0
//       ? `${hours}h`
//       : `${minutes}min`;
//   };

//   const duration = calculateDuration(
//     departureTimeRaw.slice(0, 5),
//     arrivalTimeRaw.slice(0, 5)
//   );

//   return (
//     <div className="fetch-flights">
//       <nav className="left-section">
//         <div>
//           Flight ID: <br />
//           <p className="detail">{flight_id}</p>
//         </div>
//         <div>
//           From: <br />
//           <p className="detail">{source}</p>
//         </div>
//         <div>
//           To: <br />
//           <p className="detail">{destination}</p>
//         </div>
//       </nav>

//       <nav className="middle-section">
//         <div>
//           Departure Time: <br />
//           <p className="detail">{departureTime?.slice(0, 5) || "N/A"}</p>{" "}
//           {/* Show only HH:mm */}
//         </div>
//         <div>
//           Arrival Time: <br />
//           <p className="detail">{arrivalTime?.slice(0, 5) || "N/A"}</p>{" "}
//           {/* Show only HH:mm */}
//         </div>
//         <div>
//           Duration: <br />
//           <p className="detail">{duration}</p>
//         </div>
//       </nav>

//       <nav className="right-section">
//         <div>
//           Airline: <br />
//           <p className="detail">{airlineName}</p>
//         </div>
//         <div>
//           Price: <br />
//           <p className="detail">₹ {price}</p>
//         </div>
//         <div>
//           Flight Class: <br />
//           <p className="detail">{flightClass}</p>
//         </div>
//         <button value={price} onClick={checkAvailabilityClicked} id="check-btn">
//           Check Availability
//         </button>
//       </nav>

//       {/* <div className="buttons-container">
//             <button value={price} onClick={bookClicked} id="book-btn">
//               Book
//             </button>
//             <button value={price} onClick={checkAvailabilityClicked} id="book-btn">
//               Check Availability
//             </button>
//         </div> */}

//       <button value={price} onClick={bookClicked} id="book-btn">
//         Book
//       </button>
//       <button value={price} onClick={checkAvailabilityClicked} id="check-btn">
//         Check Availability
//       </button>

//       {myContext.portalView &&
//         createPortal(
//           <Modal type={"notLogedIn"} />,
//           document.getElementById("portal")
//         )}
//     </div>
//   );

// };
// export default FetchFlights;

import "./FetchFlights.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal";

const FetchFlights = ({ flight }) => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();

  const bookClicked = () => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }
    navigate("/checkout");
  };

  const checkAvailabilityClicked = () => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }

    navigate(`/flight/FLIGHT/${flight.flightId}`);
  };

  const {
    flightId,
    airlineName,
    source,
    destination,
    price,
    flightClass,
    departureTime: departureTimeRaw,
    arrivalTime: arrivalTimeRaw,
  } = flight;

  // Convert timestamps to HH:mm format
  const formatTime = (timeRaw) => {
    return timeRaw.includes("T")
      ? new Date(timeRaw).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : timeRaw.slice(0, 5);
  };

  const departureTime = formatTime(departureTimeRaw);
  const arrivalTime = formatTime(arrivalTimeRaw);

  const calculateDuration = (departure, arrival) => {
    const getMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };
  
    let depMinutes = getMinutes(departure);
    let arrMinutes = getMinutes(arrival);
  
    let durationMinutes = arrMinutes - depMinutes;
    
    // Fix: Handle overnight flights (e.g., 23:30 -> 02:15)
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60;
    }
  
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
  };
  

  const duration = calculateDuration(departureTime, arrivalTime);

  return (
    <div className="fetch-flights">
      <nav className="left-section">
        <div>
          Flight ID: <br />
          <p className="detail">{flightId}</p>
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
          <p className="detail">{departureTime}</p>
        </div>
        <div>
          Arrival Time: <br />
          <p className="detail">{arrivalTime}</p>
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
        <button onClick={checkAvailabilityClicked} id="check-btn">
          Check Availability
        </button>
      </nav>

      <button onClick={bookClicked} id="book-btn">
        Book
      </button>

      {myContext.portalView &&
        createPortal(
          <Modal type={"notLogedIn"} />,
          document.getElementById("portal")
        )}
    </div>
  );
};

export default FetchFlights;
