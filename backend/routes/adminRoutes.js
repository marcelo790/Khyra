import express from 'express';
import {
    registrar, 
    listar,
    listarByUsuario
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post("/create", checkAuth, registrar);
router.get("/list-users", checkAuth, listar);
router.get("/list-users/:id", checkAuth, listarByUsuario);


export default router;