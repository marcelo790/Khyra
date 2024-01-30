import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        require: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    permisos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permissions'
        }
    ]
},{
    timestamps: true
});

const Rol = mongoose.model("Role", rolSchema);
export default Rol;