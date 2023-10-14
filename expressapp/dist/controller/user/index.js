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
exports.addUser = exports.getAUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const ErrorResponse_1 = require("../../util/ErrorResponse");
const role_constants_1 = require("../../constants/role.constants");
const argon = __importStar(require("argon2"));
const prisma = new client_1.PrismaClient();
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.findUnique({
        where: {
            id,
        },
        include: {
            roles: true,
        },
    });
    if (!user) {
        return null;
    }
    return user;
});
exports.getUser = getUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, perPage } = req.query;
        const [total, users] = yield prisma.$transaction([
            prisma.users.count({
                where: {
                    roles: {
                        role: {
                            not: role_constants_1.USER_ROLES.ADMIN,
                        },
                    },
                },
            }),
            prisma.users.findMany({
                where: {
                    roles: {
                        role: {
                            not: role_constants_1.USER_ROLES.ADMIN,
                        },
                    },
                },
                take: parseInt(perPage),
                skip: parseInt(page) * parseInt(perPage),
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role_id: true,
                    roles: true,
                },
            }),
        ]);
        return res.status(200).json({
            success: true,
            data: {
                users,
                page,
                perPage,
                total,
            },
        });
    }
    catch (err) {
        console.log(err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, role_id, } = req.body;
        const { id } = req.params;
        const updatedUser = yield prisma.users.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                role_id,
            },
            select: {
                email: true,
                id: true,
                name: true,
                role_id: true,
                roles: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: updatedUser,
        });
    }
    catch (err) {
        console.log(err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield prisma.users.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: deletedUser,
        });
    }
    catch (err) {
        console.log(err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.deleteUser = deleteUser;
const getAUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.users.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                email: true,
                role_id: true,
                roles: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (err) {
        console.log(err);
        next(new ErrorResponse_1.ErrorResponse(err, 500));
    }
});
exports.getAUser = getAUser;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.addUser = addUser;
