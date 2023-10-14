"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserValidator = exports.getAUserValidator = exports.deleteUserValidator = exports.updateUserValidator = exports.getUsersValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getUsersValidator = [
    (0, express_validator_1.query)("page").notEmpty().isNumeric(),
    (0, express_validator_1.query)("perPage").notEmpty().isNumeric(),
];
exports.updateUserValidator = [
    (0, express_validator_1.param)("id").notEmpty().isNumeric().toInt(),
    (0, express_validator_1.body)("name").optional().isString(),
    (0, express_validator_1.body)("role_id").optional().isNumeric(),
    (0, express_validator_1.body)("email").optional().isString().isEmail(),
];
exports.deleteUserValidator = [(0, express_validator_1.param)("id").notEmpty().isNumeric().toInt()];
exports.getAUserValidator = [(0, express_validator_1.param)("id").notEmpty().isNumeric().toInt()];
exports.addUserValidator = [
    (0, express_validator_1.body)("email").notEmpty().isString().isEmail(),
    (0, express_validator_1.body)("password").notEmpty().isString(),
    (0, express_validator_1.body)("name").notEmpty().isString(),
];
