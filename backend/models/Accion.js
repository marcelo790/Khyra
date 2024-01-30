import mongoose from "mongoose";

const accionSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        require: true
    }
}
,{
    timestamps: true
});

const Accion = mongoose.model("Action", accionSchema);
export default Accion;