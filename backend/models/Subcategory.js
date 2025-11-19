import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    object: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Object'
        }
    ]
},{
    timestamps: true
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
export default Subcategory;