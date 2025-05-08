import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarRol, listadoRoles, listadoPermisosByRol, editarRol, eliminarRol } from "../controllers/rolController.js";

const router = express.Router();

router.get("/list-roles",checkAuth, listadoRoles);
router.post("/create",checkAuth, registrarRol);
router
.route("/list-rol/:id")
.get(checkAuth, listadoPermisosByRol)
.put(checkAuth, editarRol)
.delete(checkAuth, eliminarRol);

export default router;