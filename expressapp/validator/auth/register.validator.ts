import { body } from "express-validator";

export const registerValidator = [
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString(),
  body("name").notEmpty().isString(),
];
