import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

const AdministradorContext = createContext();



const AdministradorProvider = ({children}) =>{

    const { auth } = useAuth()
    
    const [alerta, setAlerta] = useState({});
    const [eliminarUser, setEliminarUser] = useState(false)
    const [usuario, setUsuario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [rol, setRol] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({});
    const [permisos, setPermisos] = useState([]);
    const [permiso, setPermiso] = useState({});
    const [cargando, setCargando] = useState(false);
    const [activeElement, setActiveElement] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/user/list-users', config);
                setUsuarios(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerUsuarios();
        const obtenerRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/rol/list-roles', config);
                setRoles(data)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }        
        obtenerRoles();
        const obtenerPermisos = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/permission/list-permission', config);
                setPermisos(data)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        obtenerPermisos();
        const obtenerCategorias = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/category/list-categorias', config);
                setCategorias(data)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }        
        obtenerCategorias();
    }, [auth]);

    const mostrarAlerta = alerta =>{
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({})
        }, 4000);
    }
    const submitUsuario = async usuario =>{
        if(usuario.id){
            await editarUsuario(usuario);
        }else{
            await nuevoUsuario(usuario);
        }
        
    }

    const editarUsuario = async usuario => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/user/update/${usuario.id}`, usuario, config);
            const usuariosActualizados = usuarios.map(usuarioState => usuarioState._id === data._id ? data : usuarioState)
            setUsuarios(usuariosActualizados);
            setAlerta({
                msg: 'Usuario Actualizado Correctamente',
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-usuarios');
                setActiveElement('') 
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
                setActiveElement('Activar');
            }  
    }

    const editarStateUsuario = async (id, nuevoEstado) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
    
            const payload = {
                state: nuevoEstado
            };
    
            const { data } = await clienteAxios.put(`/user/update-state/${id}`, payload, config);
    
            const usuariosActualizados = usuarios.map(usuarioState =>
                usuarioState._id === data._id ? data : usuarioState
            );
            
            setUsuarios(usuariosActualizados);
            if (auth._id === id && (nuevoEstado === 'BLOQUEADO' || nuevoEstado === 'INACTIVO')) {
                localStorage.removeItem('token');
                cerrarSesionUsuarios();
                navigate('/');
                return;
            }
    
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-usuarios');
                setActiveElement('');
            }, 3000);
    
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || "Error al actualizar estado",
                error: true
            });
            setActiveElement('Activar');
        }
    };
    

    const nuevoUsuario = async usuario => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/user/create', usuario, config);
            setUsuarios([...usuarios, data]);
            setAlerta({
                msg: 'Usuario Creado Correctamente',
                error: false
            });   
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-usuarios');
                setActiveElement('') 
            }, 3000);           
               
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
            setActiveElement('Activar');
        }         
    }

    const eliminarUsuario = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/user/delete/${id}`, config);
            const usuariosActualizados = usuarios.filter(usuarioFilter => usuarioFilter._id !== id );
            setUsuarios(usuariosActualizados);
            // Cierra sesión si se elimina a sí mismo
            if (auth._id === id) {
                localStorage.removeItem('token');
                cerrarSesionUsuarios();
                navigate('/');
                return;
            }
            setAlerta({
                msg: data.msg,
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-usuarios');
                setActiveElement('') 
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });                
                setActiveElement('Activar');
            }  
    }

    const obtenerUsuario = async id => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get(`/user/list-users/${id}`, config);
            setUsuario(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }        
        setTimeout(() => {
            setAlerta({});
            setCargando(false);
        }, 2000);   
        
    }
    /*Roles */
    const submitRol = async rol =>{
        if(rol.id){
            await editarRol(rol);
        }else{
            await nuevoRol(rol);
        }
        
    }
    const nuevoRol = async rol => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/rol/create', rol, config);
            setRoles([...roles, data]);
            setAlerta({
                msg: 'Rol Creado Correctamente',
                error: false
            });   
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-roles');
                setActiveElement('') 
            }, 3000);           
               
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
            setActiveElement('Activar');
        }         
    }


    const editarRol = async rol => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/rol/update/${rol.id}`, rol, config);
            const rolesActualizados = roles.map(rolState => rolState._id === data._id ? data : rolState)
            setRoles(rolesActualizados);
            setAlerta({
                msg: 'Rol Actualizado Correctamente',
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-roles');
                setActiveElement('') 
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
                setActiveElement('Activar');
            }  
    }
    const obtenerRol = async id => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get(`/rol/list-rol/${id}`, config);
            setRol(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }        
        setTimeout(() => {
            setAlerta({});
            setCargando(false);
        }, 2000);   
        
    }

    const eliminarRol = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/rol/delete/${id}`, config);
            const rolesActualizados = roles.filter(rolFilter => rolFilter._id !== id );
            setRoles(rolesActualizados);
            // Cierra sesión si se elimina a sí mismo
            if (auth._id === id) {
                localStorage.removeItem('token');
                cerrarSesionUsuarios();
                navigate('/');
                return;
            }
            setAlerta({
                msg: data.msg,
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-roles');
                setActiveElement('') 
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });                
                setActiveElement('Activar');
            }  
    }

    /*Categorias */

    const submitCategoria = async categoria =>{
        if(categoria.id){
            await editarCategoria(categoria);
        }else{
            await nuevoCategoria(categoria);
        }
        
    }

    const eliminarImagenFirebase = async (urlImagen) => {
        try {
            // Extrae el path desde la URL de descarga
            const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
            const fullPathStart = urlImagen.indexOf(baseUrl) !== -1 
                ? decodeURIComponent(urlImagen.split("/o/")[1].split("?")[0])
                : null;
            
            if (!fullPathStart) return;

            const imagenRef = ref(storage, fullPathStart);
            await deleteObject(imagenRef);
            console.log("Imagen eliminada de Firebase.");
        } catch (error) {
            console.error("Error al eliminar imagen de Firebase:", error);
        }
    };

    const subirImagenFirebase = async (archivo, carpeta = 'categorias') => {
        try {
            const nombreArchivo = `${Date.now()}-${archivo.name}`;
            const storageRef = ref(storage, `${carpeta}/${nombreArchivo}`);

            // Sube el archivo
            await uploadBytes(storageRef, archivo);

            // Obtiene la URL de descarga
            const url = await getDownloadURL(storageRef);
            console.log("URL de descarga generada:", url);
            return url;
        } catch (error) {
            console.error("Error al subir imagen a Firebase:", error);
            throw error;
        }
        };

    const nuevoCategoria = async (categoria) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) return;

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        // Si se envió imagen
        if (categoria.image instanceof File) {
            const urlImagen = await subirImagenFirebase(categoria.image);
            categoria.image = urlImagen; // reemplazamos el file por la URL
        }
        console.log('categoria: ' + categoria)
        
        const { data } = await clienteAxios.post('/category/create', categoria, config);
        setCategorias([...categorias, data]);
        console.log('data: ' + data)
        setAlerta({ msg: 'Categoria Creada Correctamente', error: false });
        setTimeout(() => {
            setAlerta({});
            navigate('admin/lista-categorias');
            setActiveElement('');
        }, 3000);

        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || "Error al crear categoría",
                error: true
            });
            setActiveElement('Activar');
        }
    };


    const editarCategoria = async categoria => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

             if (categoria.image instanceof File) {
                const urlImagen = await subirImagenFirebase(categoria.image);
                categoria.image = urlImagen;
            }


            const {data} = await clienteAxios.put(`/category/update/${categoria.id}`, categoria, config);
            const categoriasActualizados = categorias.map(categoriaState => categoriaState._id === data._id ? data : categoriaState)
            setCategorias(categoriasActualizados);
            setAlerta({
                msg: 'Categoria Actualizado Correctamente',
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-categorias');
                setActiveElement('') 
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
                setActiveElement('Activar');
            }  
    }
    const obtenerCategoria = async id => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clienteAxios.get(`/category/list-categoria/${id}`, config);
            setCategoria(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }        
        setTimeout(() => {
            setAlerta({});
            setCargando(false);
        }, 2000);   
        
    }

    const eliminarCategoria= async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            // Primero obtenemos la categoría con su imagen antes de eliminarla
            const { data: categoria } = await clienteAxios.get(`/category/list-categoria/${id}`, config);
            const urlImagen = categoria?.image;

            // Eliminamos la categoría
            const {data} = await clienteAxios.delete(`/category/delete/${id}`, config);

            // Eliminamos la imagen si existe
            if (urlImagen) {
                await eliminarImagenFirebase(urlImagen);
            }

            const categoriasActualizados = categorias.filter(categoriaFilter => categoriaFilter._id !== id );
            setCategorias(categoriasActualizados);

            if (auth._id === id) {
                localStorage.removeItem('token');
                cerrarSesionUsuarios();
                navigate('/');
                return;
            }

            setAlerta({
                msg: data.msg,
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-categorias');
                setActiveElement('') 
            }, 3000); 
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || "Error al eliminar categoría",
                error: true
            });                
            setActiveElement('Activar');
        }  
    };

    const handleClickDesplegar = (value) => {
        if (value === activeElement) {
        setActiveElement("");
        } else {       
        setActiveElement(value);
        }
    };

    const cerrarSesionUsuarios = () => {
        setUsuarios([])
        setUsuario({})
        setAlerta({})

    }
    return (
        <AdministradorContext.Provider
            value={{
                usuarios,
                usuario,
                mostrarAlerta,
                alerta,
                submitUsuario,
                obtenerUsuario,
                roles,
                rol,
                cargando,
                handleClickDesplegar,
                activeElement,
                setActiveElement,
                cerrarSesionUsuarios,
                eliminarUsuario,
                setEliminarUser,
                eliminarUser,
                editarStateUsuario,
                obtenerRol,
                eliminarRol,
                submitRol,
                permiso,
                permisos,
                categoria,
                categorias,
                submitCategoria,
                obtenerCategoria,
                nuevoCategoria,
                editarCategoria,
                eliminarCategoria
            }}
        >
            {children}
        </AdministradorContext.Provider>
    )
};

export {
    AdministradorProvider
}

export default AdministradorContext;