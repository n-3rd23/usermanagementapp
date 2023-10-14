"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("email").notEmpty().isString().isEmail(),
    (0, express_validator_1.body)("password").notEmpty().isString(),
    (0, express_validator_1.body)("name").notEmpty().isString(),
];
