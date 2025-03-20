import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BookingService from "../../../service/BookingService";
import AvailabilityService from "../../../service/AvailabilityService";
import HorizontalDatePicker from "../../HorizontalDatePicker/HorizontalDatePicker";
import FlightSeatPicker from "../FlightSeatPicker/FlightSeatPicker";

const today = () => new Date().toISOString().split("T")[0];

const AvailableFlights = () => {
  const location = useLocation();
  const flightDetails = location.state?.flightDetails; // Get flight details from navigation state
  console.log("flightDetails: ", flightDetails);

  const navigate = useNavigate();
  const { transportType, transportId } = useParams(); // Get values from URL
  const [passenger, setPassenger] = useState([]);

  const [travelDate, setTravelDate] = useState(today);
  const [availability, setAvailability] = useState({ occupiedSeats: [] });
  const [availabilityToday, setAvailabilityToday] = useState([]);
  // const [passengerId, setPassengerId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedPassenger = localStorage.getItem("loggedInUser");
    if (storedPassenger) {
      const passenger = JSON.parse(storedPassenger); // Parse stored JSON
      setPassenger(passenger);
      console.log("Extracted passenger:", passenger); // Debugging
      // setPassengerId(passenger.passengerId); // ✅ Set passengerId correctly
    } else {
      console.warn("No passenger data found.");
    }
  }, []);

  const handleDateSelection = (date) => {
    console.log("Selected date: ", date);
    setTravelDate(date);
  };

  const fetchAvailabilityToday = async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        "FLIGHT"
      );
      const flightsAvailableToday = response.data.filter( // flights that have not departed yet
        (item) => item.travelDate === today()
      );
      setAvailabilityToday(flightsAvailableToday);
    } catch (error) {
      console.error("Error fetching availability today:", error);
    }
  };

  useEffect(() => {
    fetchAvailabilityToday();
  }, []);

  const handleCheckAvailability = useCallback(async () => {
    try {
      console.log(
        `Fetching booked seats for ${transportType} ID: ${transportId} on ${travelDate}`
      );

      const isDepartedToday =
        travelDate === today() &&
        !availabilityToday.some(
          (flight) => flight.transportId === Number(transportId)
        );

      if (isDepartedToday) {
        console.warn("This flight has already departed today.");
        setAvailability({
          occupiedSeats: "ALL",
          message:
            "This flight has departed today. Please choose another date.",
        });
        return;
      }

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
  }, [transportId, transportType, travelDate, availabilityToday]);

  useEffect(() => {
    handleCheckAvailability();
  }, [handleCheckAvailability]);

  const handleBooking = async (seatNumber) => {
    // const bookingDetails = { travelDate, seatNumber, transportType, transportId, passengerId };
    // const bookingDetails = { travelDate, seatNumber, transportType };

    try {
      // const response = await BookingService.book(
      //   bookingDetails,
      //   passenger.passengerId,
      //   transportId
      // );
      // console.log("Booking API call successful!", response);

      // Update availability after booking
      setAvailability((prev) => ({
        ...prev,
        occupiedSeats: [
          ...new Set([...(prev?.occupiedSeats || []), seatNumber]),
        ],
      }));

      alert(`You have selected Seat ${seatNumber}!`);
      // return response; // ✅ Return API response

    } catch (err) {

      console.error("Booking API error:", err);
      alert("Booking failed. Redirecting to home.");
      navigate("/", { replace: true });
      return null; // ✅ Return null on failure

    }
  };

  return (
    <div className="available-flights-container">
      <HorizontalDatePicker onSelectDate={handleDateSelection} />

      {availability.occupiedSeats === "ALL" ? (
        <p className="departed-message">{availability.message}</p>
      ) : (
        <FlightSeatPicker
          availability={availability}
          onBookSeat={handleBooking}
          flightDetails={{ flightDetails }}
          passengerDetails={passenger}
          travelDate={travelDate}
        />
      )}

      {error && <p className="departed-message">{error}</p>}
    </div>
  );
};

export default AvailableFlights;
