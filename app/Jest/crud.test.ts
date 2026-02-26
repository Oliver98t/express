import { Crud } from "../database/CRUD";
import { User } from "../generated/prisma/client";
import { UserDelegate } from "../generated/prisma/models";
import { prismaMock } from "./singleton";

let crudTest: Crud<User, UserDelegate>;

beforeEach(() => {
    console.log("hello")
    crudTest = new Crud<User, UserDelegate>("user", prismaMock);
});

test("getAll", async () => {
    let result  = await crudTest.getAll();
    console.log(result);
});