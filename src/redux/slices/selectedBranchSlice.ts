import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

// Estado inicial del slice
interface SelectedBranchState {
  branch: ISucursal | null;
}

const initialState: SelectedBranchState = {
  branch: null,
};

// Creación del slice
const selectedBranchSlice = createSlice({
  name: "selectedBranch",
  initialState,
  reducers: {
    setSelectedBranch(state, action: PayloadAction<ISucursal>) {
      state.branch = action.payload;
    },
    clearSelectedBranch(state) {
      state.branch = null;
    },
  },
});

// Exportación de las acciones y el reducer
export const { setSelectedBranch, clearSelectedBranch } = selectedBranchSlice.actions;
export default selectedBranchSlice.reducer; 