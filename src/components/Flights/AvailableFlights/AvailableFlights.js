import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import AvailabilityService from "../../../service/AvailabilityService";
import BookingService from "../../../service/BookingService";
import HorizontalDatePicker from "../../HorizontalDatePicker/HorizontalDatePicker";
import FlightSeatPicker from "../FlightSeatPicker/FlightSeatPicker";

const AvailableFlights = () => {
  const { transportType, transportId } = useParams(); // Get values from URL

  const [travelDate, setTravelDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  const handleDateSelection = (date) => {
    setTravelDate(date);
  };

  const handleCheckAvailability = useCallback(async () => {
    if (!travelDate) return;

    try {
      const response = await AvailabilityService.getAvailability(transportId, transportType, travelDate);
      setAvailability(response.data);  // Expecting { availableSeats: number, occupiedSeats: [] }
      setError("");
    } catch (err) {
      setError("No availability found or an error occurred.");
      setAvailability(null);
    }
  }, [transportId, transportType, travelDate]);

  useEffect(() => {
    handleCheckAvailability();
  }, [handleCheckAvailability]);

  const handleBooking = async (seatNumber) => {
    const bookingDetails = {
      travelDate,
      seatNumber,
      transportType,
    };

    try {
      await BookingService.book(bookingDetails, 1, transportId); // Assuming passengerId = 1 (Replace with actual)
      
      // Update availability after booking
      setAvailability((prev) => ({
        ...prev,
        occupiedSeats: [...prev.occupiedSeats, seatNumber],
      }));
      
      alert(`Seat ${seatNumber} booked successfully!`);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="available-flights-container">
      <h2>Check Available Flights</h2>

      <HorizontalDatePicker onSelectDate={handleDateSelection} />

      <FlightSeatPicker 
        availability={availability} 
        onBookSeat={handleBooking}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AvailableFlights;
