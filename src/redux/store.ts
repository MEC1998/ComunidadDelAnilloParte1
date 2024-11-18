// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa el almacenamiento local
import selectedCompanyReducer from "./slices/selectedCompanySlice"; // Importamos el nuevo reducer
import ActiveElementReducer from "./slices/ActiveElementReducer";
import selectedBranchReducer from "./slices/selectedBranchSlice"; // Importa el nuevo reducer
import TablaReducer from "./slices/TablaReducer"; // Asegúrate de que TablaReducer esté importado
import { combineReducers } from "redux"; // Importa combineReducers

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  activeElementReducer: ActiveElementReducer,
  selectedCompany: selectedCompanyReducer,
  selectedBranch: selectedBranchReducer,
  tablaReducer: TablaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;

// Asegúrate de que el estado de selectedBranch tenga la propiedad id
export interface SelectedBranchState {
  id: number | null; // Asegúrate de que el tipo incluya 'id'
  // ... otras propiedades si las hay
}
