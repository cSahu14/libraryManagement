import express from "express";
import { checkout } from "../controllers/checkoutController.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout", checkout)

export default checkoutRouter