import React from "react";
import {
  BiHome,
  BiBookAlt,
  BiCar,
  BiMap
} from "react-icons/bi";
import "../styles/sidebar.css"
import { FaTools, FaUserTie } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="menu">
        <div className="logo">
          <BiBookAlt className="logo-icon" />
           <a href="/" className="text-2xl font-bold">VehTrack</a> 
        </div>

        <div className="menu--list">
        <a href="/" className="item">
            <BiHome className="icon" />
            Gestión de Vehículos 
          </a>
          <a href="/conductores" className="item">
            <FaUserTie className="icon" />
            Conductores
          </a>
          <a href="/vehiculos" className="item">
            <BiCar className="icon" />
            Vehículos
          </a>
          <a href="/rutas" className="item">
            <BiMap className="icon" />
            Rutas
          </a>
          <a href="/mantenimientos" className="item">
            <FaTools  className="icon" />
            Mantenimientos
          </a>
        </div>
      </div>
  )
}

export default Sidebar