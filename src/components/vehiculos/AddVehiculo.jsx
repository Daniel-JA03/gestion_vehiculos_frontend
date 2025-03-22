import React, {useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VehiculoService from '../../services/VehiculoService'
import ConductorService from '../../services/ConductorService'

function AddVehiculo() {
    const [placa, setPlaca] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [anio, setAnio] = useState("")
    const [conductor, setConductor] = useState("")
    const navigate = useNavigate()
    const { id_vehiculo } = useParams()

    const [conductores, setConductores] = useState([])

    // Obtener la lista de conductores
    useEffect(() => {
        ConductorService.getAllConductores()
        .then(response => {
            setConductores(response.data)
        })
        .catch(error => {
            console.log("Error obteniendo conductores", error)
        })
    })


    // Obtener datos del vehiculo si es actualización
    useEffect(() => {
        if(id_vehiculo) {
            VehiculoService.getVehiculoById(id_vehiculo)
            .then((response) => {
                setPlaca(response.data.placa)
                setMarca(response.data.marca)
                setModelo(response.data.modelo)
                setAnio(response.data.anio)
                setConductor(response.data.conductor.id_conductor)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [id_vehiculo])

    const saveOrUpdateVehiculo = (e) => {
        e.preventDefault()
        const vehiculo = { placa, marca, modelo, anio, conductor: { id_conductor: conductor } }

        if(id_vehiculo) {
            VehiculoService.updateVehiculo(id_vehiculo, vehiculo)
            .then((response) => {
                console.log(response.data)
                navigate("/vehiculos")
            })
        } else {
            VehiculoService.createVehiculo(vehiculo)
            .then((response) => {
                console.log(response.data)
                navigate("/vehiculos")
            })
            .catch((error) => {
                console.log(error)
            })
        }
    } 

    const title = id_vehiculo ? "Actualizar Vehiculo" : "Agregar Vehiculo"

  return (
    <div className="min-h-fit w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form>
            {/* Campo Placa */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Placa
            </label>
            <input
              type="text"
              placeholder="Digite la placa del vehiculo"
              name="placa"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            </div>

            {/* Campo Marca */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input
              type="text"
              placeholder="Digite la marca del vehiculo"
              name="marca"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
            </div>

            {/* Campo Modelo */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Modelo
            </label>
            <input
              type="text"
              placeholder="Digite el modelo del vehiculo"
              name="marca"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
            </div>

            {/* Campo Año del vehiculo */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Año
            </label>
            <input
              type="text"
              placeholder="Digite el año del vehiculo"
              name="anio"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
            />
            </div>


            {/* Campo conductor (combobox) */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
                            Conductor
                        </label>
            <select 
            name="conductor"  
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            value={conductor}
            onChange={(e) => setConductor(e.target.value)}
            >
                <option value="">Seleccione un conductor</option>
                {conductores.map((c) => (
                                <option key={c.id_conductor} value={c.id_conductor}>
                                    {c.nombre}
                                </option>
                            ))}
            </select>
            </div>
            
            {/* Botones */}
            <div className="flex justify-between">
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          onClick={(e) => saveOrUpdateVehiculo(e)}
                        >
                          Guardar
                        </button>
                        <Link
                          to="/vehiculos"
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Cancelar
                        </Link>
                      </div>
        </form>
        </div>
    </div>
  )
}

export default AddVehiculo