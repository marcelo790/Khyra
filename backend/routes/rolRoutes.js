import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarRol, listadoRoles, listadoPermisosByRol, editarRol, eliminarRol } from "../controllers/rolController.js";

const router = express.Router();

router.get("/",checkAuth, listadoRoles);
router.post("/",checkAuth, registrarRol);
router
.route("/:id")
.get(checkAuth, listadoPermisosByRol)
.put(checkAuth, editarRol)
.delete(checkAuth, eliminarRol);

export default router;