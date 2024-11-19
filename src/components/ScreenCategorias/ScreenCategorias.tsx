import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CategoriasService } from "../../services/dtos/CategoriasService";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";
import { Button, CircularProgress } from "@mui/material";
import { ModalCategoria } from "../ui/modals/ModalCategorias/ModalCategorias";

const API_URL = import.meta.env.VITE_API_URL;

export const ScreenCategorias = () => {
    const { idempresa, idsucursal } = useParams();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const categoriasService = useMemo(() => new CategoriasService(`${API_URL}/categorias`), []);

    const getCategorias = useCallback(async () => {
        setLoading(true);
        try {
            if (!idempresa) {
                console.error("ID de empresa no válido:", idempresa);
                return;
            }
            const response = await fetch(`http://190.221.207.224:8090/categorias/porEmpresa/${idempresa}`);
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            const categoriasData = await response.json();
            dispatch(setDataTable(categoriasData));
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, idempresa]);

    useEffect(() => {
        getCategorias();
    }, [getCategorias]);

    const ColumnsTableCategoria = [
        {
            label: "ID",
            key: "id",
            render: (categoria: ICategorias) => (categoria?.id ? categoria.id : 0),
        },
        { label: "Denominación", key: "denominacion" },
        { label: "Acciones", key: "acciones" },
    ];

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "¿Seguro que quieres eliminar esta categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await categoriasService.deleteCategoria(id);
                    await getCategorias();
                    Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
                } catch (error) {
                    console.error("Error al eliminar la categoría:", error);
                    Swal.fire("Error!", "No se pudo eliminar la categoría.", "error");
                }
            }
        });
    };

    return (
        <>
            <div>
                <div style={{ padding: ".4rem", display: "flex", justifyContent: "flex-end", width: "90%" }}>
                    <Button onClick={() => setOpenModal(true)} variant="contained">
                        Agregar Categoría
                    </Button>
                </div>
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", gap: "2vh", height: "100%" }}>
                        <CircularProgress color="secondary" />
                        <h2>Cargando...</h2>
                    </div>
                ) : (
                    <TableGeneric<ICategorias>
                        handleDelete={handleDelete}
                        columns={ColumnsTableCategoria}
                        setOpenModal={setOpenModal}
                    />
                )}
            </div>

            <ModalCategoria
                getCategorias={getCategorias}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}; 