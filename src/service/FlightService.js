import axios from "axios";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/flights`;

class FlightService {
  async getAllFlights() {
    return await axios.get(API_URL);
  }

  async getFlightsByRoute(source, destination) {
    return await axios.get(`${API_URL}/route`, { params: { source, destination } });
  }

  async addFlight(flight) {
    return await axios.post(API_URL, flight);
  }

  async updateAvailableSeats(flightId, newSeats) {
    return await axios.put(`${API_URL}/${flightId}/seats`, null, { params: { newSeats } });
  }

  async deleteFlight(flightId) {
    return await axios.delete(`${API_URL}/${flightId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FlightService();
