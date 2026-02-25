import { BaseRouter, httpMethods } from "./BaseRouter";
import { tableKey } from '../database/Connection';
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";

class UserRouter extends BaseRouter<User, UserDelegate> {
    public static tableKey: tableKey = "user";
    constructor() {
        super(UserRouter.tableKey);
    }

    @UserRouter.Route("hello")
    public getEmail(test:string) {

    }
}

let userRouter = new UserRouter();
export default userRouter.getRouter();