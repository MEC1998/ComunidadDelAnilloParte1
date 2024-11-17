import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from "../../../hooks/redux";
import styles from "./NavBar.module.css"; // Importa los estilos del módulo

// Componente NavBar
export const NavBar = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate();
  const selectedBranch = useAppSelector((state) => state.selectedBranch.branch);

  // Función para regresar a la página anterior
  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    // Barra de navegación
    <AppBar position="static" className={styles.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          {/* Botón de regreso */}
          <Button
            onClick={handleBack}
            className={styles.arrowButton}
          >
            <ArrowBackIcon />
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {/* Mostrar el nombre de la sucursal seleccionada */}
            <Button className={styles.button}>
              {selectedBranch ? selectedBranch.nombre : "Seleccione una sucursal"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
