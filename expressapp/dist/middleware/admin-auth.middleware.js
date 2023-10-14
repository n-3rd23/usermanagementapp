"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleWare = void 0;
const ErrorResponse_1 = require("../util/ErrorResponse");
const jwt = __importStar(require("jsonwebtoken"));
const adminAuthMiddleWare = (req, res, next) => {
    const accessToken = req.cookies.Authorization;
    if (!accessToken) {
        return next(new ErrorResponse_1.ErrorResponse("Forbidden", 403));
    }
    const jwtToken = process.env.JWT_SECRET;
    const user = jwt.verify(accessToken, jwtToken);
    if (!user) {
        return next(new ErrorResponse_1.ErrorResponse("Forbidden", 403));
    }
    Object.assign(req, user);
    next();
};
exports.adminAuthMiddleWare = adminAuthMiddleWare;
