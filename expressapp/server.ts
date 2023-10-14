import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { router as userRoute } from "./routes/user";
import { router as authRouter } from "./routes/auth";
import { errorHandlerMiddleware } from "./middleware/errors.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const app: Express = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/user", userRoute);
app.use("/auth", authRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} 🚀 `);
});
