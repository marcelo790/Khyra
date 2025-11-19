import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAdministrador from "../hooks/useAdministradores"
import Swal from "sweetalert2"

export const ButtonsAcciones = ({handleClickDesplegar,id,type}) => {

    const {obtenerCategoria,eliminarCategoria,obtenerRol,eliminarRol,obtenerUsuario, eliminarUsuario, activeElement} = useAdministrador();

    const navigate = useNavigate();

    const handleEditar = async () => {
      if(type === 'Usuario'){
          await obtenerUsuario(id);
        }if(type === 'Rol'){
          await obtenerRol(id);
        }if(type === 'Categoria'){
          await obtenerCategoria(id);
        } // <-- Aquí se carga la categoría seleccionada
      handleClickDesplegar('Activar');
    };

    const handledEliminar = () => {   
        Swal.fire({
            title: `¿Deseas eliminar el ${type}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText:"Cancelar",
            customClass: {
                confirmButton: 'bg-cyan-600 mr-2 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded',
                cancelButton: 'bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded',
                icon: 'border-red-600'
              },
              buttonsStyling: false, // ← importante para que se apliquen tus clases
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado!",
                text: `El ${type} ha sido eliminado.`,
                icon: "success"
              });
              if(type === 'Usuario'){                
                eliminarUsuario(id);
              }if(type === 'Rol'){
                eliminarRol(id);
              }if(type === 'Categoria'){
                eliminarCategoria(id);
              }
            }else{
              if(type === 'Usuario'){                
                navigate('/admin/lista-usuarios');
              }if(type === 'Rol'){
                navigate('/admin/lista-roles');
              }if(type === 'Categoria'){
                navigate('/admin/lista-categorias');
              }                
            }
          });  
    }
    
  return (
    <div className='flex justify-between'>
        <Link to={`${id}`} className='text-white text-sm bg-cyan-600 p-3 rounded-md uppercase font-bold
        hover:bg-cyan-800 transition-colors mx-2'
        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
        onClick={() => handleEditar()} >
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
