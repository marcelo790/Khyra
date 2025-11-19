import mongoose from "mongoose";

const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
},{
    timestamps: true
});

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;