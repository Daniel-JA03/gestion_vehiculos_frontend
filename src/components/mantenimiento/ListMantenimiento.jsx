import React, { useEffect, useState } from "react";
import MantenimientoService from "../../services/MantenimientoService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListMantenimiento() {
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    ListarMantenimientos();
  }, []);

  const ListarMantenimientos = () => {
    MantenimientoService.getAllMantenimientos()
      .then((response) => {
        setMantenimientos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo mantenimientos:", error);
      });
  };

  const deleteMantenimiento = (mantenimientoId) => {
    MantenimientoService.deleteMantenimiento(mantenimientoId)
      .then((response) => {
        console.log("Respuesta del servidor:" + response);
        ListarMantenimientos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl mx-auto mt-6 space-y-4">
        {/* Botón Agregar Mantenimiento */}
        <div className="flex justify-start">
          <Link
            className="bg-[#28a745] text-white font-bold text-sm px-6 py-2 rounded-md shadow-lg hover:bg-[#218838] transition"
            to={"/add-mantenimiento"}
          >
            Agregar Mantenimiento
          </Link>
        </div>
        {/* Tabla de mantenimientos */}
        <div className="w-full h-fit rounded-lg border border-gray-300 bg-white shadow-md">
          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-center py-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
            Listado de Mantenimientos
          </h2>
          {/* Contenedor de la tabla */}
          <div className="overflow-x-auto rounded-b-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-8 py-5 font-bold text-gray-900 text-center">
                    ID
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Tipo</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Fecha</th>
                  <th className="px-8 py-5 font-bold text-gray-900">Costo</th>
                  <th className="px-8 py-5 font-bold text-gray-900">
                    Descripción
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">Estado</th>
                  <th className="px-8 py-5 font-bold text-gray-900">
                    Vehiculo
                  </th>
                  <th className="px-8 py-5 font-bold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {mantenimientos.length > 0 ? (
                  mantenimientos.map((mantenimiento) => (
                    <tr
                      key={mantenimiento.id_mantenimiento}
                      className="odd:bg-white even:bg-gray-100 transition"
                    >
                      <td className="px-8 py-5 font-bold text-gray-900 text-center">
                        {mantenimiento.id_mantenimiento}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.tipo}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.fecha}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.costo}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.descripcion}
                      </td>
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.estado}
                      </td>
                      {/* ✅ Modificación aquí */}
                      <td className="px-8 py-5 text-gray-700">
                        {mantenimiento.vehiculo?.placa || "Sin placa"} -{" "}
                        {mantenimiento.vehiculo?.marca || "Marca desconocida"}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition"
                            to={`/edit-mantenimiento/${mantenimiento.id_mantenimiento}`}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                            onClick={() =>
                              deleteMantenimiento(
                                mantenimiento.id_mantenimiento
                              )
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
                      colSpan="8"
                      className="text-center py-8 text-gray-500 font-medium"
                    >
                      No hay mantenimientos registrados.
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

export default ListMantenimiento;
