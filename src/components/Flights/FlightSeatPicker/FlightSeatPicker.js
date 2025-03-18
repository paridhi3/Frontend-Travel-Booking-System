// import React, { useState } from "react";
// import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
// import "./FlightSeatPicker.css";

// const FlightSeatPicker = ({ rows = 6, cols = 6 }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // Dummy occupied seats
//   const occupiedSeats = ["A2", "B3", "C4", "D5"];

//   // Generate seat IDs (A1, A2... B1, B2...)
//   const seatRows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, rows);
//   const seats = seatRows
//     .split("")
//     .flatMap((row) => Array.from({ length: cols }, (_, i) => `${row}${i + 1}`));

//   // Toggle seat selection
//   const handleSeatClick = (seat) => {
//     if (occupiedSeats.includes(seat)) return; // Prevent selecting occupied seats
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   return (
//     <div className="seat-picker-container">
//       <h2>Select Your Seats</h2>
//       <p className="windows-info">
//         Windows are located on both sides of the plane
//       </p>

//       <div className="airplane-body">
//         {/* Left window strip */}
//         <div className="window-strip"></div>

//         {/* Seats Grid */}
//         <div className="seats-grid">
//           {seats.map((seat) => (
//             <div
//               key={seat}
//               className={`seat 
//                 ${selectedSeats.includes(seat) ? "selected" : ""}
//                 ${occupiedSeats.includes(seat) ? "occupied" : ""}
//               `}
//               onClick={() => handleSeatClick(seat)}
//             >
//               <MdOutlineAirlineSeatReclineExtra />
//               <span>{seat}</span>
//             </div>
//           ))}
//         </div>

//         {/* Right window strip */}
//         <div className="window-strip"></div>
//       </div>

//       {/* Seat Legend */}
//       <div className="seat-legend">
//         <div className="legend-item">
//           <div className="legend-seat available"></div> Available
//         </div>
//         <div className="legend-item">
//           <div className="legend-seat selected"></div> Selected
//         </div>
//         <div className="legend-item">
//           <div className="legend-seat occupied"></div> Occupied
//         </div>
//       </div>

//       {/* Selected Seats Info */}
//       <div className="selected-info">
//         <strong>Selected Seats:</strong>{" "}
//         {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
//       </div>
//     </div>
//   );
// };

// export default FlightSeatPicker;
import React, { useState } from "react";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import "./FlightSeatPicker.css";

const FlightSeatPicker = ({ availability, onBookSeat }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  if (!availability) return <p>Loading seats...</p>;

  const { occupiedSeats } = availability;

  // Generate seat layout (Assuming rows=6, cols=6)
  const seatRows = "ABCDEF"; 
  const seats = seatRows.split("").flatMap((row) => 
    Array.from({ length: 6 }, (_, i) => `${row}${i + 1}`)
  );

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return; // Prevent booking an occupied seat
    setSelectedSeat(seat);
  };

  const handleConfirmBooking = () => {
    if (selectedSeat) {
      onBookSeat(selectedSeat);
      setSelectedSeat(null);
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

      <button 
        onClick={handleConfirmBooking} 
        disabled={!selectedSeat}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default FlightSeatPicker;
