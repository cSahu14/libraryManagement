import express from "express";
import { config } from "./config/config.js";
import connectDB from "./config/db.js";
import cors from "cors"
import checkoutRouter from "./routes/checkoutRouter.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import returnRouter from "./routes/returnRouter.js";
import bookRouter from "./routes/bookRouter.js";


const app = express();
const port = config.port || 5000;
await connectDB();

app.use(cors());
app.use(express.json())


app.use("/api/books", checkoutRouter)
app.use("/api/books", returnRouter)
app.use("/api/books", bookRouter)

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
