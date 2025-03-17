// import "./FetchTrains.css";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router";
// import { MyContext } from "../../Context/Context";
// import { createPortal } from "react-dom";
// import Modal from "../../Modal/Modal";

// const FetchTrains = ({ train, filters }) => {
//   const myContext = useContext(MyContext);
//   const navigate = useNavigate();

//   // const filteredTrains = train.filter(
//   //   (train) =>
//   //     (!filters.source || train.source.toLowerCase() === filters.source.toLowerCase()) &&
//   //     (!filters.destination || train.destination.toLowerCase() === filters.destination.toLowerCase()) &&
//   //     (!filters.trainClass || train.trainClass.toLowerCase() === filters.trainClass.toLowerCase()) &&
//   //     (!filters.departureDate || train.departureDate === filters.departureDate)
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
//   //   navigate("/train/availability");
//   // }

//   const checkAvailabilityClicked = () => {
//     if (!myContext.currUser.email) {
//       myContext.displayPortal(true);
//       return;
//     }

//     navigate(`/available-trains`, { state: { trainId: train.trainId } });
//   };

//   const train_id = train.trainId;
//   const source = train.source;
//   const destination = train.destination;
//   const price = train.price;
//   const trainClass = train.trainClass;

//   const departureTimeRaw = train.departureTime;
//   const arrivalTimeRaw = train.arrivalTime;

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

//     // Handle trains that cross midnight
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
//     <div className="fetch-trains">
//       <nav className="left-section">
//         <div>
//           Train ID: <br />
//           <p className="detail">{train_id}</p>
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
//           Price: <br />
//           <p className="detail">₹ {price}</p>
//         </div>
//         <div>
//           Train Class: <br />
//           <p className="detail">{trainClass}</p>
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
// export default FetchTrains;

import "./FetchTrains.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../Modal/Modal";

const FetchTrains = ({ train }) => {
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

    navigate(`/available-trains`, { state: { trainId: train.trainId } });
  };

  const {
    trainId,
    source,
    destination,
    price,
    trainClass,
    departureTime: departureTimeRaw,
    arrivalTime: arrivalTimeRaw,
  } = train;

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
    
    // Fix: Handle overnight trains (e.g., 23:30 -> 02:15)
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60;
    }
  
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
  };
  

  const duration = calculateDuration(departureTime, arrivalTime);

  return (
    <div className="fetch-trains">
      <nav className="left-section">
        <div>
          Train ID: <br />
          <p className="detail">{trainId}</p>
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
          Price: <br />
          <p className="detail">₹ {price}</p>
        </div>
        <div>
          Train Class: <br />
          <p className="detail">{trainClass}</p>
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

export default FetchTrains;
