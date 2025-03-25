import axios from "axios";

const PORT = 9090;
const API_URL = `http://localhost:${PORT}/api/bookings`;

class BookingService {
  async getAllBookings() {
    return await axios.get(API_URL);
  }

  async getBookingById(bookingId) {
    return await axios.get(`${API_URL}/${bookingId}`);
  }

  async getBookingsByPassengerId(passengerId) {
    return await axios.get(`${API_URL}/passenger/${passengerId}`);
  }

  async getBookingsByTransportType(transportType) {
    return await axios.get(`${API_URL}/transport/${transportType}`);
  }

  async getBookedSeats(transportId, transportType, travelDate) {
    return await axios.get(`${API_URL}/bookedSeats`, {
        params: { transportType, transportId, travelDate }
    });
  }

  // async book(booking, passengerId, transportId) {
  //   return await axios.post(
  //     `${API_URL}/book/${passengerId}/${transportId}`,
  //     booking
  //   );
  // }

  async book(booking, passengerId, transportId) {
    try {
      const response = await axios.post(
        `${API_URL}/book/${passengerId}/${transportId}`,
        booking
      );
  
      console.log("Booking API full response:", response);
  
      // Accept 201 (Created) as a successful booking
      if (response?.status === 200 || response?.status === 201) {
        return response.data; // Return the actual API response
      } else {
        throw new Error(response?.data?.message || "Booking failed due to unexpected API response.");
      }
    } catch (error) {
      console.error("Booking API error:", error.response?.data || error.message);
      throw error; // Ensure error is propagated properly
    }
  }
  
  
  

  async updateBookingStatus(bookingId, status) {
    return await axios.put(`${API_URL}/${bookingId}/status`, null, {
      params: { status },
    });
  }

  async updatePaymentStatus(bookingId, status) {
    return await axios.put(`${API_URL}/${bookingId}/payment`, null, {
      params: { status },
    });
  }

  async deleteBooking(bookingId) {
    return await axios.delete(`${API_URL}/${bookingId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BookingService();
