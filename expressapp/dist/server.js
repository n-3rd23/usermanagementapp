"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const auth_1 = require("./routes/auth");
const errors_middleware_1 = require("./middleware/errors.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use("/user", user_1.router);
app.use("/auth", auth_1.router);
app.use(errors_middleware_1.errorHandlerMiddleware);
app.listen(PORT, () => {
    console.log(`Server started on ${PORT} 🚀 `);
});
