import createHttpError from "http-errors";
import bookModel from "../models/bookModel.js"
import CirculationModel from "../models/CirculationModel.js"
import memberModel from "../models/memberModel.js"

const returnBook = async (req, res, next) => {
    const { book_id, member_id, eventType } = req.body;

    if (!book_id || !member_id || eventType !== "return") {
        return next(createHttpError(404, "Data not found."))
    }
    let bookData;
    try {

        bookData = await bookModel.findOne({ BookID: book_id })
        if (!bookData) {
            return next(createHttpError(400, "Book not found."))
        }

    } catch (error) {
        console.log("error", error);
        return next(createHttpError(400, "Error while getting book data"))
    }

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


    // Find member is borrow books and return books

    try {
        const memberCheckoutBook = await CirculationModel.find({
            book_id: bookData.BookID,
            member_id: memberData.MemberID,
            eventtype: "checkout"
        })

        const memberReturnData = await CirculationModel.find({
            book_id: bookData.BookID,
            member_id: memberData.MemberID,
            eventtype: "return"
        })

        if (memberCheckoutBook.length <= memberReturnData.length) {
            return next(createHttpError(400, "Please Checkout this book then return."))
        }
        console.log(memberCheckoutBook.length, memberReturnData.length, "memner")
    } catch (error) {
        return next(createHttpError(400, "Error while getting circulation details."))
    }


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
                NumberOfCopies: bookData.NumberOfCopies + 1
            }
        })

        if (!circulationData && !updateBook.modifiedCount) {
            return next(createHttpError(400, "Checkout Failed."))
        }


        return res.status(201).json({
            message: "Return created successfully"
        })
    } catch (error) {

    }
}

const overDueBooks = async (req, res, next) => {
    const member_id = Number(req.params.id);
    console.log(member_id)

    if (!member_id) {
        return next(createHttpError(404, "Data not found."))
    }


    // Find member is borrow books and return books

    try {
        const memberCheckoutBook = await CirculationModel.find({
            member_id: member_id,
            eventtype: "checkout"
        })

        let booksIds = [];
        memberCheckoutBook.forEach(books => {
            booksIds.push(books.book_id)
        })

        console.log("bookIds", booksIds)

        const memberReturnData = await CirculationModel.find({
            member_id: member_id,
            eventtype: "return"
        })

        if (memberCheckoutBook.length <= memberReturnData.length) {
            return next(createHttpError(400, "Please Checkout this book then return."))
        }
        console.log(memberCheckoutBook.length, memberReturnData.length, "memner")
    } catch (error) {
        return next(createHttpError(400, "Error while getting circulation details."))
    }

}
export { returnBook, overDueBooks }