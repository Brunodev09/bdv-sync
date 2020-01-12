import mongoose, { Schema, model } from "mongoose";

const FileTree = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    folders: [],
    files: [String]
}, {
    timestamps: true
});

export default model<mongoose.Document>("FileTree", FileTree);