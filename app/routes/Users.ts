import { Db, getDB } from '../database/Connection'
import {BaseRouter} from "./BaseRouter"
import {User} from "../models/User"

class UserRouter extends BaseRouter<User>
{
    public static userColName: keyof Db = "user";
    constructor()
    {
        super(UserRouter.userColName);
    }
}

let userRouter = new UserRouter();
export default userRouter.getRouter();