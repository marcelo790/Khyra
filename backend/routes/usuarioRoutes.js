import express from 'express';
import {
    registrar, 
    editar,
    eliminar,
    listar,
    listarByUsuario,
    autenticar, 
    confirmar, 
    resetearPassword, 
    comprobarToken, 
    nuevoPassword, 
    perfil 
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post("/registrar", checkAuth, registrar);
router.put("/editar/:id", checkAuth, editar);
router.delete("/eliminar/:id", checkAuth, eliminar);
router.get("/lista-usuarios", checkAuth, listar);
router.get("/lista-usuarios/:id", checkAuth, listarByUsuario);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", resetearPassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;