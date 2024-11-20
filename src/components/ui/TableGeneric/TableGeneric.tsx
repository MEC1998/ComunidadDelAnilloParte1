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

// Definimos la interfaz para cada columna de la tabla
interface ITableColumn<T> {
  label: string;
  key: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableProps<T extends Record<string, unknown>> {
  columns: ITableColumn<T>[];
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
  data: T[];
}

export const TableGeneric = <T extends { id: number } & Record<string, unknown>>({
  columns,
  handleDelete,
  setOpenModal,
  data,
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

  // Actualizar las filas cuando cambien los datos de la tabla
  useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <Paper 
      sx={{ 
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <TableContainer 
        sx={{ 
          maxHeight: 'calc(100vh - 250px)',
          '@media (max-width: 768px)': {
            maxHeight: 'calc(100vh - 200px)',
          }
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, i: number) => (
                <TableCell 
                  key={i} 
                  align="center"
                  sx={{
                    backgroundColor: '#f5f5f5',
                    fontWeight: 'bold',
                    '@media (max-width: 768px)': {
                      padding: '8px 4px',
                      fontSize: '0.8rem'
                    }
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index: number) => (
                <TableRow hover key={index}>
                  {columns.map((column, i: number) => (
                    <TableCell 
                      key={i} 
                      align="center"
                      sx={{
                        '@media (max-width: 768px)': {
                          padding: '8px 4px',
                          fontSize: '0.8rem'
                        }
                      }}
                    >
                      {column.render
                        ? column.render(row as T)
                        : column.label === "Acciones"
                        ? <ButtonsTable
                            el={row}
                            handleDelete={handleDelete}
                            setOpenModal={setOpenModal}
                          />
                        : row[column.key] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          '@media (max-width: 768px)': {
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontSize: '0.8rem'
            }
          }
        }}
      />
    </Paper>
  );
};
