import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAdministrador from "../hooks/useAdministradores"
import Swal from "sweetalert2"

export const StateButtonUsuario = ({id,state}) => {

    const [idUsuario, setIdUsuario] = useState(null);

    const {editarStateUsuario, obtenerUsuario} = useAdministrador();

    const navigate = useNavigate();


    useEffect(() => {
        obtenerUsuario(id);
        setIdUsuario(id)      
    },[])
   
    const confirmarCambioEstado = async(idUsuario, state)  => {
        if (state === 'ACTIVO') {
            const result = await Swal.fire({
                title: 'Usuario activo',
                text: '¿Qué acción deseas realizar?',
                icon: 'question',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: 'Inactivo',
                denyButtonText: 'Bloquear',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'bg-yellow-500 mr-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded',
                    denyButton: 'bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                    cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded'
                  },
                  buttonsStyling: false, // ← importante para que se apliquen tus clases
            });
    
            if (result.isConfirmed) {
                editarStateUsuario(idUsuario, 'INACTIVO');
            } else if (result.isDenied) {
                editarStateUsuario(idUsuario, 'BLOQUEADO');
            }
        } else {
            const result = await Swal.fire({
                title: '¿Deseas activar al usuario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, activar',
                cancelButtonText: 'Cancelar'
            });
    
            if (result.isConfirmed) {
                editarStateUsuario(idUsuario, 'ACTIVO');
            } else {
                navigate('/admin/lista-usuarios');
            }
        }
    };
    
  return (
    <div className='flex justify-between'>
        <button
            className={`text-white text-sm p-3 rounded-md uppercase font-bold hover:transition-colors ml-2 ${
            state === 'ACTIVO'
                ? 'bg-green-500 hover:bg-green-700'
                : state === 'INACTIVO'
                ? 'bg-yellow-500 hover:bg-yellow-700'
                : 'bg-red-500 hover:bg-red-700'
            }`}
            onClick={() => confirmarCambioEstado(id,state)}
        >
            <div className="flex items-center gap-2">
            {state}
            {state === 'ACTIVO' && (
                <svg className="w-8 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
                </svg>
            )}
            {state === 'INACTIVO' && (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-11a1 1 0 011 1v3a1 1 0 01-2 0V8a1 1 0 011-1zm0 7a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
            )}
            {state === 'BLOQUEADO' && (
                <svg className="w-8 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.707a1 1 0 00-1.414-1.414L6 6.586 4.707 5.293a1 1 0 00-1.414 1.414L4.586 8l-1.293 1.293a1 1 0 001.414 1.414L6 9.414l1.293 1.293a1 1 0 001.414-1.414L7.414 8l1.293-1.293z"
                    clipRule="evenodd"
                />
                </svg>
            )}
            </div>
        </button>
    </div>

    
  )
}
