import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
        require: true
    },
    permission: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }
    ]
},{
    timestamps: true
});

const Rol = mongoose.model("Role", rolSchema);
export default Rol;