import { useEffect, useState } from 'react';
import { TECollapse } from "tw-elements-react";
import useAdministradores from "../hooks/useAdministradores";
import TablaCategorias from '../components/TablaCategorias';
import FormularioCategoria from '../components/FormularioCategoria';

const ListaCategorias = () => {

    const {categorias} = useAdministradores();    

    const [activeElement, setActiveElement] = useState("");
    const [categoriaSeleccionado, setCategoriaSeleccionado] = useState(null);

    const handleClickDesplegar = (valor, categoriaNuevo = null) => {
        setActiveElement(valor);
        setCategoriaSeleccionado(categoriaNuevo); // null = nuevo usuario
    };

    useEffect(() => {
        return () => {
            setActiveElement(""); // reset al desmontar
        };
    }, []);


    return (
        <>          
            <div className="flex justify-start">
                <div className="flex w-1/5 " >
                    <input 
                        type="submit"
                        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
                        value="Agregar Categoria"
                        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-orange-800 transition-colors"
                        onClick={() => {                            
                            handleClickDesplegar('Activar', null); // <-- abrir modal para nuevo usuario
                        }}
                        aria-expanded="true"
                        aria-controls="collapseOne"                     
                    />
                </div>
                <div className="flex justify-center w-4/5 ">
                    <h1 className="text-4xl font-black self-center mr-60 ml-10">
                        Lista Categorias
                    </h1>
                </div>
            </div>
            <TECollapse 
            show={activeElement === "Activar"}
            className="!mt-0 !rounded-b-none !shadow-none transition-all duration-500">
                <div className="mt-2 flex justify-center">
                    <FormularioCategoria
                        categoria={categoriaSeleccionado}
                        onClose={() => handleClickDesplegar("")}
                    />
                </div>
            </TECollapse>
            <div className="w-full">
                <TablaCategorias handleClickDesplegar={handleClickDesplegar}
                 categorias={categorias} 
                 />
            </div>
            
        </>
    )
}

export default ListaCategorias;