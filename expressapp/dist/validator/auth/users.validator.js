"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getUsersValidator = [
    (0, express_validator_1.query)("page").notEmpty().isNumeric(),
    (0, express_validator_1.query)("perPage").notEmpty().isNumeric(),
];
