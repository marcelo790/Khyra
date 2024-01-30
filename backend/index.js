import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import permisoRoutes from "./routes/permisoRoutes.js";
import cors from 'cors';
/*import accionRoutes from "./routes/accionRoutes.js";
import usuarioFinalRoutes from "./routes/usuarioFinalRoutes.js";
import historialRoutes from "./routes/historialRoutes.js";*/


const app = express();
app.use(express.json());

dotenv.config();

conectarDB(); 

//Configuracion de Cors
const whiteList = [process.env.FRONTEND_URL];

const corsOption = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Error de cors'));
        }
    }
}
app.use(cors(corsOption));
// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/permisos", permisoRoutes);
/*app.use("/api/historiales", historialRoutes);
app.use("/api/acciones", accionRoutes);
app.use("/api/usuariofinal", usuarioFinalRoutes);*/

const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT);
});