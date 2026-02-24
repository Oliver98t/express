import express, { Router } from 'express';
import { getDB, ModelKey } from '../database/Connection'
import { Crud } from '../database/Crud'
import { Mode } from 'node:fs';

export abstract class BaseRouter<T>
{
    private crud: Crud<T>;
    private router = express.Router();

    public constructor(modelKey: ModelKey)
    {
        this.crud = new Crud<T>(modelKey);
        this.setBaseRoutes();
    }

    private setBaseRoutes()
    {
        this.router.get('/', this.getAll.bind(this));
        //this.router.get('/:id', this.get.bind(this));
        //this.router.post('/', this.create.bind(this));
        //router.put('/:id', userCrud.update);
        //router.delete('/:id', userCrud.delete);
    }

    public async getAll
    (   req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        const data = await this.crud.getAll();
        console.log(typeof(data));
        res.status(200).json(data);
    }
    /*
    public get
    (   req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        const id: number = parseInt(req.params.id as string, 10);
        res.send(this.crud.get(id));
    }

    public create
    (   req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        const newUser: T = req.body;
        let result = this.crud.create(newUser);
        if(result)
        {
            res.send(newUser);
        }
        else
        {
            res.send("fail");
        }
    }

    public update
    (   req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        const id: number = parseInt(req.params.id as string, 10);
        let updateUser = req.body as T;
        let currentUser = this.crud.update(id, updateUser);

        res.send(currentUser);
    }*/

    public getRouter(): Router
    {
        return this.router;
    }
}