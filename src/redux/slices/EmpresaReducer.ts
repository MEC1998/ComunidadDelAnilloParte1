import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

// Definimos la interfaz para el estado inicial del slice
interface IEmpresaState {
  empresas: IEmpresa[]; // Lista de empresas
  empresaActiva: null | IEmpresa; // Empresa activa seleccionada
}

// Estado inicial del slice
const initialState: IEmpresaState = {
  empresas: [], // Inicialmente la lista de empresas está vacía
  empresaActiva: null, // No hay ninguna empresa activa seleccionada inicialmente
};

// Creamos un slice con Redux Toolkit para manejar las empresas
const EmpresaReducer = createSlice({
  name: "EmpresaReducer", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer la lista de empresas
    setEmpresas(state, action: PayloadAction<IEmpresa[]>) {
      state.empresas = action.payload; // Actualizamos la lista de empresas con los datos proporcionados
    },
    // Reducer para establecer la empresa activa
    setEmpresaActiva(state, action: PayloadAction<IEmpresa>) {
      state.empresaActiva = action.payload; // Establecemos la empresa activa con la empresa proporcionada en el payload
    },
    // Reducer para eliminar la empresa activa
    removeEmpresaActiva(state) {
      state.empresaActiva = null; // Eliminamos la empresa activa estableciéndola como null
    },
  },
});

// Exportamos los actions generados por el slice
export const { setEmpresas, setEmpresaActiva, removeEmpresaActiva } =
  EmpresaReducer.actions;

// Exportamos el reducer generado por el slice
export default EmpresaReducer.reducer; 