import axios from "axios"

const MANTENIMIENTO_BASE_REST_API_URL = "http://localhost:8080/api/v1/mantenimientos"


class MantenimientoService {
  getAllMantenimientos() {
    return axios.get(MANTENIMIENTO_BASE_REST_API_URL)
  }

  createMantenimiento(mantenimiento) {
    return axios.post(MANTENIMIENTO_BASE_REST_API_URL, mantenimiento)
  }

  updateMantenimiento(mantenimientoId, mantenimiento) {
    return axios.put(MANTENIMIENTO_BASE_REST_API_URL + "/" + mantenimientoId, mantenimiento)
  }

  getAllMantenimientoById(mantenimientoId) {
    return axios.get(MANTENIMIENTO_BASE_REST_API_URL + "/" + mantenimientoId)
  }

  deleteMantenimiento(mantenimientoId, mantenimiento) {
    return axios.delete(MANTENIMIENTO_BASE_REST_API_URL + "/" + mantenimientoId, mantenimiento)
  }

  getAllTipo() {
    return axios.get(MANTENIMIENTO_BASE_REST_API_URL + "/tipos")
  }

  getAllEstado() {
    return axios.get(MANTENIMIENTO_BASE_REST_API_URL + "/estados")
}

}

export default new MantenimientoService()