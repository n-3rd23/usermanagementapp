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
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const ErrorResponse_1 = require("../../util/ErrorResponse");
const argon = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hasPassword = yield argon.hash(password);
        const createdUser = yield prisma.users.create({
            data: {
                email,
                name,
                password: hasPassword,
                role_id: 2,
            },
        });
        delete createdUser.password;
        res.status(201).json({
            success: true,
            data: createdUser,
        });
    }
    catch (err) {
        console.log(err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield prisma.users.findFirst({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return next(new ErrorResponse_1.ErrorResponse("Unauthorized", 401));
        }
        const isValidPassword = yield argon.verify(existingUser.password, password);
        if (!isValidPassword) {
            return next(new ErrorResponse_1.ErrorResponse("Unauthorized", 401));
        }
        const privateKey = process.env.JWT_SECRET;
        const access_token = jwt.sign({
            name: existingUser.name,
            email: existingUser.email,
            id: existingUser.id,
            sub: existingUser.id,
        }, privateKey);
        return res
            .status(200)
            .cookie("Authorization", access_token, {
            httpOnly: true,
            secure: true,
        })
            .json({
            success: true,
            data: {
                name: existingUser.name,
                role_id: existingUser.role_id,
                access_token,
            },
        });
    }
    catch (err) {
        console.log("error on login : ", err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.login = login;
