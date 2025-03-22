import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import ListConductores from "./components/conductor/ListConductores";
import AddConductor from "./components/conductor/AddConductor";
import ListRutas from "./components/ruta/ListRutas";
import AddRuta from "./components/ruta/AddRuta";
import ListVehiculos from "./components/vehiculos/ListVehiculos";
import AddVehiculo from "./components/vehiculos/AddVehiculo";
import ListMantenimiento from "./components/mantenimiento/ListMantenimiento";
import AddMantenimiento from "./components/mantenimiento/AddMantenimiento";

function App() {
  return (
    <div className="dashboard">
      <BrowserRouter>
        <Sidebar />
        <div className="dashboard--content">
          <Routes>
            <Route exact path="/" element={<Content />}></Route>
            {/* Conductores */}
            <Route path="/conductores" element={<ListConductores />}></Route>
            <Route path="/add-conductor" element={<AddConductor />}></Route>
            <Route
              path="/edit-conductor/:id_conductor"
              element={<AddConductor />}
            ></Route>
            {/* Rutas */}
            <Route path="/rutas" element={<ListRutas />}></Route>
            <Route path="/add-ruta" element={<AddRuta />}></Route>
            <Route path="/edit-ruta/:id_ruta" element={<AddRuta />}></Route>
            {/* Vehiculos */}
            <Route path="/vehiculos" element={<ListVehiculos />}></Route>
            <Route path="/add-vehiculo" element={<AddVehiculo />}></Route>
            <Route path="/edit-vehiculo/:id_vehiculo" element={<AddVehiculo />}></Route>
            {/* Mantenimientos */}
            <Route path="/mantenimientos" element={<ListMantenimiento />}></Route>
            <Route path="/add-mantenimiento" element={<AddMantenimiento />}></Route>
            <Route path="/edit-mantenimiento/:id_mantenimiento" element={<AddMantenimiento />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
