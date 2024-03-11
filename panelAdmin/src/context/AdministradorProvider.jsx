import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdministradorContext = createContext();



const AdministradorProvider = ({children}) =>{

    const { auth } = useAuth()
    
    const [alerta, setAlerta] = useState({});
    const [eliminarUser, setEliminarUser] = useState(false)
    const [usuario, setUsuario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
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
                const {data} = await clienteAxios('/usuarios/lista-usuarios', config);
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
                const {data} = await clienteAxios('/roles/lista-roles', config);
                setRoles(data)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        obtenerRoles();
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
            const {data} = await clienteAxios.put(`/usuarios/editar/${usuario.id}`, usuario, config);
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
            const {data} = await clienteAxios.post('/usuarios/registrar', usuario, config);
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
            const {data} = await clienteAxios.delete(`/usuarios/eliminar/${id}`, config);
            const usuariosActualizados = usuarios.filter(usuarioFilter => usuarioFilter._id !== id );
            setUsuarios(usuariosActualizados);
            setAlerta({
                msg: data.msg,
                error: false
            });            
            setTimeout(() => {
                setAlerta({});
                navigate('admin/lista-usuarios');
            }, 3000); 
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
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
            const {data} = await clienteAxios.get(`/usuarios/lista-usuarios/${id}`, config);
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
                cargando,
                handleClickDesplegar,
                activeElement,
                cerrarSesionUsuarios,
                eliminarUsuario,
                setEliminarUser,
                eliminarUser
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