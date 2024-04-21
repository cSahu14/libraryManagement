import mongoose from "mongoose";

const circulationSchema = new mongoose.Schema({
    eventtype: {
        type: String,
        enum: ["checkout", "return"],
        required: true
    },
    book_id: {
        type: Number,
        ref: "Book",
        required: true
    },
    member_id: {
        type: Number,
        ref: "Member",
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true })

circulationSchema.indexes({ eventtype: 1, book_id: 1, member_id: 1 })

export default mongoose.model("Circulation", circulationSchema)