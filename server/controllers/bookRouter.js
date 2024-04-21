import createHttpError from "http-errors";
import bookModel from "../models/bookModel.js"

const books = async (req, res, next) => {


    // Get all books
    let bookData;
    try {

        bookData = await bookModel.find({})
        if (!bookData) {
            return next(createHttpError(400, "Book not found."))
        }
    } catch (error) {
        console.log("error", error);
        return next(createHttpError(400, "Error while getting book data"))
    }

    return res.status(200).json({
        message: bookData
    })
}

export { books }