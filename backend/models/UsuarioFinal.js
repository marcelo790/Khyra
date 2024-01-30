import mongoose from "mongoose";

const usuarioFinalSchema = mongoose.Schema({
    imei: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    cantidad: {
        type: Number,
        require: true,
        default: 3
    },
    estado_sesion: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const UsuarioFinal = mongoose.model("Final_User", usuarioFinalSchema);
export default UsuarioFinal;