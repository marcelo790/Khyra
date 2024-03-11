import express from 'express';
import {
    registrar, 
    listar,
    listarByUsuario
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post("/registrar", checkAuth, registrar);
router.get("/lista-usuarios", checkAuth, listar);
router.get("/lista-usuarios/:id", checkAuth, listarByUsuario);


export default router;