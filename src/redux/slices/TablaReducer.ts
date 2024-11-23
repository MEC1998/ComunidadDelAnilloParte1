// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";

// Definimos la interfaz para el estado inicial del slice
interface IInitialState {
  dataTable: (IProductos | ICategorias)[];
  elementActive: IProductos | ICategorias | null;
}

// Estado inicial del slice
const initialState: IInitialState = {
  dataTable: [],
  elementActive: null,
};

// Interfaz para la acción del payload personalizado

// Creamos un slice con Redux Toolkit para manejar la tabla
const TablaReducer = createSlice({
  name: "TablaReducer",
  initialState,
  reducers: {
    // Reducer para establecer los datos de la tabla
    setDataTable(state, action: PayloadAction<(IProductos | ICategorias)[]>) {
      state.dataTable = action.payload;
    },
    // Reducer para establecer el elemento activo
    setElementActive(state, action: PayloadAction<{ element: IProductos | ICategorias }>) {
      state.elementActive = action.payload.element;
    },
    // Reducer para eliminar el elemento activo
    removeElementActive(state) {
      state.elementActive = null;
    },
    // Reducer para establecer los datos de la tabla de categorías
    setCategoriasTable(state, action: PayloadAction<ICategorias[]>) {
      state.dataTable = action.payload;
    },
  },
});

// Exportamos los actions generados por el slice
export const { setDataTable, setElementActive, removeElementActive, setCategoriasTable } =
  TablaReducer.actions;

// Exportamos el reducer generado por el slice
export default TablaReducer.reducer;
