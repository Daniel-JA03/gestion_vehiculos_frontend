import axios from "axios";

const VEHICULO_BASE_REST_API_URL = "http://localhost:8080/api/v1/vehiculos"

class VehiculoService {
    getAllVehiculos() {
        return axios.get(VEHICULO_BASE_REST_API_URL)
    }

    createVehiculo(vehiculo) {
        return axios.post(VEHICULO_BASE_REST_API_URL, vehiculo)
    }

    getVehiculoById(vehiculoId) {
        return axios.get(VEHICULO_BASE_REST_API_URL + "/" + vehiculoId)
    }

    updateVehiculo(vehiculoId, vehiculo) {
        return axios.put(VEHICULO_BASE_REST_API_URL + "/" + vehiculoId, vehiculo)
    }

    deleteVehiculo(vehiculoId) {
        return axios.delete(VEHICULO_BASE_REST_API_URL + "/" + vehiculoId)
    }
}

export default new VehiculoService()