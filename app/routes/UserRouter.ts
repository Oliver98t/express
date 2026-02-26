import { BaseRouter } from "./BaseRouter";
import express from 'express';
import { PrismaClient } from "../generated/prisma/client";
import { tableKey, getDB } from '../database/Connection';
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";
import { StatusCodes } from "http-status-codes";

export default class UserRouter extends BaseRouter<User, UserDelegate> {
    public static tableKey: tableKey = "user";

    constructor(db : PrismaClient = getDB()) {
        super(UserRouter.tableKey, db);
        // TODO print out paths
        this.addRoute("get", "/get_email/:email", this.getByEmail.bind(this));
    }

    public async getByEmail
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const email = req.params.email as string;
        const data: User[] = await this.table.findMany({ where: { email } });
        if (data.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json("fail");
        }
        else {
            res.status(StatusCodes.ACCEPTED).json(data);
        }
    }
}