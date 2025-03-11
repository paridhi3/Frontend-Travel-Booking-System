import axios from "axios";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/passengers`;

class PassengerService {
  async getAllPassengers() {
    return await axios.get(API_URL);
  }

  async getPassengerById(id) {
    return await axios.get(`${API_URL}/${id}`);
  }

  async registerPassenger(passenger) {
    return await axios.post(`${API_URL}/register`, passenger);
  }

  async loginPassenger(email, password) {
    return await axios.post(`${API_URL}/req/login`, { email, password });
  }

  async deletePassenger(id) {
    return await axios.delete(`${API_URL}/${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PassengerService();
