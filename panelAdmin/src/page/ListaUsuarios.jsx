import FormularioUsuario from "../components/FormularioUsuario";
import { TECollapse } from "tw-elements-react";
import TablaUsuarios from "../components/TablaUsuarios";
import useAdministradores from "../hooks/useAdministradores";
import { useEffect, useState } from "react";

const ListaUsuarios = () => {

    const {usuarios,handleClickDesplegar,activeElement} = useAdministradores();

    return (
        <>          
            <div className="flex justify-start">
                <div className="flex w-1/5 " >
                    <input 
                        type="submit"
                        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
                        value="Agregar Usuario"
                        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-orange-800 transition-colors"
                        onClick={() => handleClickDesplegar('Activar')}
                        aria-expanded="true"
                        aria-controls="collapseOne"                     
                    />
                </div>
                <div className="flex justify-center w-4/5 ">
                    <h1 className="text-4xl font-black self-center mr-60 ml-10">
                        Lista Usuarios
                    </h1>
                </div>
            </div>
            <TECollapse show={activeElement === "Activar"}
            className="!mt-0 !rounded-b-none !shadow-none">
                <div className="mt-2 flex justify-center">
                    <FormularioUsuario/>
                </div>
            </TECollapse>
            <div className="w-full">
                <TablaUsuarios handleClickDesplegar={handleClickDesplegar}
                 usuarios={usuarios} 
                 />
            </div>
            
        </>
    )
}

export default ListaUsuarios;