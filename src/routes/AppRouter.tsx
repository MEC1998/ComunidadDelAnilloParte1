import { Route, Routes } from "react-router-dom";

import { DashboardHome } from "../components/pages/DashboardHome";
import { DashboardProductos } from "../components/pages/DashboardProductos";
import { DashboardCategorias } from "../components/pages/DashboardCategorias";
import { DashboardAlergenos } from "../components/pages/DashboardAlergenos";

// Componente AppRouter que define las rutas de la aplicación
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/dashboard/:idempresa/:idsucursal/productos" element={<DashboardProductos />} />
      <Route path="/dashboard/:idempresa/:idsucursal/categorias" element={<DashboardCategorias />} />
      <Route path="/dashboard/:idempresa/:idsucursal/alergenos" element={<DashboardAlergenos />} />
      </Routes>
  );
};
