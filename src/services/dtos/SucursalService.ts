import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

const API_URL = import.meta.env.VITE_API_URL;

export class SucursalService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/sucursales`;
  }

  async getSucursalesByEmpresaId(empresaId: number): Promise<ISucursal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/porEmpresa/${empresaId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las sucursales');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
      return [];
    }
  }

  async createSucursal(sucursal: Partial<ISucursal>): Promise<ISucursal> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sucursal),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Error al crear la sucursal');
    }

    return response.json();
  }
} 

 
