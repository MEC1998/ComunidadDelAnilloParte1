// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import TablaReducer from "./slices/TablaReducer"; // Importamos el reducer del slice TablaReducer
import selectedCompanyReducer from "./slices/selectedCompanySlice"; // Importamos el nuevo reducer

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    tablaReducer: TablaReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
    selectedCompany: selectedCompanyReducer, // Agregamos el nuevo reducer para la selección de la empresa con la clave selectedCompany
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;
