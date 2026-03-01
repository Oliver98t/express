import { BaseRouter } from "./BaseRouter";
import { Item, Prisma } from "@prisma/client";
import { tableKey } from '../database/Connection';

export default class ItemRouter extends BaseRouter<Item, Prisma.ItemDelegate>
{
    public static tableKey: tableKey = "item";
    constructor()
    {
        super(ItemRouter.tableKey);
    }
}