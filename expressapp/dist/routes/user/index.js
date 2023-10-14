"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_1 = require("../../controller/user");
const users_validator_1 = require("../../validator/user/users.validator");
const validation_middleware_1 = require("../../middleware/validation.middleware");
exports.router = (0, express_1.Router)();
exports.router.route("/").get(auth_middleware_1.authMiddleware, users_validator_1.getUsersValidator, validation_middleware_1.validator, user_1.getUsers);
exports.router
    .route("/:id")
    .patch(auth_middleware_1.authMiddleware, auth_middleware_1.adminAuthMiddleware, users_validator_1.updateUserValidator, validation_middleware_1.validator, user_1.updateUser);
exports.router
    .route("/:id")
    .delete(auth_middleware_1.authMiddleware, auth_middleware_1.adminAuthMiddleware, users_validator_1.deleteUserValidator, validation_middleware_1.validator, user_1.deleteUser);
exports.router
    .route("/:id")
    .get(auth_middleware_1.authMiddleware, auth_middleware_1.adminAuthMiddleware, users_validator_1.getAUserValidator, validation_middleware_1.validator, user_1.getAUser);
exports.router
    .route("")
    .post(auth_middleware_1.authMiddleware, auth_middleware_1.adminAuthMiddleware, users_validator_1.addUserValidator, validation_middleware_1.validator, user_1.addUser);
