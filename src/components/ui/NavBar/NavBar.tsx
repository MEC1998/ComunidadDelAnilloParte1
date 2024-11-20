import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './NavBar.module.css';
export const NavBar = () => {
  const navigate = useNavigate();
  const { idempresa, idsucursal } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static" className={styles.navbars}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Button onClick={handleBack}>
            <ArrowBackIcon />
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Button>
              {`Sucursal ID: ${idsucursal}, Empresa ID: ${idempresa}`}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
