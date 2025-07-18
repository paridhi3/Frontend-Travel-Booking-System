import api from './axiosConfig';

const TRAINS_URL = '/trains';

class TrainService {
  async getAllTrains() {
    return await api.get(TRAINS_URL);
  }

  async getTrainById(trainId) {
    return await api.get(`${TRAINS_URL}/${trainId}`);
  }

  async addTrain(train) {
    return await api.post(TRAINS_URL, train);
  }

  async updateTrain(trainId, train) {
    return await api.put(`${TRAINS_URL}/${trainId}`, train);
  }

  async deleteTrain(trainId) {
    return await api.delete(`${TRAINS_URL}/${trainId}`);
  }

  async getTrainsByRoute(source, destination) {
    return await api.get(`${TRAINS_URL}/route`, { params: { source, destination } });
  }

  async getTrainsByPriceRange(minPrice, maxPrice) {
    return await api.get(`${TRAINS_URL}/price-range`, {
      params: { minPrice, maxPrice },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TrainService();