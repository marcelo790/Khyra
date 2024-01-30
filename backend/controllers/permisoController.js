import Permiso from '../models/Permiso.js';

const registrarPermiso = async (req, res) => {
    const permiso = new Permiso(req.body);
    try {
        const permisoAlmacenado = await permiso.save();
        res.json(permisoAlmacenado);
    } catch (error) {
        console.log(error)
    }
    
};

const listadoPermisos = async(req, res) => {
    const permisos = await Permiso.find();
    res.json(permisos);
}

export {
    registrarPermiso,
    listadoPermisos
}