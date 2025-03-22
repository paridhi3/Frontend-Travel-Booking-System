import "../../styles/transport/FetchTransport.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../Context/Context";
import { createPortal } from "react-dom";
import Modal from "../../components/Modal/Modal";
import { formatTime,calculateDuration } from "../../Utils";

const FetchTransport = ({ transport, transportType }) => {
  console.log(
    "(FetchTransport.js) Transport Type Before Navigation:",
    transportType
  );
  console.log("(FetchTransport.js) Received in FetchTransport:", transport);

  const myContext = useContext(MyContext);
  const navigate = useNavigate();

  const nameLabel =
    transportType.toLowerCase() === "flight"
      ? "airlineName"
      : transportType.toLowerCase() === "train"
      ? "trainName"
      : "busName";

  const idLabel =
    transportType.toLowerCase() === "flight"
      ? "flightId"
      : transportType.toLowerCase() === "train"
      ? "trainId"
      : "busId";

  const classLabel =
    transportType.toLowerCase() === "flight"
      ? "flightClass"
      : transportType.toLowerCase() === "train"
      ? "trainClass"
      : "busClass";

  const { source, destination, price, departureTime, arrivalTime } = transport;
  const id = transport[idLabel];
  const name = transport[nameLabel];
  const transportClass = transport[classLabel];

  const checkAvailabilityClicked = () => {
    if (!myContext.currUser.email) {
      myContext.displayPortal(true);
      return;
    }

    console.log("🚀 Navigating to:", `/${transportType}/${id}`);
    console.log("🔍 transportType:", transportType);
    console.log("🔍 transport.id:", id);

    navigate(`/${transportType.toLowerCase()}/${id}`, {
      state: { transportDetails: transport },
    });
  };

  const frontendNameLabel =
    transportType.toLowerCase() === "flight"
      ? "Airline"
      : transportType.toLowerCase() === "train"
      ? "Train"
      : "Bus";

  return (
    <div className="fetch-transport">
      <nav className="left-section">
        <div>
          {frontendNameLabel} ID: <br />
          <p className="detail">{id}</p>
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
          <p className="detail">{formatTime(departureTime)}</p>
        </div>
        <div>
          Arrival Time: <br />
          <p className="detail">{formatTime(arrivalTime)}</p>
        </div>
        <div>
          Duration: <br />
          <p className="detail">
            {calculateDuration(
              formatTime(departureTime),
              formatTime(arrivalTime)
            )}
          </p>
        </div>
      </nav>

      <nav className="right-section">
        <div>
          {frontendNameLabel} Name: <br />
          <p className="detail">{name}</p>
        </div>
        <div>
          Price: <br />
          <p className="detail">₹ {price}</p>
        </div>
        <div>
          {frontendNameLabel} Class: <br />
          <p className="detail">{transportClass}</p>
        </div>
      </nav>

      <button onClick={checkAvailabilityClicked} id="book-btn">
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

export default FetchTransport;
