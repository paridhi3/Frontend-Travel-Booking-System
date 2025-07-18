import api from './axiosConfig';

const BOOKINGS_URL = '/bookings';

class BookingService {
  async getAllBookings() {
    return await api.get(BOOKINGS_URL);
  }

  async getBookingById(bookingId) {
    return await api.get(`${BOOKINGS_URL}/${bookingId}`);
  }

  async getBookingsByPassengerId(passengerId) {
    return await api.get(`${BOOKINGS_URL}/passenger/${passengerId}`);
  }

  async getBookingsByTransportType(transportType) {
    return await api.get(`${BOOKINGS_URL}/transport/${transportType}`);
  }

  async getBookedSeats(transportId, transportType, travelDate) {
    return await api.get(`${BOOKINGS_URL}/bookedSeats`, {
      params: { transportType, transportId, travelDate },
    });
  }

  async book(booking, passengerId, transportId) {
    try {
      const response = await api.post(
        `${BOOKINGS_URL}/book/${passengerId}/${transportId}`,
        booking
      );

      console.log("Booking API full response:", response);

      if (response?.status === 200 || response?.status === 201) {
        return response.data;
      } else {
        throw new Error(
          response?.data?.message || "Booking failed due to unexpected API response."
        );
      }
    } catch (error) {
      console.error("Booking API error:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateBookingStatus(bookingId, status) {
    return await api.put(`${BOOKINGS_URL}/${bookingId}/status`, null, {
      params: { status },
    });
  }

  async updatePaymentStatus(bookingId, status) {
    return await api.put(`${BOOKINGS_URL}/${bookingId}/payment`, null, {
      params: { status },
    });
  }

  async deleteBooking(bookingId) {
    return await api.delete(`${BOOKINGS_URL}/${bookingId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BookingService();
