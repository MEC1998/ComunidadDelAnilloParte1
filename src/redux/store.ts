// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import selectedCompanyReducer from "./slices/selectedCompanySlice"; // Importamos el nuevo reducer
import ActiveElementReducer from "./slices/ActiveElementReducer.";
import selectedBranchReducer from "./slices/selectedBranchSlice"; // Importa el nuevo reducer
import TablaReducer from "./slices/TablaReducer"; // Asegúrate de que TablaReducer esté importado

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    activeElementReducer: ActiveElementReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
    selectedCompany: selectedCompanyReducer, // Agregamos el nuevo reducer para la selección de la empresa con la clave selectedCompany
    selectedBranch: selectedBranchReducer, // Agrega el nuevo reducer
    tablaReducer: TablaReducer, // Asegúrate de que esté correctamente configurado
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;
