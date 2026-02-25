import {BaseRouter} from "./BaseRouter";
import { tableKey } from '../database/Connection';
import { User } from "../generated/prisma/client";

class UserRouter extends BaseRouter<User>
{
    public static tableKey: tableKey = "user";
    constructor()
    {
        super(UserRouter.tableKey);
    }
}

let userRouter = new UserRouter();
export default userRouter.getRouter();