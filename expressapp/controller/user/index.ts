import { PrismaClient, users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../util/ErrorResponse";
import { USER_ROLES } from "../../constants/role.constants";
import * as argon from "argon2";
const prisma = new PrismaClient();

export const getUser = async (id: number) => {
  const user = await prisma.users.findUnique({
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
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage }: any = req.query;
    const [total, users] = await prisma.$transaction([
      prisma.users.count({
        where: {
          roles: {
            role: {
              not: USER_ROLES.ADMIN,
            },
          },
        },
      }),
      prisma.users.findMany({
        where: {
          roles: {
            role: {
              not: USER_ROLES.ADMIN,
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
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      name,
      role_id,
    }: {
      name: string;
      email: string;
      role_id: number;
    } = req.body;
    const { id }: { id?: number } = req.params;
    const updatedUser = await prisma.users.update({
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
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id?: number } = req.params;
    const deletedUser = await prisma.users.delete({
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
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const getAUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id?: number } = req.params;
    const user = await prisma.users.findUnique({
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
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const addUser = async (
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
