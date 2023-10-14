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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = exports.authMiddleware = void 0;
const ErrorResponse_1 = require("../util/ErrorResponse");
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../controller/user");
const role_constants_1 = require("../constants/role.constants");
const authMiddleware = (req, res, next) => {
    // const accessToken = req.cookies.Authorization;
    // console.log("Authorization ::: ", req.headers);
    const accessToken = req.headers.authorization || req.cookies.Authorization;
    if (!accessToken) {
        return next(new ErrorResponse_1.ErrorResponse("Unauthorized", 401));
    }
    const jwtToken = process.env.JWT_SECRET;
    const user = jwt.verify(accessToken, jwtToken);
    if (!user) {
        return next(new ErrorResponse_1.ErrorResponse("Forbidden", 401));
    }
    req.user = user;
    next();
};
exports.authMiddleware = authMiddleware;
const adminAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("User : ", user);
    const userRole = yield (0, user_1.getUser)(user.id);
    if (!userRole || userRole.roles.role !== role_constants_1.USER_ROLES.ADMIN) {
        return next(new ErrorResponse_1.ErrorResponse("Forbidden", 403));
    }
    next();
});
exports.adminAuthMiddleware = adminAuthMiddleware;
