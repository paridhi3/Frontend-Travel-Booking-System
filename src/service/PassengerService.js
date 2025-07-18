import api from './axiosConfig';

const PASSENGERS_URL = '/passengers';

class PassengerService {
  async getAllPassengers() {
    return await api.get(PASSENGERS_URL);
  }

  async getPassengerById(id) {
    return await api.get(`${PASSENGERS_URL}/${id}`);
  }

  async getPassengerByEmail(email) {
    return await api.get(`${PASSENGERS_URL}/email/${encodeURIComponent(email)}`);
  }

  async registerPassenger(passenger) {
    return await api.post(`${PASSENGERS_URL}/register`, passenger);
  }

  async loginPassenger(email, password) {
    return await api.post(`${PASSENGERS_URL}/req/login`, { email, password });
  }

  async logoutPassenger() {
    return await api.post(`${PASSENGERS_URL}/logout`);
  }

  async deletePassenger(id) {
    return await api.delete(`${PASSENGERS_URL}/${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PassengerService();