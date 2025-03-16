import axios from "axios";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/availability`;

class AvailabilityService {
  async getAllAvailability() {
    return await axios.get(API_URL);
  }

  async getAvailabilityByTransportType(transportType) {
    return await axios.get(`${API_URL}/by-type`, {
      params: { transportType },
    });
  }

  async getAvailabilityByTransportId(transportId) {
    return await axios.get(`${API_URL}/by-id`, {
      params: { transportId },
    });
  }

  async getAvailabilityByTravelDate(travelDate) {
    return await axios.get(`${API_URL}/by-date`, {
      params: { travelDate },
    });
  }

  async checkAvailability(transportId, transportType, travelDate) {
    return await axios.get(`${API_URL}/check`, {
      params: { transportId, transportType, travelDate },
    });
  }

  async addTransportAvailability(availability) {
    return await axios.post(API_URL, availability);
  }

  async reduceAvailableSeats(transportId, transportType, travelDate) {
    return await axios.post(`${API_URL}/reduce-seats`, null, {
      params: { transportId, transportType, travelDate },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AvailabilityService();
