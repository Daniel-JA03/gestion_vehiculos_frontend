import React, { useEffect, useState } from "react";
import VehiculoService from "../../services/VehiculoService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    ListarVehiculos()
  }, []);

  const ListarVehiculos = () => {
    VehiculoService.getAllVehiculos()
      .then((response) => {
        setVehiculos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteVehiculo = (vehiculoId) => {
    VehiculoService.deleteVehiculo(vehiculoId)
      .then((response) => {
        console.log("Respuesta del servidor:" + response);
        ListarVehiculos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl mx-auto mt-6 space-y-4">
        {/* Botón Agregar vehiculo */}
        <div className="flex justify-start">
          <Link
            className="bg-[#28a745] text-white font-bold text-sm px-6 py-2 rounded-md shadow-lg hover:bg-[#218838] transition"
            to={"/add-vehiculo"}
          >
            Agregar Vehículo
          </Link>
        </div>
        {/* Tabla de Vehículos */}
        <div className="w-full h-fit rounded-lg border border-gray-300 bg-white shadow-md">
          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-center py-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
            Lista de Vehículos
          </h2>
          {/* Contenedor de la tabla */}
          <div className="overflow-x-auto rounded-b-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    ID
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Placa</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Marca</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Modelo</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Año</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Conductor</th>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                    {vehiculos.length > 0 ? (
                        vehiculos.map((vehiculo) => (
                            <tr 
                                key={vehiculo.id_vehiculo}
                                className="odd:bg-white even:bg-gray-100 transition"
                            >
                                <td className="px-8 py-5 font-bold text-gray-900 text-center">
                                    {vehiculo.id_vehiculo}
                                </td>
                                <td className="px-8 py-5 text-gray-700">{vehiculo.placa}</td>
                                <td className="px-8 py-5 text-gray-700">{vehiculo.marca}</td>
                                <td className="px-8 py-5 text-gray-700">{vehiculo.modelo}</td>
                                <td className="px-8 py-5 text-gray-700">{vehiculo.anio}</td>
                                <td className="px-8 py-5 text-gray-700">{vehiculo.conductor
                                    ? vehiculo.conductor.nombre
                                    : "Sin conductor"}
                                </td>
                                <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition"
                            to={`/edit-vehiculo/${vehiculo.id_vehiculo}`}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                            onClick={() => deleteVehiculo(vehiculo.id_vehiculo)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-center py-8 text-gray-500 font-medium"
                          >
                            No hay vehículos registrados.
                          </td>
                        </tr>
                      )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListVehiculos;
