import { BaseRouter } from "./BaseRouter";
import { tableKey } from '../database/Connection';
import { Item } from "../generated/prisma/client";
import { ItemDelegate } from "../generated/prisma/models";

export default class ItemRouter extends BaseRouter<Item, ItemDelegate>
{
    public static tableKey: tableKey = "item";
    constructor()
    {
        super(ItemRouter.tableKey);
    }
}