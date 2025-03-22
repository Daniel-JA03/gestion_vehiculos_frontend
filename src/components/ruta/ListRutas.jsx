import React, { useEffect, useState } from "react";
import RutaService from "../../services/RutaService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListRutas() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    ListarRutas();
  }, []);

  const ListarRutas = () => {
    RutaService.getAllRutas()
      .then((response) => {
        setRutas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRuta = (rutaId) => {
    RutaService.deleteRuta(rutaId)
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        ListarRutas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl mx-auto mt-6 space-y-4">
        {/* Botón Agregar ruta */}
        <div className="flex justify-start">
          <Link
            className="bg-[#28a745] text-white font-bold text-sm px-6 py-2 rounded-md shadow-lg hover:bg-[#218838] transition"
            to={"/add-ruta"}
          >
            Agregar Ruta
          </Link>
        </div>

        {/* Tabla de Rutas */}
        <div className="w-full h-fit rounded-lg border border-gray-300 bg-white shadow-md">
          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-center py-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
            Lista de Rutas
          </h2>

          {/* Contenedor de la tabla */}
          <div className="overflow-x-auto rounded-b-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    ID
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Origen</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Destino</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Conductor</th>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {rutas.length > 0 ? (
                  rutas.map((ruta) => (
                    <tr
                      key={ruta.id_ruta}
                      className="odd:bg-white even:bg-gray-100 transition"
                    >
                      <td className="px-8 py-5 font-bold text-gray-900 text-center">
                        {ruta.id_ruta}
                      </td>
                      <td className="px-8 py-5 text-gray-700">{ruta.origen}</td>
                      <td className="px-8 py-5 text-gray-700">
                        {ruta.destino}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {ruta.conductor
                          ? ruta.conductor.nombre
                          : "Sin conductor"}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition"
                            to={`/edit-ruta/${ruta.id_ruta}`}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                            onClick={() => deleteRuta(ruta.id_ruta)}
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
                      No hay rutas registradas.
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

export default ListRutas;
