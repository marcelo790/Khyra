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
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post("/create",checkAuth, registrar);
router.put("/update/:id", checkAuth, editar);
router.delete("/delete/:id", checkAuth, eliminar);
router.get("/list-users", checkAuth, listar);
router.get("/list-users/:id", checkAuth, listarByUsuario);
router.post("/login", autenticar);
router.get("/confirm/:token", confirmar);
router.post("/forget-password", resetearPassword);
router.route("/forget-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/profile", checkAuth, perfil);

export default router;