import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
},{
    timestamps: true
});

const Game = mongoose.model("Game", gameSchema);
export default Game;