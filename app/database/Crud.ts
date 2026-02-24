import express from 'express';
import { Db, getDB } from './Connection'

export class Crud<T>
{
    private colName: keyof Db;
    private db: Db;

    public constructor(colName : keyof Db, db: Db)
    {
        this.colName = colName;
        this.db = db;
    }

    public getAll(): Array<T>
    {
        return this.db[this.colName] as Array<T>;
    }

    public get(id: number): T
    {
        return this.db[this.colName][id] as T;
    }

    public create(newUser: any): boolean
    {
        let result = true;
        try
        {
            this.db[this.colName].push(newUser);
        }
        catch(err)
        {
            result = false;
        }
        return result;
    }

    public update(id: number, updateUser: T): T
    {
        let currentUser = this.db[this.colName][id] as T;


        for(let key in currentUser)
        {
            let accessKey = key as keyof T;
            if(currentUser[accessKey] != updateUser[accessKey])
            {
                currentUser[accessKey] = updateUser[accessKey];
            }
        }
        return updateUser;
    }
/*
    public delete
    (   req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        const id: number = parseInt(req.params.id as string, 10);
        this.db[this.colName].splice(id, 1);
        res.send("row deleted");
    }*/
}