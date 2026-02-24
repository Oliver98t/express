import {User} from "../models/User";
import {Item} from "../models/Item";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };

// TODO implement actual ORM with an database instance
export interface Db
{
    user: User[];
    item: Item[];
}
var db: Db = {user: [{name: "Oliver", email: "oli1998t@gmail.com"}], item: []};

export function getDB(): Db
{
    return db;
}

console.log("hello");