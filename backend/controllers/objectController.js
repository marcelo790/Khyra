import Objeto from '../models/Object.js';

const registrarObject = async (req, res) => {
    try {
        const { name, audio, image, imagesinfondo, subcategory } = req.body;

        const nuevoObject = new Objeto({ name, audio, image, imagesinfondo, subcategory });
        await nuevoObject.save();

        const populated = await Objeto.findById(nuevoObject._id).populate('subcategory');
        res.status(201).json(populated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear el objeto" });
    }
};

const listadoObjectes = async (req, res) => {
    try {
        const objetos = await Objeto.find().populate('subcategory');
        res.json(objetos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la lista" });
    }
};

const listadoByObject = async (req, res) => {
    try {
        const { id } = req.params;
        const objeto = await Objeto.findById(id).populate('subcategory');

        if (!objeto) {
            return res.status(404).json({ msg: "Objeto no encontrado" });
        }

        res.json(objeto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el objeto" });
    }
};

const editarObject = async (req, res) => {
    try {
        const { id } = req.params;
        const objeto = await Objeto.findById(id);
        if (!objeto) {
            return res.status(404).json({ msg: "Objeto no encontrado" });
        }

        const { name, audio, image, imagesinfondo, subcategory } = req.body;

        objeto.name = name || objeto.name;
        objeto.audio = audio || objeto.audio;
        objeto.image = image || objeto.image;
        objeto.imagesinfondo = imagesinfondo || objeto.imagesinfondo;
        objeto.subcategory = subcategory || objeto.subcategory;

        await objeto.save();
        const updated = await Objeto.findById(id).populate('subcategory');
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar el objeto" });
    }
};

const eliminarObject = async (req, res) => {
    try {
        const { id } = req.params;
        const objeto = await Objeto.findById(id);
        if (!objeto) {
            return res.status(404).json({ msg: "Objeto no encontrado" });
        }

        await objeto.deleteOne();
        res.json({ msg: "Objeto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el objeto" });
    }
};

export {
    registrarObject,
    listadoObjectes,
    listadoByObject,
    editarObject,
    eliminarObject
};
