import { IImagen } from "../../IImagen";
import { baseDto } from "../baseDto/baseDto";

export interface IUpdateProducto extends baseDto {
  id: number;
  eliminado: boolean;
  denominacion: string;
  precioVenta: number;
  descripcion: string | null;
  habilitado: boolean;
  codigo: string;
  imagenes: IImagen[];
  idCategoria: number;
  idAlergenos: number[];
}
