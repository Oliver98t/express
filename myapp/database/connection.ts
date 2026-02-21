// TODO implement actual ORM with an database instance
// TODO create a models folder
export interface User
{
    name: string;
    email: string;
}

export interface Item
{
    name: string
}

export interface Db
{
    user: User[];
    item: Item[];
}
var db: Db = {user: [{name: "Oliver", email: "oli1998t@gmail.com"}], item: []};

export function getDB()
{
    return db;
}