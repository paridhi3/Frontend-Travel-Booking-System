import "../../styles/transport/AvailableTransport.css";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BookingService from "../../service/BookingService";
import AvailabilityService from "../../service/AvailabilityService";
import HorizontalDatePicker from "../HorizontalDatePicker/HorizontalDatePicker";
import FlightSeatPicker from "../FlightSeatPicker/FlightSeatPicker";
import BusSeatPicker from "../BusSeatPicker/BusSeatPicker";
import TrainSeatPicker from "../TrainSeatPicker/TrainSeatPicker";

const today = () => new Date().toISOString().split("T")[0];

const seatPickers = {
  flight: FlightSeatPicker,
  bus: BusSeatPicker,
  train: TrainSeatPicker,
};

const AvailableTransport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transportType, transportId } = useParams();

  const [passenger, setPassenger] = useState([]);
  const [travelDate, setTravelDate] = useState(today);
  const [availability, setAvailability] = useState({ occupiedSeats: [] });
  const [availabilityToday, setAvailabilityToday] = useState([]);
  const [error, setError] = useState("");

  // Get transport details dynamically
  const transportDetails = location.state?.transportDetails;
  console.log("(AvailableTransport.js) transportDetails: ", transportDetails);

  useEffect(() => {
    const storedPassenger = localStorage.getItem("loggedInUser");
    if (storedPassenger) {
      setPassenger(JSON.parse(storedPassenger));
    }
  }, []);

  const handleDateSelection = (date) => {
    setTravelDate(date);
  };

  const fetchAvailabilityToday = useCallback(async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(transportType);
      const availableToday = response.data.filter(
        (item) => item.travelDate === today()
      );
      setAvailabilityToday(availableToday);
    } catch (error) {
      console.error("Error fetching availability today:", error);
    }
  }, [transportType]); // ✅ Now it's stable across renders
  
  useEffect(() => {
    fetchAvailabilityToday();
  }, [fetchAvailabilityToday]); // ✅ No more warning  

  const handleCheckAvailability = useCallback(async () => {
    try {
      console.log(
        `Fetching booked seats for ${transportType} ID: ${transportId} on ${travelDate}`
      );

      const isDepartedToday =
        travelDate === today() &&
        !availabilityToday.some((item) => item.transportId === Number(transportId));

      if (isDepartedToday) {
        setAvailability({
          occupiedSeats: "ALL",
          // message: `This ${transportType} has departed today. Please choose another date.`,
        });
        return;
      }

      console.log("(AvailableTransport.js) params for BookingService: ", transportId, transportType,
        travelDate);

      const response = await BookingService.getBookedSeats(
        transportId,
        transportType,
        travelDate
      );
      setAvailability({
        occupiedSeats: Array.isArray(response.data) ? response.data : [],
      });
      setError("");
    } catch (err) {
      console.error("Error fetching booked seats:", err);
      setError("No availability found or an error occurred.");
      setAvailability({ occupiedSeats: [] });
    }
  }, [transportId, transportType, travelDate, availabilityToday]);

  useEffect(() => {
    handleCheckAvailability();
  }, [handleCheckAvailability]);

  const handleBooking = async (seatNumber) => { // selects a seat (does not book)
    try {
      setAvailability((prev) => ({
        ...prev,
        occupiedSeats: [...new Set([...(prev?.occupiedSeats || []), seatNumber])],
      }));
      alert(`You have selected Seat ${seatNumber}!`);
    } catch (err) {
      navigate("/", { replace: true });
    }
  };

  const SeatPickerComponent = seatPickers[transportType] || null;

  return (
    <div className="available-transport-container">
      <HorizontalDatePicker onSelectDate={handleDateSelection} />

      {availability.occupiedSeats === "ALL" ? (
        // <p className="departed-message">{availability.message}</p>
        <p style={{ color: "gray", fontWeight: "bold", textAlign: "center" }}>This {transportType} has departed today. Please choose another date.</p>
      ) : (
        SeatPickerComponent && (
          <SeatPickerComponent
            availability={availability}
            onSelectSeat={handleBooking}
            transportDetails={transportDetails} // Dynamically pass details
            passengerDetails={passenger}
            travelDate={travelDate}
          />
        )
      )}

      {error && <p style={{ color: "gray", fontWeight: "bold", textAlign: "center" }}>{error}</p>}
    </div>
  );
};

export default AvailableTransport;
