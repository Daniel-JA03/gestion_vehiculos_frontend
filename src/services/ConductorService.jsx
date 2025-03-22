import axios from "axios";

const CONDUCTOR_BASE_REST_API_URL = "http://localhost:8080/api/v1/conductores";

class ConductorService {
  getAllConductores() {
    return axios.get(CONDUCTOR_BASE_REST_API_URL);
  }

  createConductor(conductor) {
    return axios.post(CONDUCTOR_BASE_REST_API_URL, conductor);
  }

  getConductorById(conductorId) {
    return axios.get(CONDUCTOR_BASE_REST_API_URL + "/" + conductorId)
  }

  updateConductor(conductorId, conductor) {
    return axios.put(CONDUCTOR_BASE_REST_API_URL + "/" + conductorId, conductor)
  }

  deleteConductor(conductorId) {
    return axios.delete(CONDUCTOR_BASE_REST_API_URL + "/" + conductorId)
  }
}

export default new ConductorService();
