import Usuario from '../models/Usuario.js';
import Rol from '../models/Rol.js';
import generarId from '../helpers/generarId.js';
import generarJwt from '../helpers/generarJwt.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js';


const registrar = async (req, res) => {
    //Evitar registros duplicados
    const {email,rol} = req.body;
    const existeUsuario = await Usuario.findOne({email : email });
    const existeRol = await Rol.findById(rol);
    
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        if(existeRol){
            usuario.rol = existeRol;
            const usuarioAlmacenado = await usuario.save();
            //Enviar email de confirmación
            emailRegistro({
                email: usuario.email,
                nombre: usuario.nombre,
                token: usuario.token
            });
            res.json(usuarioAlmacenado);
        }
        
    } catch (error) {
        console.log(error);
    }
};

const listar = async(req, res) => {
    const usuarios = await Usuario.find().populate('rol');
    if(!usuarios){
        const error = new Error("No existen usuarios");
        return res.status(404).json({msg: error.message})
    }
    res.json(usuarios);
}

const editar = async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    if(!usuario){
        const error = new Error("No existe usuario");
        return res.status(404).json({msg: error.message})
    }
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.email = req.body.email || usuario.email;
    usuario.rol = req.body.rol || usuario.rol;
    try {
        const usuarioEditado = await usuario.save()
        res.json(usuarioEditado);
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
    
}

const eliminar = async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    if(!usuario){
        const error = new Error("No existe usuario");
        return res.status(404).json({msg: error.message})
    }
    try {
        await usuario.deleteOne();
        res.json({msg: 'Usuario Eliminado'})
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}


const listarByUsuario = async(req, res) => {
    const {id} = req.params;
    const usuarios = await Usuario.findById(id).populate('rol');
    if(!usuarios){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }
    res.json(usuarios);
}


const autenticar = async (req, res) => {
    const {email, password} = req.body;
    // Comprobar si usuario existe
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }
    // Comprobar si usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(404).json({msg: error.message})
    }
    // Comprobar si usuario esta su estado activo
    if(usuario.estado === 'Inactivo'){
        const error = new Error("Tu cuenta esta Inactiva");
        return res.status(404).json({msg: error.message})
    }else if(usuario.estado === 'Bloqueado'){
        const error = new Error("Tu cuenta esta Bloqueada");
        return res.status(404).json({msg: error.message});
    }
    //Comprobar si tu password es correcto
    if(await usuario.comprobarPassword(password)){
        usuario.estado_sesion = true;
        res.json({
            _id : usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJwt(usuario._id)
        });
        await usuario.save();
    }else{
        const error = new Error("El Password es Incorrecto");
        return res.status(403).json({msg: error.message});
    }
}

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({msg: error.message});
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        usuarioConfirmar.estado = "Activo"
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confirmado Correctamente"})
    } catch (error) {
        console.log(error);
    }
}

const resetearPassword = async (req, res) => {
    const {email} = req.body;
    // Comprobar si usuario existe
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    try {
        usuario.token = generarId();
        usuario.estado = "Inactivo";
        await usuario.save();
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({msg: "Hemos enviado un email con las intrucciones"});
    } catch (error) {
        
    }
}

const comprobarToken = async (req, res) => {
    const {token} = req.params;
    const tokenValido = await Usuario.findOne({token});

    if(tokenValido){
        res.json({msg: "Token válido y el usuario existe"});
    }else{
        const error = new Error("Token no válido");
        return res.status(404).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const usuario = await Usuario.findOne({token});

    if(usuario){
        usuario.password = password;
        usuario.token = "";
        usuario.estado = "Activo";
        try {
            await usuario.save();
            res.json({msg: "Password modificado correctamente"});
        } catch (error) {
            
        }
        
    }else{
        const error = new Error("Token no válido");
        return res.status(404).json({msg: error.message})
    }
}

const perfil = async (req, res) =>{
    const {usuario} = req;
    res.json(usuario);
}

export {
    registrar,
    editar,
    eliminar,
    autenticar,
    confirmar,
    resetearPassword,
    comprobarToken,
    nuevoPassword,
    perfil,
    listar,
    listarByUsuario
}