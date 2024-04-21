import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    BookID: {
        type: Number,
        required: true
    },
    BookName: {
        type: String,
        required: true
    },
    NumberOfCopies: {
        type: Number,
        required: true
    }
}, { timestamps: true })

bookSchema.index({ BookID: 1 })
export default mongoose.model("Book", bookSchema)