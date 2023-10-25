import { PrismaClient } from "@prisma/client";

declare global {
    var db: PrismaClient | undefined
}

export const prisma = globalThis.db || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.db = prisma

