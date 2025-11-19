import mongoose from "mongoose";

const objectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    audio: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    imagesinfondo: {
        type: String,
        trim: true,
        required: true
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Subcategory'
    }
}, {
    timestamps: true
});

const Objeto = mongoose.model("Object", objectSchema);
export default Objeto;
