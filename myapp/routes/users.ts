import express from 'express';
import { Db, getDB } from '../database/connection'
let router = express.Router();

interface User
{
    name: string;
    email: string;
}

const colName: keyof Db = 'user';

function userGetAll
(   req: express.Request,
    res: express.Response,
    next: express.NextFunction
) 
{
    const db = getDB();
    res.send(db[colName]);
}

function userGet
(   req: express.Request,
    res: express.Response,
    next: express.NextFunction
) 
{
    const db = getDB();
    const id: number = parseInt(req.params.id as string, 10);
    res.send(db[colName][id]);
}

function userCreate
(   req: express.Request,
    res: express.Response,
    next: express.NextFunction
)
{
    const db = getDB();
    const newUser: User = req.body;
    db[colName].push(newUser);
    res.send(newUser);
} 

function userUpdate
(   req: express.Request,
    res: express.Response,
    next: express.NextFunction
)
{
    const db = getDB();
    const id: number = parseInt(req.params.id as string, 10);
    let currentUser = db[colName][id] as User;
    const newUser = req.body as User;

    for(let key in currentUser)
    {
        let accessKey = key as keyof User;
        if(currentUser[accessKey] != newUser[accessKey])
        {
            currentUser[accessKey] = newUser[accessKey];
        }
    }
    res.send(currentUser);
}

function userDelete
(   req: express.Request,
    res: express.Response,
    next: express.NextFunction
)
{
    const db = getDB();
    const id: number = parseInt(req.params.id as string, 10);
    db[colName].splice(id, 1);
    res.send("row deleted");
}

router.get('/', userGetAll);
router.get('/:id', userGet);
router.post('/', userCreate);
router.put('/:id', userUpdate);
router.delete('/:id', userDelete);

export default router;