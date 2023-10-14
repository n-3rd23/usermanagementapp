import { PrismaClient, users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../util/ErrorResponse";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hasPassword = await argon.hash(password);
    const createdUser: Partial<users> = await prisma.users.create({
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
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const isValidPassword = await argon.verify(existingUser.password, password);
    if (!isValidPassword) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const privateKey: any = process.env.JWT_SECRET;
    const access_token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser.id,
        sub: existingUser.id,
      },
      privateKey
    );
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
  } catch (err: any) {
    console.log("error on login : ", err);
    next(new ErrorResponse(err, 500));
  }
};
