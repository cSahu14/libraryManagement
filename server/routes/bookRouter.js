import express from "express";
import { books } from "../controllers/bookRouter.js";

const bookRouter = express.Router();

bookRouter.get("/", books)

export default bookRouter