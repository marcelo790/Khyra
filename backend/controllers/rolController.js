import Rol from '../models/Rol.js';

const registrarRol = async (req, res) => {
    const rol = new Rol(req.body);
    //rol.permisos = req.permisos._id;
    try {
        const rolAlmacenado = await rol.save();
        res.json(rolAlmacenado);
    } catch (error) {
        console.log(error)
    }
    
};

const listadoRoles = async(req, res) => {
    const roles = await Rol.find();
    res.json(roles);
}

const listadoPermisosByRol = async(req, res) => {
    const {id} = req.params;
    const rol = await Rol.findById(id);

    if(!rol){
        const error = new Error("Rol no encontrado")
        return res.status(404).json({msg: error.message});
    }
    if(!rol.permisos || rol.permisos.length <= 0){
        const error = new Error("El rol seleccionado no tiene permisos");
        return res.status(404).json({msg: error.message});
    }
    res.json(rol.permisos);
}

const editarRol = async(req, res) =>{
    const {id} = req.params;
    const rol = await Rol.findById(id);

    if(!rol){
        const error = new Error("Rol no encontrado")
        return res.status(404).json({msg: error.message});
    }

    rol.nombre = req.body.nombre || rol.nombre;
    rol.descripcion = req.body.descripcion || rol.descripcion;

    try {
        const rolAlmacenado = await rol.save();
        res.json(rolAlmacenado);
    } catch (error) {
        console.log(error)
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
    eliminarRol
}