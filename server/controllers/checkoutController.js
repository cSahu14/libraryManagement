import createHttpError from "http-errors";
import bookModel from "../models/bookModel.js"
import CirculationModel from "../models/CirculationModel.js"
import memberModel from "../models/memberModel.js"

const checkout = async (req, res, next) => {
    const { book_id, book_name, member_id, eventType } = req.body;

    if (!book_id || !book_name || !member_id || eventType !== "checkout") {
        return next(createHttpError(404, "Data not found."))
    }

    // find bookData per perticular book
    let bookData;
    try {

        bookData = await bookModel.findOne({ BookID: book_id, BookName: book_name })
        if (!bookData) {
            return next(createHttpError(400, "Book not found."))
        }

        if (bookData?.NumberOfCopies < 1) {
            return next(createHttpError(400, "Book out of stock."))
        }
    } catch (error) {
        console.log("error", error);
        return next(createHttpError(400, "Error while getting book data"))
    }

    // find memeber

    let memberData;
    try {

        memberData = await memberModel.findOne({ MemberID: member_id })
        if (!memberData) {
            return next(createHttpError(400, "Member not found."))
        }
    } catch (error) {
        console.log("error", error);
        return next(createHttpError(400, "Error while getting member data"))
    }

    console.log("circulation", bookData, memberData)

    // create circulation and modified book number of copies

    try {
        const newDate = new Date().toLocaleDateString().split("/").reverse().join("-");

        const circulationData = await CirculationModel.create({
            eventtype: eventType,
            book_id: bookData.BookID,
            member_id: memberData.MemberID,
            date: newDate
        })
        console.log("circulationData", circulationData)

        const updateBook = await bookModel.updateOne({
            BookID: book_id
        }, {
            $set: {
                NumberOfCopies: bookData.NumberOfCopies - 1
            }
        })

        if (!circulationData && !updateBook.modifiedCount) {
            return next(createHttpError(400, "Checkout Failed."))
        }


        return res.status(201).json({
            message: "Checkout created successfully"
        })
    } catch (error) {

    }
}

export { checkout }