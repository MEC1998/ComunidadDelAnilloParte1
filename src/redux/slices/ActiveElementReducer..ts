import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"; 

// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  dataTable: ISucursal[]; // Cambiado a ISucursal
  elementActive: null | ISucursal; // Cambiado a ISucursal
}

// Estado inicial del slice
const initialState: IInitialState = {
  dataTable: [], // Inicialmente la tabla está vacía
  elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
};

// Interfaz para la acción del payload personalizado
interface PayloadSetElement {
  element: ISucursal; // Cambiado a ISucursal
}

// Creamos un slice con Redux Toolkit para manejar la tabla
const ActiveElementReducer = createSlice({
  name: "ActiveElementReducer", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para establecer los datos de la tabla
    setDataTable(state, action: PayloadAction<ISucursal[]>) { // Cambiado a ISucursal[]
      state.dataTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
    },
    // Reducer para establecer el elemento activo
    setElementActive(state, action: PayloadAction<PayloadSetElement>) {
      state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
    },
    // Reducer para eliminar el elemento activo
    removeElementActive(state) {
      state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
    },
  },
});

// Exportamos los actions generados por el slice
export const { setDataTable, setElementActive, removeElementActive } =
  ActiveElementReducer.actions;

// Exportamos el reducer generado por el slice
export default ActiveElementReducer.reducer;
