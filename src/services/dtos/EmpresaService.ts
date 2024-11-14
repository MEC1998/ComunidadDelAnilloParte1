import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

const API_URL = import.meta.env.VITE_API_URL;

export class EmpresaService {
  async getEmpresaById(id: number): Promise<IEmpresa | null> {
    try {
      const response = await fetch(`${API_URL}/empresas/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener la empresa');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener la empresa:', error);
      return null;
    }
  }

  async getAllEmpresas(): Promise<IEmpresa[]> {
    try {
      const response = await fetch(`${API_URL}/empresas`);
      if (!response.ok) {
        throw new Error('Error al obtener las empresas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
      return [];
    }
  }
} 