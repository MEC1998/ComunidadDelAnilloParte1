import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { EmpresaService } from "../../services/dtos/EmpresaService";

// Instancia del servicio de empresa
const empresaService = new EmpresaService();

// Acción asíncrona para obtener una empresa por ID
export const fetchEmpresaById = createAsyncThunk(
  "selectedCompany/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const empresa = await empresaService.getEmpresaById(id);
      if (!empresa) {
        return rejectWithValue("Empresa no encontrada");
      }
      return empresa;
    } catch (error) {
      return rejectWithValue("Error al obtener la empresa");
    }
  }
);

// Estado inicial del slice
interface SelectedCompanyState {
  company: IEmpresa | null;
  loading: boolean;
  error: string | null;
  selectedCompanyId: number | null;
}

const initialState: SelectedCompanyState = {
  company: null,
  loading: false,
  error: null,
  selectedCompanyId: null,
};

// Creación del slice
const selectedCompanySlice = createSlice({
  name: "selectedCompany",
  initialState,
  reducers: {
    clearSelectedCompany(state) {
      state.company = null;
      state.error = null;
      state.selectedCompanyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpresaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpresaById.fulfilled, (state, action: PayloadAction<IEmpresa>) => {
        state.loading = false;
        state.company = action.payload;
        state.selectedCompanyId = action.payload.id;
      })
      .addCase(fetchEmpresaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedCompanyId = null;
      });
  },
});

// Exportación de las acciones y el reducer
export const { clearSelectedCompany } = selectedCompanySlice.actions;
export default selectedCompanySlice.reducer; 