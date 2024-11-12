// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import EmpresaReducer from "./slices/EmpresaReducer"; // Importamos el reducer del slice EmpresaReducer

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    empresaReducer: EmpresaReducer, // Agregamos el reducer del slice EmpresaReducer al estado global con la clave empresaReducer
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { empresaReducer: EmpresaState }
export type AppDispatch = typeof store.dispatch;
