import { IDomicilio } from "../../IDomicilio";
import { ICategorias } from "../categorias/ICategorias";
import { IEmpresa } from "../empresa/IEmpresa";


export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;
  calle: string;
  latitud: number;
  longitud: number;
  categorias: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  eliminado: boolean;
  horarioCierre: string;
  logo?: string;
  paisId: string;
  provincia: string;
  localidad: string;
  numero: string;
  cp: string;
  piso: string;
  nroDpto: string;
}

export interface ICreateSucursal {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: {
    calle: string;
    numero: number;
    cp: number;
    piso?: number;
    nroDpto?: number;
    idLocalidad: number;
  };
  idEmpresa: number;
  logo: string | null;
}
