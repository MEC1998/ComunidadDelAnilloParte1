import { AbstractBackendClient } from "./AbstractBackendClient";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`Error al obtener todos los elementos: ${response.statusText}`);
    }
    const data = await response.json();
    return data as T[];
  }

  async getById(id: number): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data as T;
  }

  async post(data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`Error al crear el elemento: ${response.statusText}`);
    }
    const newData = await response.json();
    return newData as T;
  }

  async put(id: number, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar el elemento con ID ${id}: ${response.statusText}`);
    }
    const newData = await response.json();
    return newData as T;
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el elemento con ID ${id}: ${response.statusText}`);
    }
  }

  protected async apiGet(endpoint: string): Promise<T[]> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`Error al realizar la solicitud GET a ${endpoint}: ${response.statusText}`);
      }
      const data = await response.json();
      return data as T[];
    } catch (error) {
      console.error("Error en apiGet:", error);
      throw error; // Vuelve a lanzar el error para que pueda ser manejado en otro lugar
    }
  }
}
