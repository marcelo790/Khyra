import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AdministradorContext = createContext();

const AdministradorProvider = ({children}) =>{
    return (
        <AdministradorContext.Provider
            value={{

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