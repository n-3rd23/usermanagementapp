"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        success: false,
        data: null,
        message: error.message || "Server Error",
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
