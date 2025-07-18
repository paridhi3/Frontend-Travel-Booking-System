import api from './axiosConfig';

const BUSES_URL = '/buses';

class BusService {
  async getAllBuses() {
    return await api.get(BUSES_URL);
  }

  async getBusById(busId) {
    return await api.get(`${BUSES_URL}/${busId}`);
  }

  async getBusesByRoute(source, destination) {
    return await api.get(`${BUSES_URL}/route`, { params: { source, destination } });
  }

  async getBusesByPriceRange(minPrice, maxPrice) {
    return await api.get(`${BUSES_URL}/price-range`, { params: { minPrice, maxPrice } });
  }

  async addBus(bus) {
    return await api.post(BUSES_URL, bus);
  }

  async updateBus(busId, bus) {
    return await api.put(`${BUSES_URL}/${busId}`, bus);
  }

  async deleteBus(busId) {
    return await api.delete(`${BUSES_URL}/${busId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BusService();