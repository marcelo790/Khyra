import mongoose from "mongoose";

const permisoSchema = mongoose.Schema({
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
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles'
        }
    ]
},{
    timestamps: true
});

const Permiso = mongoose.model("Permission", permisoSchema);
export default Permiso;