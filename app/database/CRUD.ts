import { getDB, tableKey } from './Connection';

export class Crud<T, K>
{
    private tableKey: tableKey;
    private table: any;

    public constructor(tableKey: tableKey, db = getDB())
    {
        this.tableKey = tableKey;
        this.table = db[this.tableKey] as K;
    }

    public async getAll(): Promise<T[] | null>
    {
        return await this.table.findMany() as T[] | null;
    }

    public async get(id: number): Promise<T | null>
    {
        let result = await this.table.findUnique({
            where: {id}
        });
        return result as T | null;
    }

    public async create(newUser: any): Promise<any | null>
    {
        let result;
        try
        {
            result = await this.table.create({data: newUser});
        }
        catch
        {
            result = null;
        }
        return result;
    }

    public async update(id: number, updateUser: T): Promise<T | null>
    {
        let result;
        try
        {
            result = await this.table.update({
                            where: {id},
                            data: updateUser as any
                        }) as T;
        }
        catch(error)
        {
            console.log(error);
            result = null
        }

        return result;
    }

    public async delete(id: number): Promise<T | null>
    {
        let result;
        try
        {
            result = await this.table.delete({
                            where: {id: id}
                        }) as T;
        }
        catch(error)
        {
            console.log(error);
            result = null
        }

        return result;
    }

    public getTable(): K
    {
        return this.table as K
    }
}