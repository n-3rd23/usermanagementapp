import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../util/ErrorResponse";
export const errorHandlerMiddleware = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || 500).json({
    success: false,
    data: null,
    message: error.message || "Server Error",
  });
};
