import express from 'express';
import { getDB, ModelKey } from './Connection';
import { PrismaClient } from "../generated/prisma/client";

export class Crud<T>
{
    private db: PrismaClient;
    private modelKey: ModelKey; 

    public constructor(modelKey: ModelKey, db = getDB())
    {
        this.modelKey = modelKey;
        this.db = db;
    }

    public async getAll()
    {
        return await this.db[this.modelKey].findMany();
    }
    /*
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