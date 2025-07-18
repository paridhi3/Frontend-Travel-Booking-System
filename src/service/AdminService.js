import api from './axiosConfig';

const ADMIN_URL = '/admin';

class AdminService {

  async getAdminByEmail(email) {
    return await api.get(`${ADMIN_URL}/email/${encodeURIComponent(email)}`);
  }

  async loginAdmin(email, password) {
    return await api.post(`${ADMIN_URL}/login`, { email, password });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminService();
