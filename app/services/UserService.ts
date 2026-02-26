import express from 'express';
import { PrismaClient } from "../generated/prisma/client";
import { tableKey, getDB } from '../database/Connection';
import { Crud } from '../database/CRUD';
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";
import { StatusCodes } from "http-status-codes";

export class UserService extends Crud<User, UserDelegate>
{
    constructor(db = getDB())
    {
        super("user", db)
    }

    public async getByEmail(email: string)
    {
        let result = true;
        const data: User[] = await this.table.findMany({ where: { email } });
        if (data.length === 0) {
            result = false;
        }
        return result;
    }
}