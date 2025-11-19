import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarRol, listadoRoles, listadoPermisosByRol, editarRol, eliminarRol,listadoByRol } from "../controllers/rolController.js";

const router = express.Router();

router.get("/list-roles",checkAuth, listadoRoles);
router.post("/create",checkAuth, registrarRol);
router.put("/update/:id", checkAuth, editarRol);
router.delete("/delete/:id", checkAuth, eliminarRol);
router.get("/list-rol-permission/:id",checkAuth, listadoPermisosByRol);
router.get("/list-rol/:id",checkAuth, listadoByRol);

export default router;