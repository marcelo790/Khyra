import mongoose from "mongoose";

const historialSchema = ({
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    ingreso: {
        type: Date,
        require: true,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function(){
            return this.verifiedBuyer ? 'Users' : 'Final_Users'
        }
    },
    accion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Actions'
    }
},{
    timestamps: true
})

const Historial = mongoose.model("Record", historialSchema);
export default Historial;