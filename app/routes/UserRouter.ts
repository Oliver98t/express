import express from 'express';
import { StatusCodes } from "http-status-codes";
import  UserService  from "../services/UserService";
import { BaseRouter } from "./BaseRouter";
import { PrismaClient } from "../generated/prisma/client";
import { tableKey, getDB } from '../database/Connection';
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";

export default class UserRouter extends BaseRouter<User, UserDelegate> {
    public static tableKey: tableKey = "user";
    private services: UserService;

    constructor(db : PrismaClient = getDB()) {
        super(UserRouter.tableKey, db);
        this.services = new UserService(db);
        this.addRoute("get", "/get_email/:email", this.getByEmailRoute.bind(this)); // TODO print out paths
    }

    public async getByEmailRoute
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const email = req.params.email as string;
        const data: User[] = await this.services.getByEmail(email);
        if (data.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json("fail");
        }
        else {
            res.status(StatusCodes.ACCEPTED).json(data);
        }
    }
}