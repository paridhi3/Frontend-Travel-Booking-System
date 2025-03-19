import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import BookingService from "../../../service/BookingService";
import HorizontalDatePicker from "../../HorizontalDatePicker/HorizontalDatePicker";
import FlightSeatPicker from "../FlightSeatPicker/FlightSeatPicker";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const AvailableFlights = () => {
  const { transportType, transportId } = useParams(); // Get values from URL

  const [travelDate, setTravelDate] = useState(getTodayDate);
  const [availability, setAvailability] = useState({ occupiedSeats: [] });
  const [passengerId, setPassengerId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser); // Parse stored JSON
      console.log("Extracted passengerId:", user.passengerId); // Debugging
      setPassengerId(user.passengerId); // ✅ Set passengerId correctly
    } else {
      console.warn("No passenger data found.");
    }
  }, []);

  const handleDateSelection = (date) => {
    console.log("Selected date: ", date);
    setTravelDate(date);
  };

  const handleCheckAvailability = useCallback(async () => {
    if (!travelDate) {
      console.log("No travel date selected");
      return;
    }

    try {
      console.log(
        `Fetching booked seats for ${transportType} ID: ${transportId} on ${travelDate}`
      );

      const response = await BookingService.getBookedSeats(
        transportId,
        transportType,
        travelDate
      );
      console.log("(AvailableFlights.js) API Response:", response.data);

      if (response.data) {
        setAvailability({
          occupiedSeats: Array.isArray(response.data) ? response.data : [],
        });
        setError("");
      } else {
        setError("Invalid response from server.");
        setAvailability({ occupiedSeats: [] });
      }
    } catch (err) {
      console.error("Error fetching booked seats:", err);
      setError("No availability found or an error occurred.");
      setAvailability({ occupiedSeats: [] });
    }
  }, [transportId, transportType, travelDate]);

  useEffect(() => {
    console.log("Fetching availability...");
    handleCheckAvailability();
  }, [handleCheckAvailability]);

  const handleBooking = async (seatNumber) => {
    const bookingDetails = { travelDate, seatNumber, transportType };

    try {
      await BookingService.book(bookingDetails, passengerId, transportId);
      console.log("Booking API call successful!");

      // Update availability after booking
      setAvailability((prev) => ({
        ...prev,
        occupiedSeats: [
          ...new Set([...(prev?.occupiedSeats || []), seatNumber]),
        ], // ✅ Ensure unique values
      }));

      alert(`You have selected Seat ${seatNumber}!`);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="available-flights-container">
      <HorizontalDatePicker onSelectDate={handleDateSelection} />

      {/* <FlightSeatPicker
        availability={availability}
        onBookSeat={handleBooking}
      /> */}
      <FlightSeatPicker
        availability={availability}
        onBookSeat={handleBooking}
        transportDetails={{
          transportId,
          transportType,
          travelDate,
        }}
        passengerDetails={{
          passengerId,
        }}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AvailableFlights;
