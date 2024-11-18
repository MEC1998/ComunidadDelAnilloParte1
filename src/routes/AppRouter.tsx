import { Route, Routes } from "react-router-dom";

import { DashboardHome } from "../components/pages/DashboardHome";
import { DashboardProductos } from "../components/pages/DashboardProductos";

// Componente AppRouter que define las rutas de la aplicación
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/:idempresa/:idsucursal/productos" element={<DashboardProductos />} />
    </Routes>
  );
};
