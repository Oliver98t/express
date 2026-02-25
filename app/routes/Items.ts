import { BaseRouter } from "./BaseRouter";
import { tableKey } from '../database/Connection';
import { Item } from "../generated/prisma/client";
import { ItemDelegate } from "../generated/prisma/models";

class ItemRouter extends BaseRouter<Item, ItemDelegate>
{
    public static tableKey: tableKey = "item";
    constructor()
    {
        super(ItemRouter.tableKey);
    }
}

let itemRouter = new ItemRouter();
export default itemRouter.getRouter();