import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConductorService from "../../services/ConductorService";

function AddConductor() {
  const [nombre, setNombre] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id_conductor } = useParams();

  const saveOrUpdateConductor = (e) => {
    e.preventDefault();
    const conductor = { nombre, licencia, telefono, email };

    if (id_conductor) {
      ConductorService.updateConductor(id_conductor, conductor).then(
        (response) => {
          console.log(response.data);
          navigate("/conductores");
        }
      );
    } else {
      ConductorService.createConductor(conductor)
        .then((response) => {
          console.log(response.data);
          navigate("/conductores");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    ConductorService.getConductorById(id_conductor)
      .then((response) => {
        setNombre(response.data.nombre);
        setLicencia(response.data.licencia);
        setTelefono(response.data.telefono);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id_conductor) {
      return <h2 className="text-center">Actualizar Conductor</h2>;
    } else {
      return <h2 className="text-center">Agregar Conductor</h2>;
    }
  };

  return (
    <div className="min-h-fit w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title()}</h2>
        <form>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Digite su nombre"
              name="nombre"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* Campo Licencia */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Licencia
            </label>
            <input
              type="text"
              placeholder="Digite su licencia"
              name="licencia"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
            />
          </div>

          {/* Campo Teléfono */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              placeholder="Digite su teléfono"
              name="telefono"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* Campo Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="Digite su email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={(e) => saveOrUpdateConductor(e)}
            >
              Guardar
            </button>
            <Link
              to="/conductores"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddConductor;
