import { useEffect, useState, useCallback, useMemo } from "react";
import { CategoriasService } from "../../services/dtos/CategoriasService";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { ModalCategoria } from "../ui/modals/ModalCategorias/ModalCategorias";
import styles from './ScreenCategorias.module.css';

const API_URL = import.meta.env.VITE_API_URL;

interface ScreenCategoriasProps {
    _idempresa?: string;
    idsucursal?: string;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ScreenCategorias: React.FC<ScreenCategoriasProps> = ({ 
    _idempresa, 
    idsucursal,
    openModal,
    setOpenModal 
}) => {
    const dispatch = useAppDispatch();
    console.log(_idempresa);
    
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);

    const categoriasService = useMemo(() => new CategoriasService(`${API_URL}/categorias`), []);

    const fetchCategorias = useCallback(async () => {
        setLoading(true);
        try {
            const data = await categoriasService.getAllCategoriasPorSucursal(Number(idsucursal));
            setCategorias(data);
            dispatch(setDataTable(data));
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
        } finally {
            setLoading(false);
        }
    }, [idsucursal, dispatch, categoriasService]);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

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
                    await fetchCategorias();
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
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", gap: "2vh", height: "100%" }}>
                        <CircularProgress color="secondary" />
                        <h2>Cargando...</h2>
                    </div>
                ) : (
                    <div>
                        <h3 className={styles.title}>Categorías</h3>
                        <TableGeneric<ICategorias>
                            handleDelete={handleDelete}
                        columns={ColumnsTableCategoria}
                        setOpenModal={setOpenModal}
                            data={categorias}
                        />
                    </div>
                )}
            </div>

            <ModalCategoria
                getCategorias={fetchCategorias}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}; 