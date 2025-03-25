import axios from "axios";

const PORT = 9090;
const API_URL = `http://localhost:${PORT}/api/trains`;

class TrainService {
  async getAllTrains() {
    return await axios.get(API_URL);
  }

  async getTrainById(trainId) {
    return await axios.get(`${API_URL}/${trainId}`);
  }

  async addTrain(train) {
    return await axios.post(API_URL, train);
  }

  async updateTrain(trainId, train) {
    return await axios.put(`${API_URL}/${trainId}`, train);
  }

  async deleteTrain(trainId) {
    return await axios.delete(`${API_URL}/${trainId}`);
  }

  async getTrainsByRoute(source, destination) {
    return await axios.get(`${API_URL}/route`, { params: { source, destination } });
  }

  async getTrainsByPriceRange(minPrice, maxPrice) {
    return await axios.get(`${API_URL}/price-range`, {
      params: { minPrice, maxPrice },
    });
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TrainService();
