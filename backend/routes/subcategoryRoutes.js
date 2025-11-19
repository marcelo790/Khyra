import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarSubcategory,listadoBySubcategory,listadoSubcategories,editarSubcategory,eliminarSubcategory } from '../controllers/subcategoryController.js';

const router = express.Router();

router.get("/list-subcategorias",checkAuth, listadoSubcategories);
router.post("/create",checkAuth,registrarSubcategory);
router.put("/update/:id", checkAuth, editarSubcategory);
router.delete("/delete/:id", checkAuth, eliminarSubcategory);
router.get("/list-subcategoria/:id",checkAuth, listadoBySubcategory);

export default router;