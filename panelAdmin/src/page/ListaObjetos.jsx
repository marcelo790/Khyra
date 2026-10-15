import { useEffect, useState } from 'react';
import { TECollapse } from "tw-elements-react";
import useAdministradores from "../hooks/useAdministradores";
import TablaObjetos from '../components/TablaObjetos';
import FormularioSubCategoria from '../components/FormularioSubCategoria';

const ListaObjetos = () => {

    const {subcategorias,handleClickDesplegar,activeElement,setActiveElement} = useAdministradores();    

    useEffect(() => {
    return () => {
        setActiveElement(""); // Reset al desmontar componente
    };
    }, []);

    return (
        <>          
            <div className="flex justify-start">
                <div className="flex w-1/4 " >
                    <input 
                        type="submit"
                        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
                        value="Agregar Objeto"
                        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-orange-800 transition-colors"
                        onClick={() => handleClickDesplegar('Activar')}
                        aria-expanded="true"
                        aria-controls="collapseOne"                     
                    />
                </div>
                <div className="flex justify-center w-4/5 ">
                    <h1 className="text-4xl font-black self-center mr-50 ml-10">
                        Lista Objetos
                    </h1>
                </div>
            </div>
            <TECollapse 
            show={activeElement === "Activar"}
            className="!mt-0 !rounded-b-none !shadow-none transition-all duration-500">
                <div className="mt-2 flex justify-center">
                    <FormularioSubCategoria/>
                </div>
            </TECollapse>
            <div className="w-full">
                <TablaObjetos handleClickDesplegar={handleClickDesplegar}
                 subcategorias={subcategorias} 
                 />
            </div>
            
        </>
    )
}

export default ListaObjetos;