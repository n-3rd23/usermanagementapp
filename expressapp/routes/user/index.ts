import { Router } from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "../../middleware/auth.middleware";
import {
  addUser,
  deleteUser,
  getAUser,
  getUsers,
  updateUser,
} from "../../controller/user";
import {
  addUserValidator,
  deleteUserValidator,
  getAUserValidator,
  getUsersValidator,
  updateUserValidator,
} from "../../validator/user/users.validator";
import { validator } from "../../middleware/validation.middleware";

export const router = Router();

router.route("/").get(authMiddleware, getUsersValidator, validator, getUsers);

router
  .route("/:id")
  .patch(
    authMiddleware,
    adminAuthMiddleware,
    updateUserValidator,
    validator,
    updateUser
  );

router
  .route("/:id")
  .delete(
    authMiddleware,
    adminAuthMiddleware,
    deleteUserValidator,
    validator,
    deleteUser
  );

router
  .route("/:id")
  .get(
    authMiddleware,
    adminAuthMiddleware,
    getAUserValidator,
    validator,
    getAUser
  );

router
  .route("")
  .post(
    authMiddleware,
    adminAuthMiddleware,
    addUserValidator,
    validator,
    addUser
  );
