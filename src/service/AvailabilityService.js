import api from './axiosConfig';

const AVAILABILITY_URL = '/availability'; // relative path to baseURL

class AvailabilityService {
  async getAllAvailability() {
    return await api.get(AVAILABILITY_URL);
  }

  async getAvailabilityByTransportType(transportType) {
    return await api.get(`${AVAILABILITY_URL}/by-type`, {
      params: { transportType },
    });
  }

  async getAvailabilityByTransportId(transportId) {
    return await api.get(`${AVAILABILITY_URL}/by-id`, {
      params: { transportId },
    });
  }

  async getAvailabilityByTravelDate(travelDate) {
    return await api.get(`${AVAILABILITY_URL}/by-date`, {
      params: { travelDate },
    });
  }

  async checkAvailability(transportId, transportType, travelDate) {
    return await api.get(`${AVAILABILITY_URL}/check`, {
      params: { transportId, transportType, travelDate },
    });
  }

  async addTransportAvailability(availability) {
    return await api.post(AVAILABILITY_URL, availability);
  }

  async reduceAvailableSeats(transportId, transportType, travelDate) {
    return await api.post(`${AVAILABILITY_URL}/reduce-seats`, null, {
      params: { transportId, transportType, travelDate },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AvailabilityService();
