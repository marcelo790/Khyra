import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/usuarios/perfil', config);
                setAuth(data);
                navigate('/panel')
            } catch (error) {
                setAuth({})
            }
            setCargando(false);
        }
        autenticarUsuario();
    },[])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;