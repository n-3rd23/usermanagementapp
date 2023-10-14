import { query, body, param } from "express-validator";

export const getUsersValidator = [
  query("page").notEmpty().isNumeric(),
  query("perPage").notEmpty().isNumeric(),
];

export const updateUserValidator = [
  param("id").notEmpty().isNumeric().toInt(),
  body("name").optional().isString(),
  body("role_id").optional().isNumeric(),
  body("email").optional().isString().isEmail(),
];

export const deleteUserValidator = [param("id").notEmpty().isNumeric().toInt()];

export const getAUserValidator = [param("id").notEmpty().isNumeric().toInt()];

export const addUserValidator = [
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString(),
  body("name").notEmpty().isString(),
];
