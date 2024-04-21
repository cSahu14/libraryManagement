import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === "development" ? err.errorStack : ""
    })
}

export default globalErrorHandler