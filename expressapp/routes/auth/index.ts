import { Router } from "express";
import { login, register } from "../../controller/auth";
import { loginValidator } from "../../validator/auth/login.validator";
import { validator } from "../../middleware/validation.middleware";
import { registerValidator } from "../../validator/auth/register.validator";
import { authMiddleware } from "../../middleware/auth.middleware";

export const router = Router();

router.route("/register").post(registerValidator, validator, register);

router.route("/login").post(loginValidator, validator, login);
