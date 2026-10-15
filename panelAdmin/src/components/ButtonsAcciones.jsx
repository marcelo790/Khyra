import { Link, useNavigate } from "react-router-dom";
import useAdministrador from "../hooks/useAdministradores";
import Swal from "sweetalert2";

export const ButtonsAcciones = ({ handleClickDesplegar, id, type }) => {

    const {
        usuarios,
        roles,
        categorias,
        setUsuario,
        setRol,
        setCategoria,
        eliminarUsuario,
        eliminarRol,
        eliminarCategoria,
        activeElement
    } = useAdministrador();

    const navigate = useNavigate();

    /* ===================== EDITAR ===================== */

    const handleEditar = () => {
        if (type === "Usuario") {
            const seleccionado = usuarios.find(u => u._id === id);
            setUsuario(seleccionado);
        }

        if (type === "Rol") {
            const seleccionado = roles.find(r => r._id === id);
            setRol(seleccionado);
            console.log(seleccionado)
        }

        if (type === "Categoria") {
            const seleccionado = categorias.find(c => c._id === id);
            setCategoria(seleccionado);
        }

        handleClickDesplegar("Activar");
    };

    /* ===================== ELIMINAR ===================== */

    const handleEliminar = () => {
        Swal.fire({
            title: `¿Deseas eliminar el ${type}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton:
                    "bg-cyan-600 mr-2 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded",
                cancelButton:
                    "bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                if (type === "Usuario") eliminarUsuario(id);
                if (type === "Rol") eliminarRol(id);
                if (type === "Categoria") eliminarCategoria(id);

                Swal.fire("Eliminado!", `El ${type} ha sido eliminado.`, "success");
            } else {
                if (type === "Usuario") navigate("/admin/lista-usuarios");
                if (type === "Rol") navigate("/admin/lista-roles");
                if (type === "Categoria") navigate("/admin/lista-categorias");
            }
        });
    };

    return (
        <div className="flex justify-between">
            <Link to={`${id}`} className='text-white text-sm bg-cyan-600 p-3 rounded-md uppercase font-bold
                hover:bg-cyan-800 transition-colors mx-2'
                style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
                onClick={() => handleEditar()} >
                    <svg className="w-6 h-6 text-white "  aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clipRule="evenodd"/>
                    </svg>  
            </Link>

            <button
                className="text-white text-sm bg-red-500 p-3 rounded-md uppercase font-bold
                hover:bg-red-800 transition-colors ml-2"
                style={activeElement ? { pointerEvents: "none" } : {}}
                onClick={handleEliminar}
            >
                🗑️
            </button>
        </div>
    );
};
