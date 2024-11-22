import { useEffect, useState, useCallback, useMemo } from "react";
import { CategoriasService } from "../../services/dtos/CategoriasService";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";
import { CircularProgress, Button } from "@mui/material";
import { ModalCategoria } from "../ui/modals/ModalCategorias/ModalCategorias";
import styles from './ScreenCategorias.module.css';

const API_URL = import.meta.env.VITE_API_URL;

interface ScreenCategoriasProps {
    idsucursal?: string;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ScreenCategorias: React.FC<ScreenCategoriasProps> = ({ 
    idsucursal,
    openModal,
    setOpenModal 
}) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});
    const [loadingSubcategorias, setLoadingSubcategorias] = useState<{ [key: number]: boolean }>({});
    const [allData, setAllData] = useState<ICategorias[]>([]);

    const categoriasService = useMemo(() => new CategoriasService(`${API_URL}/categorias`), []);

    // ... existing code ...
    const fetchCategorias = useCallback(async () => {
        setLoading(true);
        try {
            const data = await categoriasService.getAllCategoriasPorSucursal(Number(idsucursal));
            // Filtramos para mostrar solo las categorías padre (aquellas sin categoriaPadre)
            const categoriasPadre = data.filter(categoria => !categoria.categoriaPadre);
            setAllData(categoriasPadre);
            dispatch(setDataTable(categoriasPadre));
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
        } finally {
            setLoading(false);
        }
    }, [idsucursal, dispatch, categoriasService]);
// ... existing code ...

    const toggleSubcategorias = async (categoriaId: number) => {
        if (expandedCategories[categoriaId]) {
            // Si ya están expandidas, las ocultamos
            setExpandedCategories(prev => ({ ...prev, [categoriaId]: false }));
            // Filtramos las subcategorías de esta categoría específica
            setAllData(prev => prev.filter(cat => cat.categoriaPadre?.id !== categoriaId));
        } else {
            setLoadingSubcategorias(prev => ({ ...prev, [categoriaId]: true }));
            try {
                const categoriaCompleta = await categoriasService.getCategoriaById(categoriaId);
                
                if (categoriaCompleta.subCategorias && categoriaCompleta.subCategorias.length > 0) {
                    // Preparamos las subcategorías con la referencia a su categoría padre
                    const subcategoriasConPadre = categoriaCompleta.subCategorias.map(sub => ({
                        ...sub,
                        categoriaPadre: {
                            id: categoriaId,
                            denominacion: categoriaCompleta.denominacion,
                            eliminado: false,
                            sucursales: [],
                            subCategorias: [],
                            articulos: []
                        }
                    }));

                    // Agregamos las subcategorías justo después de su categoría padre
                    const newData = [...allData];
                    const parentIndex = newData.findIndex(cat => cat.id === categoriaId);
                    newData.splice(parentIndex + 1, 0, ...subcategoriasConPadre);
                    setAllData(newData);
                    setExpandedCategories(prev => ({ ...prev, [categoriaId]: true }));
                }
            } catch (error) {
                console.error("Error al cargar subcategorías:", error);
                Swal.fire('Error', 'No se pudieron cargar las subcategorías', 'error');
            } finally {
                setLoadingSubcategorias(prev => ({ ...prev, [categoriaId]: false }));
            }
        }
    };

    const ColumnsTableCategoria = [
        {
            label: "",
            key: "expandir",
            render: (categoria: ICategorias) => {
                if (categoria.categoriaPadre) {
                    return <span style={{ marginLeft: '20px' }}>↳</span>;
                }
                return (
                    <Button 
                        variant="text"
                        onClick={() => toggleSubcategorias(categoria.id)}
                        disabled={loadingSubcategorias[categoria.id]}
                    >
                        {loadingSubcategorias[categoria.id] ? (
                            <CircularProgress size={20} />
                        ) : (
                            expandedCategories[categoria.id] ? '▼' : '▶'
                        )}
                    </Button>
                );
            },
        },
        {
            label: "ID",
            key: "id",
            render: (categoria: ICategorias) => (categoria?.id ? categoria.id : 0),
        },
        {
            label: "Denominación",
            key: "denominacion",
            render: (categoria: ICategorias) => (
                <span style={{ marginLeft: categoria.categoriaPadre ? '20px' : '0' }}>
                    {categoria.denominacion}
                </span>
            ),
        },
        { label: "Acciones", key: "acciones" },
    ];

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

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
                            data={allData}
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