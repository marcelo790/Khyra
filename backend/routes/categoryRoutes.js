import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarCategory,listadoByCategory,listadoCategories,editarCategory,eliminarCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get("/list-categorias",checkAuth, listadoCategories);
router.post("/create",checkAuth,registrarCategory);
router.put("/update/:id", checkAuth, editarCategory);
router.delete("/delete/:id", checkAuth, eliminarCategory);
router.get("/list-categoria/:id",checkAuth, listadoByCategory);

export default router;