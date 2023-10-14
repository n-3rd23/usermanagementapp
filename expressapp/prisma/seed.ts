import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
const prisma = new PrismaClient();
async function main() {
  const PASSWORD = "password";
  const PASSWORD2 = "user";
  const hashPassword = await argon.hash(PASSWORD);
  const userHashPassword = await argon.hash(PASSWORD2);
  const createdAdmin = await prisma.roles.create({
    data: {
      role: "ADMIN",
      id: 1,
      users: {
        create: {
          email: "admin@admin.com",
          name: "Super Admin",
          password: hashPassword,
        },
      },
    },
  });
  const createdUser = await prisma.roles.create({
    data: {
      role: "USER",
      id: 2,
      users: {
        create: {
          email: "user@user.com",
          name: "Normal User",
          password: userHashPassword,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
