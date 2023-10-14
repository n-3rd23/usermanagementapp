import { body } from "express-validator";

export const loginValidator = [
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString(),
];
