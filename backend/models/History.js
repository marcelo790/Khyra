import mongoose from "mongoose";

const historyState = Object.freeze({
    PANEL: 'PANEL',
    APP: 'APP'
  });


const historySchema = ({
    entry: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    exit: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    type_user: {
        type: String,
        enum: Object.values(historyType),
        default: historyType.PANEL
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    user:{
        type: Types.ObjectId,
        ref: 'User'
    },
    action:{
        type: Types.ObjectId,
        ref: 'Action'
    }
}, {timestamps: true})

const History = mongoose.model("History", historySchema);
export default History;