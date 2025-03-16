import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AvailabilityService from "../../../service/AvailabilityService";

const AvailableFlights = () => {
  const location = useLocation();
  const flightId = location.state?.flightId || ""; // Get flight ID from navigation state

  const [transportId, setTransportId] = useState(flightId);
  const [travelDate, setTravelDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  const handleCheckAvailability = async () => {
    if (!transportId || !travelDate) {
      setError("Please enter both Flight ID and Travel Date.");
      return;
    }
    setError("");

    try {
      const response = await AvailabilityService.checkAvailability(
        transportId,
        "FLIGHT",
        travelDate
      );
      setAvailability(response.data);
    } catch (err) {
      setError("No availability found or an error occurred.");
      setAvailability(null);
    }
  };

  useEffect(() => {
    if (transportId) {
      setError("");
    }
  }, [transportId]);

  return (
    <div className="available-flights-container">
      <h2>Check Available Flights</h2>
      <div className="input-group">
        <label>Flight ID:</label>
        <input
          type="number"
          value={transportId}
          onChange={(e) => setTransportId(e.target.value)}
          placeholder="Enter Flight ID"
        />
      </div>
      <div className="input-group">
        <label>Travel Date:</label>
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </div>
      <button onClick={handleCheckAvailability}>Check Availability</button>

      {error && <p className="error">{error}</p>}

      {availability && (
        <div className="availability-info">
          <h3>Flight Availability</h3>
          <p><strong>Flight ID:</strong> {availability.transportId}</p>
          <p><strong>Available Seats:</strong> {availability.available_seats}</p>
          <p><strong>Travel Date:</strong> {availability.travel_date}</p>
        </div>
      )}
    </div>
  );
};

export default AvailableFlights;
