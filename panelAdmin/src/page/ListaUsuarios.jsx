import FormularioUsuario from "../components/FormularioUsuario";
import { TECollapse } from "tw-elements-react";
import TablaUsuarios from "../components/TablaUsuarios";
import useAdministradores from "../hooks/useAdministradores";
import { useState, useEffect } from "react";

const ListaUsuarios = () => {

    const { usuarios } = useAdministradores();

    const [activeElement, setActiveElement] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const handleClickDesplegar = (valor, usuarioNuevo = null) => {
        console.log(activeElement)
        setActiveElement(valor);
        setUsuarioSeleccionado(usuarioNuevo); // null = nuevo usuario
    };

    useEffect(() => {
        return () => {
            setActiveElement(""); // reset al desmontar
        };
    }, []);

    return (
        <>
            <div className="flex justify-start">
                <div className="flex w-1/5">
                    <input 
                        type="submit"
                        style={activeElement ? {pointerEvents: "none"} : {pointerEvents: ""}}
                        value="Agregar Usuario"
                        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-orange-800 transition-colors"
                        onClick={() => {                            
                            handleClickDesplegar('Activar', null); // <-- abrir modal para nuevo usuario
                        }}
                    />
                </div>

                <div className="flex justify-center w-4/5">
                    <h1 className="text-4xl font-black self-center mr-60 ml-10">
                        Lista Usuarios
                    </h1>
                </div>
            </div>

            <TECollapse
                show={activeElement === "Activar"}
                className="!mt-0 !rounded-b-none !shadow-none"
            >
                <div className="mt-2 flex justify-center">
                    <FormularioUsuario
                        usuario={usuarioSeleccionado}
                        onClose={() => handleClickDesplegar("")}
                    />
                </div>
            </TECollapse>

            <div className="w-full">
                <TablaUsuarios
                    usuarios={usuarios}
                    handleClickDesplegar={handleClickDesplegar}
                />
            </div>
        </>
    );
};

export default ListaUsuarios;
