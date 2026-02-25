import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// keys for accessing different tables in the the DBdo
export type tableKey = keyof PrismaClient;
export function getDB(): PrismaClient
{
    return prisma;
}