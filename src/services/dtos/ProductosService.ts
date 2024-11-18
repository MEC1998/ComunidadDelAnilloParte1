import { IProductos } from "../../types/dtos/productos/IProductos";
import { BackendClient } from "../BackendClient";

export class ProductosService extends BackendClient<IProductos> {
  // Nuevo método para obtener productos por sucursal
  
  getBySucursal(idSucursal: number) {
    console.log("Llamando a la API con ID de sucursal:", idSucursal);
    return this.apiGet(`/articulos/porSucursal/${idSucursal}`);
  }
} 