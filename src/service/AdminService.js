import axios from "axios";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/api/admin`;

class AdminService {
  async loginAdmin(email, password) {
    return await axios.post(`${API_URL}/login`, {email, password });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminService();
