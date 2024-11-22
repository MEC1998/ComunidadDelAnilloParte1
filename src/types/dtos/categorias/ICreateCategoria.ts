export interface ICreateCategoria {
  denominacion: string;
  idEmpresa: number;
  categoriaPadre?: {
    id: number;
    eliminado: boolean;
  } | null;
  idSucursales: number[];
}
