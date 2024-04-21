import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log(`Database connected.`)
    })

    mongoose.connection.on("error", () => {
        console.log(`Error While connecting to database.`)
    })
    await mongoose.connect(config.databaseUrl);
}

export default connectDB;