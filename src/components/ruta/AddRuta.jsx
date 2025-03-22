import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RutaService from '../../services/RutaService'
import ConductorService from '../../services/ConductorService'

function AddRuta() {
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")
    const [conductor, setConductor] = useState("")
    const navigate = useNavigate()
    const { id_ruta } = useParams()

    const [conductores, setConductores] = useState([]);

    // Obtener la lista de conductores
    useEffect(() => {
        ConductorService.getAllConductores()
        .then(response => {
            setConductores(response.data);
        })
        .catch(error => {
            console.log("Error obteniendo conductores", error)
        })
    })

    // Obtener datos de la ruta si es actualización
    useEffect(() => {
        if(id_ruta) {
            RutaService.getRutaById(id_ruta)
            .then((response) => {
                setOrigen(response.data.origen)
                setDestino(response.data.destino)
                setConductor(response.data.conductor.id_conductor) 
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [id_ruta])

    const saveOrUpdateRuta = (e) => {
        e.preventDefault()
        const ruta = { origen, destino, conductor: { id_conductor: conductor } } // Se envía el ID del conductor correctamente

        if (id_ruta) {
            RutaService.updateRuta(id_ruta, ruta)
            .then(
                (response) => {
                    console.log(response.data)
                    navigate("/rutas")
                }
            )
        } else {
            RutaService.createRuta(ruta)
            .then((response) => {
                console.log(response.data)
                navigate("/rutas")
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }


    const title = id_ruta ? "Actualizar Ruta" : "Agregar Ruta"


  return (
    <div className="min-h-fit w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form>
            {/* Campo Origen */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Origen
            </label>
            <input
              type="text"
              placeholder="Digite el origen de la ruta"
              name="origen"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            />
            </div>

            {/* Campo Destino */}
            <div className='mb-4'>
            <label className="block text-sm font-medium text-gray-700">
              Destino
            </label>
            <input
              type="text"
              placeholder="Digite el destino"
              name="destino"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
            </div>

            {/* Campo Conductor (combobox) */}
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
                          onClick={(e) => saveOrUpdateRuta(e)}
                        >
                          Guardar
                        </button>
                        <Link
                          to="/rutas"
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

export default AddRuta