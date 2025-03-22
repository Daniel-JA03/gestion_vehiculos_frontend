import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MantenimientoService from "../../services/MantenimientoService";
import VehiculoService from "../../services/VehiculoService";

function AddMantenimiento() {
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");
  const [costo, setCosto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const navigate = useNavigate();
  const { id_mantenimiento } = useParams();

  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  // Obtener la lista de los tipos
  useEffect(() => {
    MantenimientoService.getAllTipo()
      .then((response) => {
        setTipos(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo tipos", error);
      });
  });

  useEffect(() => {
    MantenimientoService.getAllEstado()
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo estados", error);
      });
  });

  // Obtener la lista de vehiculos
  useEffect(() => {
    VehiculoService.getAllVehiculos()
      .then((response) => {
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo vehiculos", error);
      });
  });

  // Obtener datos del mantenimiento si es actualizado
  useEffect(() => {
    if (id_mantenimiento) {
      MantenimientoService.getAllMantenimientoById(id_mantenimiento)
        .then((response) => {
          setTipo(response.data.tipo);
          setFecha(response.data.fecha);
          setCosto(response.data.costo);
          setDescripcion(response.data.descripcion);
          setEstado(response.data.estado);
          setVehiculo(response.data.vehiculo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_mantenimiento]);

  const saveOrUpdaMantenimiento = (e) => {
    e.preventDefault();

    
    const mantenimiento = {
      tipo,
      fecha,
      costo,
      descripcion,
      estado,
      vehiculo, // Envía el objeto Vehiculo completo
    };

    console.log("Datos a enviar:", mantenimiento);

    if (id_mantenimiento) {
      MantenimientoService.updateMantenimiento(id_mantenimiento, mantenimiento)
        .then((response) => {
          console.log(response.data);
          navigate("/mantenimientos");
        })
        .catch((error) => {
          console.error(
            "Error al actualizar mantenimiento:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      MantenimientoService.createMantenimiento(mantenimiento)
        .then((response) => {
          console.log(response.data);
          navigate("/mantenimientos");
        })
        .catch((error) => {
          console.error(
            "Error al crear un nuevo mantenimiento:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const title = id_mantenimiento ? "Actualizar Mantenimiento" : "Agregar Mantenimiento";

  return (
    <div className="min-h-fit w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form>
          {/* Campo Tipo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              name="tipo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Seleccione el tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Fecha */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              placeholder="Digite la fecha del mantenimiento"
              name="fecha"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          {/* Campo Costo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Costo
            </label>
            <input
              type="text"
              placeholder="Digite el modelo del vehiculo"
              name="costo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
            />
          </div>

          {/* Campo Descripcion */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descripcion
            </label>
            <input
              type="text"
              placeholder="Digite la descripcion del mantenimiento"
              name="descripcion"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="estado"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Seleccione un estado</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          {/* Campo vehiculos (combobox) */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Vehículo
            </label>
            <select
              name="vehiculo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={vehiculo ? vehiculo.id_vehiculo : ""}
              onChange={(e) => {
                const selectedVehiculo = vehiculos.find(
                  (v) => v.id_vehiculo === parseInt(e.target.value)
                );
                setVehiculo(selectedVehiculo); // Almacena el objeto Vehículo completo
              }}
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                  {`${vehiculo.placa} ${vehiculo.marca}`}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={(e) => saveOrUpdaMantenimiento(e)}
            >
              Guardar
            </button>
            <Link
              to="/mantenimientos"
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

export default AddMantenimiento;
