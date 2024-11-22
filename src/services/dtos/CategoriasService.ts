import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { BackendClient } from "../BackendClient";
import { ICreateCategoria } from "../../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../../types/dtos/categorias/IUpdateCategoria";

export class CategoriasService extends BackendClient<ICategorias> {
    async createCategoria(categoria: ICreateCategoria): Promise<ICategorias> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al crear la categoría:", errorData);
                throw new Error(`Error al crear la categoría: ${response.statusText}`);
            }

            const newCategoria = await response.json();
            return newCategoria as ICategorias;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async updateCategoria(id: number, categoria: IUpdateCategoria): Promise<ICategorias> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoria),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al actualizar la categoría:", errorData);
                throw new Error(`Error al actualizar la categoría: ${response.statusText}`);
            }

            const updatedCategoria = await response.json();
            return updatedCategoria as ICategorias;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async deleteCategoria(id: number): Promise<void> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al eliminar la categoría:", errorData);
                throw new Error(`Error al eliminar la categoría: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async getAllCategoriasPorSucursal(idSucursal: number): Promise<ICategorias[]> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/allCategoriasPorSucursal/${idSucursal}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al obtener las categorías:", errorData);
                throw new Error(`Error al obtener las categorías: ${response.statusText}`);
            }

            const categorias = await response.json();
            return categorias as ICategorias[];
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async getAllCategoriasPorEmpresa(idEmpresa: number): Promise<ICategorias[]> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/allCategoriasPorEmpresa/${idEmpresa}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al obtener las categorías:", errorData);
                throw new Error(`Error al obtener las categorías: ${response.statusText}`);
            }

            const categorias = await response.json();
            return categorias as ICategorias[];
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async getSubCategoriasPorCategoriaPadre(idSucursal: number, idCategoriaPadre: number): Promise<ICategorias[]> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/allSubCategoriasPorCategoriaPadre/${idCategoriaPadre}/${idSucursal}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al obtener las subcategorías:", errorData);
                throw new Error(`Error al obtener las subcategorías: ${response.statusText}`);
            }

            const subcategorias = await response.json();
            return subcategorias as ICategorias[];
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async getCategoriaById(idCategoria: number): Promise<ICategorias> {
        try {
            const response = await fetch(`http://190.221.207.224:8090/categorias/${idCategoria}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al obtener la categoría:", errorData);
                throw new Error(`Error al obtener la categoría: ${response.statusText}`);
            }

            const categoria = await response.json();
            return categoria as ICategorias;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }
} 