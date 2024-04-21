import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    MemberID: {
        type: Number,
        required: true
    },
    MemberName: {
        type: String,
        required: true
    }
}, { timestamps: true })

memberSchema.index({ MemberID: 1 })

export default mongoose.model("Member", memberSchema)