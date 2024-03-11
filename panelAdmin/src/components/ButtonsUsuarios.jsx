import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAdministrador from "../hooks/useAdministradores"

export const ButtonsUsuarios = ({handleClickDesplegar,id}) => {

    const [idUsuario, setIdUsuario] = useState(null);

    const {obtenerUsuario, eliminarUsuario, activeElement} = useAdministrador();

    const navigate = useNavigate();
    let contador = 1;

    useEffect(() => {
        if(contador < 2){
            obtenerUsuario(id);
            setIdUsuario(id)
        }
        contador++;        
    },[])

    const handledEliminar = () => {        
        if(confirm('¿Deseas eliminar el usuario?')){
            eliminarUsuario(idUsuario);
        }else{
            navigate('/admin/lista-usuarios');
        }
    }
    
  return (
    <div className='flex justify-between'>
        <Link to={`${id}`} className='text-white text-sm bg-cyan-600 p-3 rounded-md uppercase font-bold
        hover:bg-cyan-800 transition-colors mx-2'
        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
        onClick={() => handleClickDesplegar('Activar')} >
            <svg className="w-6 h-6 text-white "  aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clipRule="evenodd"/>
            </svg>  
        </Link>
        <button className='text-white text-sm bg-red-500 p-3 rounded-md uppercase font-bold
        hover:bg-red-800 transition-colors ml-2'
        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
        onClick={() => handledEliminar()}>
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z" clipRule="evenodd"/>
            </svg>   
        </button>
    </div>
    
  )
}
