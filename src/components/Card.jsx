import React, { useEffect, useState } from "react";
import { BiCar, BiMap } from "react-icons/bi";
import { FaTools, FaUserTie } from "react-icons/fa";
import StatsService from "../../src/services/StatsService";


function Card() {

    const [stats, setStats] = useState({
        totalVehiculos: 0,
        totalMantenimientos: 0,
        totalConductores: 0,
        totalRutas: 0,
    })

    useEffect(() => {
        StatsService.getStats()
        .then((response) => {
            setStats(response.data)
        })
        .catch((error) => {
            console.log("Error obteniendo estadísticas:", error)
        })
    }, [])

    const statsData = [
        {
          title: "Total de Vehículos",
          value: stats.totalVehiculos,
          icon: <BiCar />,
        },
        {
          title: "En Mantenimiento",
          value: stats.totalMantenimientos,
          icon: <FaTools />,
        },
        {
          title: "Conductores Activos",
          value: stats.totalConductores,
          icon: <FaUserTie />,
        },
        {
          title: "Rutas en Operación",
          value: stats.totalRutas,
          icon: <BiMap />,
        },
      ];

  return (
    <div className="card--container">
      {statsData.map((item, index) => (
        <div key={index} className="card">
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
            <p className="card--value">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
