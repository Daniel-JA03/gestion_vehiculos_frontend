import React, { useEffect, useState } from "react";
import ConductorService from "../../services/ConductorService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListConductores() {
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    ListarConductores();
  }, []);

  // const ListarConductores = () => {
  //   ConductorService.getAllConductores()
  //     .then((response) => {
  //       setConductores(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const ListarConductores = () => {
    ConductorService.getAllConductores()
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        
        // Verifica si response.data es un array
        if (Array.isArray(response.data)) {
          setConductores(response.data);
        } else if (typeof response.data === "object" && response.data !== null) {
          // Si la API devuelve un objeto con una clave 'conductores', intenta acceder a ella
          setConductores(response.data.conductores || []);
        } else {
          setConductores([]); // En caso de datos inesperados, evitar errores
        }
      })
      .catch((error) => {
        console.log("Error al obtener conductores:", error);
        setConductores([]); // Evita que el estado tenga valores incorrectos
      });
  };

  const deleteConductor = (conductorId) => {
    ConductorService.deleteConductor(conductorId)
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        ListarConductores();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl mx-auto mt-6 space-y-4">
        {/* Botón Agregar Conductor */}
        <div className="flex justify-start">
          <Link
            className="bg-[#28a745] text-white font-bold text-sm px-6 py-2 rounded-md shadow-lg hover:bg-[#218838] transition"
            to={"/add-conductor"}
          >
            Agregar Conductor
          </Link>
        </div>

        {/* Tabla de Conductores */}
        <div className="w-full h-fit rounded-lg border border-gray-300 bg-white shadow-md">
          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-center py-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
            Lista de Conductores
          </h2>

          {/* Contenedor de la tabla */}
          <div className="overflow-x-auto rounded-b-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    ID
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Nombre</th>
                  <th className="px-8 py-5 font-bold text-gray-900">
                    Licencia
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">
                    Teléfono
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Email</th>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {conductores.length > 0 ? (
                  conductores.map((conductor) => (
                    <tr
                      key={conductor.id_conductor}
                      className="odd:bg-white even:bg-gray-100 transition"
                    >
                      <td className="px-8 py-5 font-bold text-gray-900 text-center">
                        {conductor.id_conductor}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {conductor.nombre}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {conductor.licencia}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {conductor.telefono}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {conductor.email}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition"
                            to={`/edit-conductor/${conductor.id_conductor}`}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                            onClick={() =>
                              deleteConductor(conductor.id_conductor)
                            }
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
                      colSpan="6"
                      className="text-center py-8 text-gray-500 font-medium"
                    >
                      No hay conductores registrados.
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

export default ListConductores;
