import axios from "axios";

const RUTA_BASES_REST_API_URL = "http://localhost:8080/api/v1/rutas"

class RutaService {
    getAllRutas() {
        return axios.get(RUTA_BASES_REST_API_URL)
    }

    createRuta(ruta) {
        return axios.post(RUTA_BASES_REST_API_URL, ruta)
    }

    getRutaById(rutaId) {
        return axios.get(RUTA_BASES_REST_API_URL + "/" + rutaId)
    }

    updateRuta(rutaId, ruta) {
        return axios.put(RUTA_BASES_REST_API_URL + "/" + rutaId, ruta)
    }

    deleteRuta(rutaId) {
        return axios.delete(RUTA_BASES_REST_API_URL + "/" + rutaId)
    }
}

export default new RutaService();