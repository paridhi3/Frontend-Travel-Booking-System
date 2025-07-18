import api from './axiosConfig';

const FLIGHTS_URL = '/flights'; // relative to baseURL set in api instance

class FlightService {
  async getAllFlights() {
    return await api.get(FLIGHTS_URL);
  }

  async getFlightsByRoute(source, destination) {
    return await api.get(`${FLIGHTS_URL}/route`, { params: { source, destination } });
  }

  async addFlight(flight) {
    return await api.post(FLIGHTS_URL, flight);
  }

  async updateFlight(flightId, flight) {
    return await api.put(`${FLIGHTS_URL}/${flightId}`, flight);
  }

  async deleteFlight(flightId) {
    return await api.delete(`${FLIGHTS_URL}/${flightId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FlightService();