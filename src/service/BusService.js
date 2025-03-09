import axios from "axios";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/buses`;

class BusService {
  async getAllBuses() {
    return await axios.get(API_URL);
  }

  async getBusById(busId) {
    return await axios.get(`${API_URL}/${busId}`);
  }

  async getBusesByRoute(source, destination) {
    return await axios.get(`${API_URL}/route`, { params: { source, destination } });
  }

  async getBusesByPriceRange(minPrice, maxPrice) {
    return await axios.get(`${API_URL}/price-range`, { params: { minPrice, maxPrice } });
  }

  async addBus(bus) {
    return await axios.post(API_URL, bus);
  }

  async updateBus(bus) {
    return await axios.put(API_URL, bus);
  }

  async deleteBus(busId) {
    return await axios.delete(`${API_URL}/${busId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BusService();
