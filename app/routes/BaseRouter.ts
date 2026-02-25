import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { tableKey } from '../database/Connection'
import { Crud } from '../database/CRUD';

type RouteInputs =
    {
        req: express.Request;
        res: express.Response;
        next: express.NextFunction;
    }

export type httpMethods = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export abstract class BaseRouter<T, K> {
    private crud: Crud<T, K>;
    protected table: K;
    private static router: Router = express.Router();

    public constructor(tableKey: tableKey) {
        this.crud = new Crud<T, K>(tableKey);
        this.table = this.crud.getTable();
        this.setBaseRoutes();
    }

    private setBaseRoutes() {
        BaseRouter.router.get('/', this.getAll.bind(this));
        BaseRouter.router.get('/:id', this.get.bind(this));
        BaseRouter.router.post('/', this.create.bind(this));
        BaseRouter.router.put('/:id', this.update.bind(this));
        BaseRouter.router.delete('/:id', this.delete.bind(this));
    }

    public static Route(message: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                console.log(`${message} - Calling ${propertyKey} with`, args);
                return originalMethod.apply(this, args);
            };
        };
    }

    public static addRoute(method: httpMethods, path: any, handler: any) {
        BaseRouter.router[method](path, handler);
    }

    public async getAll
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {

        const data = await this.crud.getAll();
        if (data != null) {
            res.status(StatusCodes.OK).json(data);
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json("item not found");
        }

    }

    public async get
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const id: number = parseInt(req.params.id as string, 10);

        const data = await this.crud.get(id);
        if (data != null) {
            res.status(StatusCodes.OK).json(data);
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json("item not found");
        }

    }

    public async create
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const newUser: T = req.body;
        const result = await this.crud.create(newUser);
        if (result != null) {
            res.status(StatusCodes.OK).json(result);
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json("cant create item");
        }
    }

    public async update
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const id: number = parseInt(req.params.id as string, 10);
        let updateUser = req.body as T;
        let result = await this.crud.update(id, updateUser);

        if (result != null) {
            res.status(StatusCodes.OK).json(result);
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json("cant update item");
        }
    }

    public async delete
        (req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
        const id: number = parseInt(req.params.id as string, 10);
        let result = await this.crud.delete(id);

        if (result != null) {
            res.status(StatusCodes.OK).json(result);
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json("cant delete item");
        }
    }

    public getRouter(): Router {
        return BaseRouter.router;
    }
}