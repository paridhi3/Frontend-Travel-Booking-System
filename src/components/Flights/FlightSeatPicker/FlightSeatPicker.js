import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context/Context";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import "./FlightSeatPicker.css";

const FlightSeatPicker = ({ availability, onBookSeat, transportDetails, passengerDetails }) => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();

  const [selectedSeat, setSelectedSeat] = useState(null);

  if (!availability) return <p>Loading seats...</p>;

  const occupiedSeats = availability?.occupiedSeats ?? []; // Ensure it's always an array

  console.log("Availability Object:", availability);
  console.log("Rendering FlightSeatPicker - Occupied Seats:", occupiedSeats);

  // Generate seat layout (Assuming rows=6, cols=6)
  const seatRows = "ABCDEF";
  const seats = seatRows.split("").flatMap((row) =>
    Array.from({ length: 6 }, (_, i) => `${row}${i + 1}`)
  );

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return; // Prevent booking an occupied seat
    setSelectedSeat(seat);
  };

  const handleBookClicked = async () => {
    console.log("Confirm booking clicked");
  
    if (!myContext.currUser.email) {
      console.log("User not logged in, showing login portal.");
      myContext.displayPortal(true); // Open login modal if user is not logged in
      return;
    }
  
    if (!selectedSeat) {
      console.log("No seat selected, button should be disabled.");
      return;
    }
  
    console.log("Attempting to book seat:", selectedSeat);
  
    try {
      const response = await onBookSeat(selectedSeat); // ✅ Capture API response
      console.log("Booking API response:", response);
  
      if (!response) { // ✅ Check for success flag
        throw new Error("Booking failed due to API response.");
      }
  
      console.log("Seat booked successfully! Navigating to checkout...");
      
      navigate("/checkout", {
        state: {
          seatNumber: selectedSeat,
          transportType: transportDetails.transportType,
          transportDetails,
          passengerDetails,
        },
      });
    } catch (error) {
      console.error("Booking failed with error:", error);
      alert("Booking failed! Redirecting to home...");
      navigate("/"); // ✅ Redirect to home on failure
    }
  };  
  
  

  return (
    <div className="seat-picker-container">
      <h2>Select Your Seats</h2>

      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat}
            className={`seat ${selectedSeat === seat ? "selected" : ""} 
                        ${occupiedSeats.includes(seat) ? "occupied" : ""}`}
            onClick={() => handleSeatClick(seat)}
          >
            <MdOutlineAirlineSeatReclineExtra />
            <span>{seat}</span>
          </div>
        ))}
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

export default FlightSeatPicker;
