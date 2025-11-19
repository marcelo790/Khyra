import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarObject, listadoObjectes, listadoByObject, editarObject, eliminarObject } from "../controllers/objectController.js";

const router = express.Router();

router.get("/list-objects",checkAuth, listadoObjectes);
router.post("/create",checkAuth, registrarObject);
router.put("/update/:id", checkAuth, editarObject);
router.delete("/delete/:id", checkAuth, eliminarObject);
router.get("/list-object/:id",checkAuth, listadoByObject);

export default router;