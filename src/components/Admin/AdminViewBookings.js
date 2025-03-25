import "./AdminViewBookings.css";
import { useLocation } from "react-router-dom";
import { capitalizeFullName, formatDateTime } from "../../Utils";

const AdminViewBookings = () => {
  const location = useLocation();
  const bookings = location.state?.bookings || [];
  console.log("(AdminViewBookings) bookings: ", bookings);

  return (
    <div>
      <h2 className="admin-view-bookings-heading">All Bookings</h2>
      {bookings.length > 0 ? (
        <table className="admin-view-bookings-table">
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
            {bookings.map((booking, index) => (
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
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default AdminViewBookings;
