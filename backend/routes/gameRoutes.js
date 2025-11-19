import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registrarGame, listadoGames, listadoByGame, editarGame, eliminarGame } from "../controllers/gameController.js";

const router = express.Router();

router.get("/list-games",checkAuth, listadoGames);
router.post("/create",checkAuth, registrarGame);
router.put("/update/:id", checkAuth, editarGame);
router.delete("/delete/:id", checkAuth, eliminarGame);
router.get("/list-game/:id",checkAuth, listadoByGame);

export default router;