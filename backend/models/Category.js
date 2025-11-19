import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
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
    subcategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        }
    ]
        ,
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }
},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
export default Category;