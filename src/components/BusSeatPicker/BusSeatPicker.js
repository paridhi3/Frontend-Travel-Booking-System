import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../Context/Context";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import "../../styles/transport/SeatPicker.css";

const BusSeatPicker = ({
  availability,
  onSelectSeat,
  transportDetails,
  passengerDetails,
  travelDate,
}) => {
  const myContext = useContext(MyContext);

  console.log("(BusSeatPicker.js) passengerDetails: ", passengerDetails);
  console.log("(BusSeatPicker.js) transportDetails: ", transportDetails);
  console.log("travelDate: ", travelDate);
  const navigate = useNavigate();

  const [selectedSeat, setSelectedSeat] = useState(null);

  if (!availability) return <p>Loading seats...</p>;

  const occupiedSeats = availability?.occupiedSeats ?? []; // Ensure it's always an array

  console.log("Availability Object:", availability);
  console.log("Rendering BusSeatPicker - Occupied Seats:", occupiedSeats);

  const generateSeatLayout = (totalSeats) => {
    const maxCols = 5; // Maximum number of seats per row
    const numRows = Math.ceil(totalSeats / maxCols); // Calculate the number of rows needed
    const seatRows = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].slice(0, numRows); // Generate row labels (A, B, C, etc.) in array format

    return seatRows.flatMap((row, rowIndex) =>
      // Generate seat numbers for each row
      Array.from(
        { length: Math.min(maxCols, totalSeats - rowIndex * maxCols) }, // Ensure last row has remaining seats
        (_, i) => `${row}${i + 1}` // Format seat label (e.g., A1, A2, ..., B1, B2, etc.)
      )
    );
  };

  const seats = generateSeatLayout(transportDetails.totalSeats);

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return; // Prevent booking an occupied seat
    setSelectedSeat(seat);
  };

  const handleBookClicked = async () => {
    if (!myContext.currUser.email) {
      console.log("User not logged in, showing login portal.");
      myContext.displayPortal(true); // Open login modal if user is not logged in
      return;
    }

    if (!selectedSeat) {
      console.log("No seat selected, button should be disabled.");
      return;
    }

    try {
      onSelectSeat(selectedSeat);

      console.log("Seat selected successfully! Navigating to checkout...");

      navigate("/checkout", {
        state: {
          seatNumber: selectedSeat,
          transportDetails: transportDetails,
          passengerDetails,
          travelDate,
        },
      });
    } catch (error) {
      console.error("Seat selection failed with error:", error);
      navigate("/"); // ✅ Redirect to home on failure
    }
  };

  return (
    <div className="seat-picker-container">
      <h2>Select Your Seats</h2>

      <div className="transport-body">
        {/* Left window strip */}
        <div className="window-strip"></div>

        <div className="bus-seats-grid">
          {seats.map((seat) => (
            <div
              key={seat}
              className={`seat ${selectedSeat === seat ? "selected" : ""} 
                              ${
                                occupiedSeats.includes(seat) ? "occupied" : ""
                              }`}
              onClick={() => handleSeatClick(seat)}
            >
              <MdOutlineAirlineSeatReclineExtra />
              <span>{seat}</span>
            </div>
          ))}
        </div>

        {/* Right window strip */}
        <div className="window-strip"></div>
      </div>

      {/* Seat Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-seat available"></div> Available
        </div>
        <div className="legend-item">
          <div className="legend-seat selected"></div> Selected
        </div>
        <div className="legend-item">
          <div className="legend-seat occupied"></div> Occupied
        </div>
      </div>

      {/* Selected Seat Info */}
      <div className="selected-info">
        <strong>Selected Seat:</strong> {selectedSeat ? selectedSeat : "None"}
      </div>

      <button
        className="confirmBooking"
        onClick={handleBookClicked}
        disabled={!selectedSeat}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BusSeatPicker;
