import { IProductos } from "../../types/dtos/productos/IProductos";
import { BackendClient } from "../BackendClient";
import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";

export class ProductosService extends BackendClient<IProductos> {
  // Nuevo método para obtener productos por sucursal
  getBySucursal(idSucursal: number) {
    console.log("Llamando a la API con ID de sucursal:", idSucursal);
    return fetch(`http://190.221.207.224:8090/articulos/porSucursal/${idSucursal}`)
      .then(response => response.json());
  }

  // Método para crear un nuevo producto
  async createProducto(producto: ICreateProducto): Promise<IProductos> {
    try {
      const response = await fetch(`http://190.221.207.224:8090/articulos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear el producto:", errorData);
        throw new Error(`Error al crear el producto: ${response.statusText}`);
      }

      const newProducto = await response.json();
      return newProducto as IProductos;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  // Método para actualizar un producto existente
  async updateProducto(id: number, producto: IUpdateProducto) {
    try {
      const response = await fetch(`http://190.221.207.224:8090/articulos/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al actualizar el producto:", errorData);
        throw new Error(`Error al actualizar el producto: ${response.statusText}`);
      }

      const updatedProducto = await response.json();
      return updatedProducto as IProductos;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  // Método para eliminar un producto
  async deleteProducto(id: number): Promise<void> {
    try {
      const response = await fetch(`http://190.221.207.224:8090/articulos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al eliminar el producto:", errorData);
        throw new Error(`Error al eliminar el producto: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }
}
