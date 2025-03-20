import "./Checkout.css";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/Context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import BookingService from "../../service/BookingService";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Checkout = () => {
  const myContext = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const transportDetails = state?.transportDetails;
  const passengerDetails = state?.passengerDetails;
  const seatNumber = state?.seatNumber;
  const travelDate = state?.travelDate;

  console.log("Checkout.js - travelDate:", travelDate);

  // Extract transport type and details dynamically
  const transportKey = transportDetails
    ? Object.keys(transportDetails)[0]
    : null;
  const extractedDetails = transportKey ? transportDetails[transportKey] : {};

  const transportType =
    transportKey?.replace("Details", "").toUpperCase() || "UNKNOWN";
  const transportId =
    extractedDetails?.flightId ||
    extractedDetails?.trainId ||
    extractedDetails?.busId ||
    "N/A";

  console.log("(Checkout.js) passengerDetails: ", passengerDetails);
  console.log("(Checkout.js) transportDetails: ", transportDetails);

  const [formState, setFormState] = useState({
    cardNumber: "",
    cvv: "",
  });

  useEffect(() => {
    myContext.onHomePage(false);
  }, [myContext]);

  const numInputHandler = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    if (value === "") {
      setFormState({
        ...formState,
        [key]: value,
      });
      return;
    }
    const lastValue = value.charAt(value.length - 1);
    if (!numbers.includes(parseInt(lastValue))) return;
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const capitalizeFullName = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  //   const formSubmit = (e) => {
  //     e.preventDefault();
  //     myContext.displayPortal(true);
  //   };
  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare booking details
      const bookingData = {
        transportType,
        transportId,
        travelDate,
        seatNumber,
        bookingStatus: "CONFIRMED", // Default status
        paymentStatus: "PAID",
      };

      // Call BookingService to create a booking
      const bookingResponse = await BookingService.book(
        bookingData,
        passengerDetails?.passengerId,
        transportId
      );

      console.log("Booking response:", bookingResponse);

      // Extract bookingId from response
      const bookingId = bookingResponse?.bookingId;
      if (!bookingId) {
        console.error("Error: Booking ID not found in response.");
        return;
      }

      alert(`Your ${transportType} has been booked successfully!`);


      // Show confirmation modal
      myContext.displayPortal(true);
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Error during booking/payment:", error);
    }
  };

  // **Convert travelDate to readable format**
  const formatDate = (dateString) => {
    if (!dateString) return "Not Provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Convert timestamps to HH:mm format
  const formatTime = (timeRaw) => {
    return timeRaw.includes("T")
      ? new Date(timeRaw).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : timeRaw.slice(0, 5);
  };

  return (
    <div className="checkout-containers">
      <div className="checkout">
        {/* Journey Details Section */}
        <section className="section journey">
          <h1>Journey Details</h1>
          <div>
            <span className="journey-label">Passenger Name</span>
            <span>{capitalizeFullName(passengerDetails?.fullName)}</span>
          </div>
          <div>
            <span className="journey-label">Email</span>
            <span>{passengerDetails?.email}</span>
          </div>
          <div>
            <span className="journey-label">Source</span>
            <span>{extractedDetails?.source}</span>
          </div>
          <div>
            <span className="journey-label">Destination</span>
            <span>{extractedDetails?.destination}</span>
          </div>
          <div>
            <span className="journey-label">Departure Time</span>
            <span>{formatTime(extractedDetails?.departureTime)}</span>
          </div>
          <div>
            <span className="journey-label">Arrival Time</span>
            <span>{formatTime(extractedDetails?.arrivalTime)}</span>
          </div>
          <div>
            <span className="journey-label">Travel Date</span>
            <span>{formatDate(travelDate)}</span>
          </div>
          <div>
            <span className="journey-label">Transport Type</span>
            <span>{transportType}</span>
          </div>
          <div>
            <span className="journey-label">Transport ID</span>
            <span>{transportId}</span>
          </div>
          <div>
            <span className="journey-label">Seat Number</span>
            <span>{seatNumber}</span>
          </div>
          <div className="total-amount">
            <span>Total Amount</span>
            <span>₹ {extractedDetails.price.toLocaleString("en-IN")}</span>
          </div>
        </section>

        {/* Payment Section */}
        <section className="section payment">
          <h1>Payment Method</h1>
          <form onSubmit={formSubmit}>
            <label htmlFor="name">Name on Card</label>
            <input
              id="name"
              type="text"
              required
              value={capitalizeFullName(passengerDetails?.fullName) || ""}
              readOnly
            />

            <label htmlFor="card-number">Card Number</label>
            <input
              id="card-number"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9101 1121"
              maxLength="16"
              required
              onChange={numInputHandler}
              value={formState.cardNumber}
            />

            <label htmlFor="expiry-date">Expiry Date</label>
            <input id="expiry-date" type="month" required />

            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              placeholder="123"
              maxLength="3"
              required
              onChange={numInputHandler}
              value={formState.cvv}
            />

            <button id="pay" type="submit">
              Pay
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
