import { Button } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import { setElementActive } from "../../../redux/slices/TablaReducer";
import Box from '@mui/material/Box';
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

// Interfaz para los props del componente
interface ButtonsComponentProps<T extends ICategorias | IProductos> {
  el: T;
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const ButtonsTable = <T extends ICategorias | IProductos>({ el, handleDelete, setOpenModal }: ButtonsComponentProps<T>) => {
  const dispatch = useAppDispatch();

  // Función para manejar la selección del modal para editar
  const handleModalSelected = () => {
    // Establecer el elemento activo en el estado usando el tipo genérico T
    dispatch(setElementActive({ element: el }));
    // Mostrar el modal para editar el elemento
    setOpenModal(true);
  };

  // Función para manejar la eliminación de un elemento
  const handleDeleteItem = () => {
    handleDelete(el.id); // Llamar a la función handleDelete con el ID del elemento
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}
    >
      {/* Botón para editar el elemento */}
      <Button variant="contained" onClick={handleModalSelected}>
        <span className="material-symbols-outlined">edit</span>
      </Button>
      {/* Botón para eliminar el elemento */}
      <Button variant="contained" color="error" onClick={handleDeleteItem}>
        <span className="material-symbols-outlined">delete_forever</span>
      </Button>
    </Box>
  );
};
