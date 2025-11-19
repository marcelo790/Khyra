import Rol from '../models/Rol.js';
import mongoose from 'mongoose';

const registrarRol = async (req, res) => {
    try {
        const { name, description, permission } = req.body;

        // Validar permisos como ya lo hacías antes...

        const nuevoRol = new Rol({ name, description, permission });
        await nuevoRol.save();

        // ¡Aquí hacés el populate!
        const rolConPermisos = await Rol.findById(nuevoRol._id).populate('permission');

        res.status(201).json(rolConPermisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear rol" });
    }
    
};

const listadoRoles = async(req, res) => {
    const roles = await Rol.find().populate('permission');
    res.json(roles);
}

const listadoByRol = async(req, res) => {
    const {id} = req.params;
    const rol = await Rol.findById(id).populate('permission', 'name');

    if(!rol){
        const error = new Error("Rol no encontrado")
        return res.status(404).json({msg: error.message});
    }
    if(!rol.permission || rol.permission.length <= 0){
        const error = new Error("El rol seleccionado no tiene permisos");
        return res.status(404).json({msg: error.message});
    }
    res.json(rol);
}

const listadoPermisosByRol = async(req, res) => {
    const {id} = req.params;
    const rol = await Rol.findById(id).populate('permission');

    if(!rol){
        const error = new Error("Rol no encontrado")
        return res.status(404).json({msg: error.message});
    }
    if(!rol.permission || rol.permission.length <= 0){
        const error = new Error("El rol seleccionado no tiene permisos");
        return res.status(404).json({msg: error.message});
    }
    res.json(rol.permission);
}

const editarRol = async(req, res) =>{
     const { id } = req.params;

    // Buscar rol
    const rol = await Rol.findById(id);
    if (!rol) {
        return res.status(404).json({ msg: "Rol no encontrado" });
    }

    const { name, description, permission } = req.body;

    // Actualizar campos si se proporcionan
    rol.name = name || rol.name;
    rol.description = description || rol.description;

    // Si se envió un array de permisos, lo actualizamos
    if (Array.isArray(permission)) {
        const permisosValidos = permission.every(p => mongoose.Types.ObjectId.isValid(p));
        if (!permisosValidos) {
            return res.status(400).json({ msg: "Uno o más permisos no son válidos" });
        }
        rol.permission = permission;
    }

    try {
        // Guardar y luego poblar los permisos
        await rol.save();
        const rolConPermisos = await Rol.findById(rol._id).populate('permission', 'name');

        res.json(rolConPermisos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar el rol" });
    }
}

const eliminarRol = async(req, res) =>{
    const {id} = req.params;
    const rol = await Rol.findById(id);

    if(!rol){
        const error = new Error("Rol no encontrado")
        return res.status(404).json({msg: error.message});
    }

    try {
        await rol.deleteOne();
        res.json({msg: "Rol Eliminado"});
    } catch (error) {
        console.log(error);
    }
    
}

export {
    registrarRol,
    listadoRoles,
    listadoPermisosByRol,
    editarRol,
    eliminarRol,
    listadoByRol
}