import { BaseRouter, httpMethods } from "./BaseRouter";
import express, { Router } from 'express';
import { tableKey } from '../database/Connection';
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";
import { StatusCodes } from "http-status-codes";
import { setFlagsFromString } from "node:v8";

class UserRouter extends BaseRouter<User, UserDelegate> {
    public static tableKey: tableKey = "user";
    constructor() {
        super(UserRouter.tableKey);
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

let userRouter = new UserRouter();
export default userRouter.getRouter();