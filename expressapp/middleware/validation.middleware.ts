import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  } else {
    next();
  }
};
