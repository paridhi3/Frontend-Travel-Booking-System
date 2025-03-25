import "./BookingHistory.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { capitalizeFullName, formatDateTime } from "../../Utils";
import BookingService from "../../service/BookingService";

const BookingHistory = () => {
  const location = useLocation();
  const passengerId = location.state?.passengerId;
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await BookingService.getBookingsByPassengerId(
          passengerId
        );
        setBookingHistory(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (passengerId) {
      fetchBookingHistory();
    } else {
      setLoading(false); // If no passengerId, stop loading
    }
  }, [passengerId]);

  return (
    <div>
      <h2 className="booking-history-heading">Your Bookings</h2>

      {loading ? (
        <p style={{ color: "gray", fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>Loading bookings...</p> // Show loading message while fetching
      ) : bookingHistory.length > 0 ? (
        <table className="booking-history-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Passenger Name</th>
              <th>Passenger ID</th>
              <th>Transport Type</th>
              <th>Transport ID</th>
              <th>Seat Number</th>
              <th>Travel Date</th>
              <th>Booking Status</th>
              <th>Payment Status</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingId}</td>
                <td>{capitalizeFullName(booking.passenger.fullName)}</td>
                <td>{booking.passenger.passengerId}</td>
                <td>{booking.transportType}</td>
                <td>{booking.transportId}</td>
                <td>{booking.seatNumber}</td>
                <td>{booking.travelDate}</td>
                <td>{booking.bookingStatus}</td>
                <td>{booking.paymentStatus}</td>
                <td>{formatDateTime(booking.bookingDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "gray", fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingHistory;
