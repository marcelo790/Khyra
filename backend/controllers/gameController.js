import Game from "../models/Game.js";

// Crear juego
const registrarGame = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        const nuevoGame = new Game({ name, image, category });
        await nuevoGame.save();

        const gameConCategoria = await Game.findById(nuevoGame._id).populate('category');
        res.status(201).json(gameConCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el juego" });
    }
};

// Listar todos los juegos
const listadoGames = async (req, res) => {
    try {
        const games = await Game.find().populate('category');
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los juegos" });
    }
};

// Obtener juego por ID
const listadoByGame = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id).populate('category');

        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al buscar el juego" });
    }
};

// Editar juego
const editarGame = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        const { name, image, category } = req.body;

        game.name = name || game.name;
        game.image = image || game.image;
        game.category = category || game.category;

        await game.save();

        const actualizado = await Game.findById(game._id).populate('category');
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el juego" });
    }
};

// Eliminar juego
const eliminarGame = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        await game.deleteOne();
        res.json({ msg: "Juego eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el juego" });
    }
};

export {
    registrarGame,
    listadoGames,
    listadoByGame,
    editarGame,
    eliminarGame
};
