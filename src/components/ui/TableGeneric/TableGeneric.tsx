import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { ButtonsTable } from "../ButtonsTable/ButtonsTable";
import { useAppSelector } from "../../../hooks/redux";
import { IProductos } from '../../../types/dtos/productos/IProductos'

// Definimos la interfaz para cada columna de la tabla
interface ITableColumn<T> {
  label: string;
  key: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const TableGeneric = <T extends IProductos>({
  columns,
  handleDelete,
  setOpenModal,
}: ITableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Función para cambiar de página
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Función para cambiar el número de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Estado para almacenar las filas de la tabla
  const [rows, setRows] = useState<T[]>([]);

  // Obtener los datos de la tabla del estado global
  const dataTable = useAppSelector((state) => state.tablaReducer.dataTable as unknown as T[]);

  // Actualizar las filas cuando cambien los datos de la tabla
  useEffect(() => {
    setRows(dataTable);
  }, [dataTable]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Contenedor del componente Paper */}
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
        {/* Contenedor de la tabla */}
        <TableContainer sx={{ maxHeight: "80vh" }}>
          {/* Tabla */}
          <Table stickyHeader aria-label="sticky table">
            {/* Encabezado de la tabla */}
            <TableHead>
              <TableRow>
                {columns.map((column, i: number) => (
                  <TableCell key={i} align={"center"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Cuerpo de la tabla */}
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {/* Celdas de la fila */}
                      {columns.map((column, i: number) => {
                        return (
                          <TableCell key={i} align={"center"}>
                            {
                              column.render ? ( // Si existe la función "render" se ejecuta
                                column.render(row as T) // Aseguramos que 'row' es del tipo T
                              ) : column.label === "Acciones" ? ( // Si el label de la columna es "Acciones" se renderizan los botones de acción
                                <ButtonsTable
                                  el={row}
                                  handleDelete={handleDelete}
                                  setOpenModal={setOpenModal}
                                />
                              ) : (
                                row[column.key] as React.ReactNode // Aseguramos que el valor es del tipo ReactNode
                              ) // Si no hay una función personalizada, se renderiza el contenido de la celda tal cual
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>

            
          </Table>
        </TableContainer>
        {/* Paginación de la tabla */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
