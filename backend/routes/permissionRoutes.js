import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarPermiso, listadoPermisos } from "../controllers/permisoController.js";

const router = express.Router();

router.post("/create",checkAuth, registrarPermiso);
router.get("/list-permission",checkAuth, listadoPermisos);

export default router;