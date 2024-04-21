import express from "express";
import { overDueBooks, returnBook } from "../controllers/returnController.js";

const returnRouter = express.Router();

returnRouter.post("/return", returnBook);
returnRouter.get("/overDueBooks/:id", overDueBooks)

export default returnRouter