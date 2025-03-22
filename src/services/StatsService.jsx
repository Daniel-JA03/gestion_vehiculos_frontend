import axios from "axios";

const STATS_BASE_REST_API_URL = "http://localhost:8080/api/v1/stats";

class StatsService {
    getStats() {
        return axios.get(STATS_BASE_REST_API_URL)
    }
}

export default new StatsService();