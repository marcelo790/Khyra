import { useContext } from "react";
import AdministradorContext from "../context/AdministradorProvider";

const useAdministradores = () => {
    return useContext(AdministradorContext)
}

export default useAdministradores;