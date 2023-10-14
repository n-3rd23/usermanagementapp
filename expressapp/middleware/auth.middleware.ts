import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../util/ErrorResponse";
import * as jwt from "jsonwebtoken";
import { getUser } from "../controller/user";
import { USER_ROLES } from "../constants/role.constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const accessToken = req.cookies.Authorization;
  // console.log("Authorization ::: ", req.headers);
  const accessToken = req.headers.authorization || req.cookies.Authorization;
  if (!accessToken) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const jwtToken: any = process.env.JWT_SECRET;
  const user: any = jwt.verify(accessToken, jwtToken);
  if (!user) {
    return next(new ErrorResponse("Forbidden", 401));
  }
  req.user = user;
  next();
};

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  console.log("User : ", user);
  const userRole = await getUser(user.id);
  if (!userRole || userRole.roles.role !== USER_ROLES.ADMIN) {
    return next(new ErrorResponse("Forbidden", 403));
  }
  next();
};
