import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

const AdministradorContext = createContext();

/* ===================== HELPERS ===================== */

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
};

const subirArchivoFirebase = async (archivo, carpeta) => {
    const nombre = `${Date.now()}-${archivo.name}`;
    const storageRef = ref(storage, `${carpeta}/${nombre}`);
    await uploadBytes(storageRef, archivo, { contentType: archivo.type });
    return await getDownloadURL(storageRef);
};

const eliminarArchivoFirebase = async (url) => {
    if (!url) return;
    const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
    await deleteObject(ref(storage, path));
};

/* ===================== PROVIDER ===================== */

const AdministradorProvider = ({ children }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [activeElement, setActiveElement] = useState("");

    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [roles, setRoles] = useState([]);
    const [rol, setRol] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({});
    const [subcategorias, setSubCategorias] = useState([]);
    const [subcategoria, setSubCategoria] = useState({});
    const [objetos, setObjetos] = useState([]);
    const [objeto, setObjeto] = useState({});
    const [permisos, setPermisos] = useState([]);

    /* ===================== UI HELPERS ===================== */
    const mostrarAlerta = ({ msg, error = false }) => {
    setAlerta({ msg, error });
    setTimeout(() => setAlerta({}), 3000); // opcional: limpiar después de 3s
  };

    const successFlow = (msg, path) => {
        setAlerta({ msg, error: false });
        setTimeout(() => {
            setAlerta({});
            if (path) navigate(path);
            setActiveElement("");
        }, 3000);
    };

    const errorFlow = (error, fallback) => {
        setAlerta({
            msg: error?.response?.data?.msg || fallback,
            error: true,
        });
    };

    /* ===================== INIT ===================== */

    useEffect(() => {
        const fetchData = async () => {
            const config = getAuthConfig();
            if (!config) return;

            try {
                const [u, r, p, c] = await Promise.all([
                    clienteAxios("/user/list-users", config),
                    clienteAxios("/rol/list-roles", config),
                    clienteAxios("/permission/list-permission", config),
                    clienteAxios("/category/list-categorias", config),
                ]);

                setUsuarios(u.data);
                setRoles(r.data);
                setPermisos(p.data);
                setCategorias(c.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [auth]);

    /* ===================== USUARIOS ===================== */

    const submitUsuario = (data) =>
        data.id ? editarUsuario(data) : nuevoUsuario(data);

    const nuevoUsuario = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await clienteAxios.post("/user/create", data, config);
            setUsuarios([...usuarios, res.data]);
            successFlow("Usuario creado correctamente", "admin/lista-usuarios");
        } catch (error) {
            errorFlow(error, "Error al crear usuario");
        }
    };

    const editarUsuario = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await clienteAxios.put(`/user/update/${data.id}`, data, config);
            setUsuarios(usuarios.map(u => u._id === res.data._id ? res.data : u));
            successFlow("Usuario actualizado", "admin/lista-usuarios");
        } catch (error) {
            errorFlow(error, "Error al editar usuario");
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            await clienteAxios.delete(`/user/delete/${id}`, config);
            setUsuarios(usuarios.filter(u => u._id !== id));

            if (auth._id === id) {
                localStorage.removeItem("token");
                navigate("/");
                return;
            }

            successFlow("Usuario eliminado", "admin/lista-usuarios");
        } catch (error) {
            errorFlow(error, "Error al eliminar usuario");
        }
    };

    /* ===================== ROLES ===================== */

    const submitRol = (data) =>
        data.id ? editarRol(data) : nuevoRol(data);

    const nuevoRol = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await clienteAxios.post("/rol/create", data, config);
            setRoles([...roles, res.data]);
            successFlow("Rol creado", "admin/lista-roles");
        } catch (error) {
            errorFlow(error, "Error al crear rol");
        }
    };

    const editarRol = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await clienteAxios.put(`/rol/update/${data.id}`, data, config);
            setRoles(roles.map(r => r._id === res.data._id ? res.data : r));
            successFlow("Rol actualizado", "admin/lista-roles");
        } catch (error) {
            errorFlow(error, "Error al editar rol");
        }
    };

    /* ===================== CATEGORÍAS ===================== */

    const submitCategoria = (data) =>
        data.id ? editarCategoria(data) : nuevoCategoria(data);

    const nuevoCategoria = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            if (data.image instanceof File) {
                data.image = await subirArchivoFirebase(data.image, "categorias");
            }

            const res = await clienteAxios.post("/category/create", data, config);
            setCategorias([...categorias, res.data]);
            successFlow("Categoría creada", "admin/lista-categorias");
        } catch (error) {
            errorFlow(error, "Error al crear categoría");
        }
    };

    const editarCategoria = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            if (data.image instanceof File) {
                data.image = await subirArchivoFirebase(data.image, "categorias");
            }

            const res = await clienteAxios.put(`/category/update/${data.id}`, data, config);
            setCategorias(categorias.map(c => c._id === res.data._id ? res.data : c));
            successFlow("Categoría actualizada", "admin/lista-categorias");
        } catch (error) {
            errorFlow(error, "Error al editar categoría");
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            const { data } = await clienteAxios.get(`/category/list-categoria/${id}`, config);
            await clienteAxios.delete(`/category/delete/${id}`, config);
            await eliminarArchivoFirebase(data.image);

            setCategorias(categorias.filter(c => c._id !== id));
            successFlow("Categoría eliminada", "admin/lista-categorias");
        } catch (error) {
            errorFlow(error, "Error al eliminar categoría");
        }
    };

    /* ===================== SUBCATEGORÍAS ===================== */

    const submitSubCategoria = (data) =>
        data.id ? editarSubCategoria(data) : nuevoSubCategoria(data);

    const nuevoSubCategoria = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            if (data.image instanceof File) {
                data.image = await subirArchivoFirebase(data.image, "subcategorias");
            }

            const res = await clienteAxios.post("/subcategory/create", data, config);
            setSubCategorias([...subcategorias, res.data]);
            successFlow("Subcategoría creada", "admin/lista-subcategorias");
        } catch (error) {
            errorFlow(error, "Error al crear subcategoría");
        }
    };

    const editarSubCategoria = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            if (data.image instanceof File) {
                data.image = await subirArchivoFirebase(data.image, "subcategorias");
            }

            const res = await clienteAxios.put(`/subcategory/update/${data.id}`, data, config);
            setSubCategorias(subcategorias.map(sc =>
                sc._id === res.data._id ? res.data : sc
            ));
            successFlow("Subcategoría actualizada", "admin/lista-subcategorias");
        } catch (error) {
            errorFlow(error, "Error al editar subcategoría");
        }
    };

    const eliminarSubCategoria = async (id) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            const { data } = await clienteAxios.get(`/subcategory/list-subcategoria/${id}`, config);
            await clienteAxios.delete(`/subcategory/delete/${id}`, config);
            await eliminarArchivoFirebase(data.image);

            setSubCategorias(subcategorias.filter(sc => sc._id !== id));
            successFlow("Subcategoría eliminada", "admin/lista-subcategorias");
        } catch (error) {
            errorFlow(error, "Error al eliminar subcategoría");
        }
    };

    /* ===================== OBJETOS ===================== */

    const submitObjeto = (data) =>
        data.id ? editarObjeto(data) : nuevoObjeto(data);

    const procesarArchivosObjeto = async (data) => {
        if (data.image instanceof File)
            data.image = await subirArchivoFirebase(data.image, "objetos");

        if (data.imagesinfondo instanceof File)
            data.imagesinfondo = await subirArchivoFirebase(data.imagesinfondo, "objetos");

        if (data.audio instanceof File)
            data.audio = await subirArchivoFirebase(data.audio, "audios");
    };

    const nuevoObjeto = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            await procesarArchivosObjeto(data);
            const res = await clienteAxios.post("/object/create", data, config);
            setObjetos([...objetos, res.data]);
            successFlow("Objeto creado", "admin/lista-objetos");
        } catch (error) {
            errorFlow(error, "Error al crear objeto");
        }
    };

    const editarObjeto = async (data) => {
        try {
            const config = getAuthConfig();
            if (!config) return;

            await procesarArchivosObjeto(data);
            const res = await clienteAxios.put(`/object/update/${data.id}`, data, config);
            setObjetos(objetos.map(o =>
                o._id === res.data._id ? res.data : o
            ));
            successFlow("Objeto actualizado", "admin/lista-objetos");
        } catch (error) {
            errorFlow(error, "Error al editar objeto");
        }
    };

    /* ===================== CONTEXT ===================== */

    return (
        <AdministradorContext.Provider
            value={{
                usuarios,
                usuario,
                setUsuario,
                roles,
                rol,
                setRol,
                categorias,
                categoria,
                setCategoria,
                subcategorias,
                subcategoria,
                setSubCategoria,
                objetos,
                objeto,
                setObjeto,
                permisos,
                alerta,
                cargando,
                submitUsuario,
                eliminarUsuario,
                submitRol,
                submitCategoria,
                eliminarCategoria,
                submitSubCategoria,
                eliminarSubCategoria,
                submitObjeto,
                activeElement,
                setActiveElement,
                mostrarAlerta
            }}
        >
            {children}
        </AdministradorContext.Provider>
    );
};

export { AdministradorProvider };
export default AdministradorContext;
