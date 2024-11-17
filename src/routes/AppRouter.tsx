import { Route, Routes } from "react-router-dom";

import { DashboardHome } from "../components/pages/DashboardHome";
import { DashboardProductos } from "../components/pages/DashboardProductos";

// Componente AppRouter que define las rutas de la aplicación
export const AppRouter = () => {
  return (
    <>
     
      <Routes>
        {/* Ruta para la pantalla de personas */}
        <Route path="/" element={<DashboardHome />} />
        {/* Ruta para la pantalla de productos */}
        <Route path="/productos" element={<DashboardProductos />} />
      </Routes>
    </>
  );
};
