import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        estado: {
            type: String,
            enum: ['Activo', 'Inactivo', 'Bloqueado'],
            required: true,
            trim: true,
            default: 'Inactivo'
        },
        estado_sesion: {
            type: Boolean,
            required: true,
            default: false
        },
        token: {
            type: String
        },
        confirmado: {
            type: Boolean,
            default: false
        },
        rol:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
        }
    },
    {
        timestamps: true
    }
);
// hash de password
usuarioSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}


const Usuario = mongoose.model("User", usuarioSchema);
export default Usuario;