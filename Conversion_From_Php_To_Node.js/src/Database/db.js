import prisma from "../lib/prisma.js"

export const testConnection = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS connected`;

    console.log("MySQL Connected Successfully!");
    console.log(result);
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

