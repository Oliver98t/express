import {User} from "../models/User";
import {Item} from "../models/Item";
// TODO implement actual ORM with an database instance
export interface Db
{
    user: User[];
    item: Item[];
}
var db: Db = {user: [{name: "Oliver", email: "oli1998t@gmail.com"}], item: []};

export function getDB(): Db
{
    return db;
}

console.log("hello");