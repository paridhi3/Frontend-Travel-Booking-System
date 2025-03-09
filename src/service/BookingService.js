import axios from "axios";

const PORT = 8080;
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

  async bookTrain(booking) {
    return await axios.post(`${API_URL}/train`, booking);
  }

  async bookFlight(booking) {
    return await axios.post(`${API_URL}/flight`, booking);
  }

  async bookBus(booking) {
    return await axios.post(`${API_URL}/bus`, booking);
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
