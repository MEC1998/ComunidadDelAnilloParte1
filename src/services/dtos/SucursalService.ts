import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ISucursal> {
  async getSucursalesByEmpresaId(empresaId: number): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}/porEmpresa/${empresaId}`);
    if (!response.ok) {
      throw new Error('Error al obtener las sucursales');
    }
    return await response.json();
  }
} 

 
