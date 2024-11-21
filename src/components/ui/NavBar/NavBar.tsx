import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './NavBar.module.css';

interface NavBarProps {
  onAddClick?: () => void;
}

interface Sucursal {
  id: number;
  nombre: string;
  empresa: {
    id: number;
    nombre: string;
  };
}

export const NavBar: React.FC<NavBarProps> = ({ onAddClick }) => {
  const navigate = useNavigate();
  const { idempresa, idsucursal } = useParams();
  const [sucursalInfo, setSucursalInfo] = useState<Sucursal | null>(null);

  useEffect(() => {
    const fetchSucursal = async () => {
      try {
        const response = await fetch(`http://190.221.207.224:8090/sucursales/porEmpresa/${idempresa}`);
        if (!response.ok) throw new Error('Error al obtener sucursales');
        const sucursales: Sucursal[] = await response.json();
        const sucursalActual = sucursales.find(suc => suc.id === Number(idsucursal));
        if (sucursalActual) {
          setSucursalInfo(sucursalActual);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (idempresa) {
      fetchSucursal();
    }
  }, [idempresa, idsucursal]);

  return (
    <AppBar position="static" className={styles.navbars}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbarr}>
          <Button onClick={() => navigate('/')} className={styles.arrowButton}>
            <ArrowBackIcon />
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <h3 className={styles.title}>
              {sucursalInfo ? (
                <>
                  {`${sucursalInfo.empresa.nombre} (id:${idempresa})`}
                  <br />
                  {`${sucursalInfo.nombre} (id:${idsucursal})`}
                </>
              ) : (
                `Cargando...`
              )}
            </h3>
          </Box>
          {onAddClick && (
            <Button 
              onClick={onAddClick} 
              variant="contained" 
              className={styles.addButton}
            >
              Agregar
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
