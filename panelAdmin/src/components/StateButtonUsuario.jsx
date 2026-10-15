import { useNavigate } from "react-router-dom";
import useAdministrador from "../hooks/useAdministradores";
import Swal from "sweetalert2";

export const StateButtonUsuario = ({ id, state }) => {

    const { editarStateUsuario } = useAdministrador();
    const navigate = useNavigate();

    const confirmarCambioEstado = async () => {

        if (state === "ACTIVO") {
            const result = await Swal.fire({
                title: "Usuario activo",
                text: "¿Qué acción deseas realizar?",
                icon: "question",
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: "Inactivar",
                denyButtonText: "Bloquear",
                cancelButtonText: "Cancelar",
                customClass: {
                    confirmButton:
                        "bg-yellow-500 mr-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded",
                    denyButton:
                        "bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                    cancelButton:
                        "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded",
                },
                buttonsStyling: false,
            });

            if (result.isConfirmed) {
                editarStateUsuario(id, "INACTIVO");
            }

            if (result.isDenied) {
                editarStateUsuario(id, "BLOQUEADO");
            }

            return;
        }

        const result = await Swal.fire({
            title: "¿Deseas activar al usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, activar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            editarStateUsuario(id, "ACTIVO");
        } else {
            navigate("/admin/lista-usuarios");
        }
    };

    return (
        <button
            className={`text-white text-sm p-3 rounded-md uppercase font-bold transition-colors ml-2 ${
                state === "ACTIVO"
                    ? "bg-green-500 hover:bg-green-700"
                    : state === "INACTIVO"
                    ? "bg-yellow-500 hover:bg-yellow-700"
                    : "bg-red-500 hover:bg-red-700"
            }`}
            onClick={confirmarCambioEstado}
        >
            <div className="flex items-center gap-2">
                {state}
            </div>
        </button>
    );
};
