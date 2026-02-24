import {BaseRouter} from "./BaseRouter";
import { ModelKey } from '../database/Connection';
import {UserModel} from "../generated/prisma/models/User";

class UserRouter extends BaseRouter<UserModel>
{
    public static modelKey: ModelKey = "user";
    constructor()
    {
        super(UserRouter.modelKey);
    }
}

let userRouter = new UserRouter();
export default userRouter.getRouter();