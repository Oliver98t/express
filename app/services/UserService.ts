import { User } from "../generated/prisma/client";
import { tableKey, getDB } from '../database/Connection';
import { Crud } from '../database/CRUD';
import { UserDelegate } from "../generated/prisma/models";
import { StatusCodes } from "http-status-codes";

export default class UserService extends Crud<User, UserDelegate>
{
    constructor(db = getDB())
    {
        super("user", db)
    }

    public async getByEmail(email: string)
    {
        const data: User[] = await this.getTable().findMany({ where: { email } });
        return data;
    }
}