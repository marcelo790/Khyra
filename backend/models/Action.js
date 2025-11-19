import mongoose from "mongoose";

const actionSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}
,{
    timestamps: true
});

const Action = mongoose.model("Action", actionSchema);
export default Action;