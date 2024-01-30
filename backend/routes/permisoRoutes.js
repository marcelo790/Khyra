import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarPermiso, listadoPermisos } from "../controllers/permisoController.js";

const router = express.Router();

router.post("/",checkAuth, registrarPermiso);
router.get("/",checkAuth, listadoPermisos);

export default router;