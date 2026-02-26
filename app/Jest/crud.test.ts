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
    prismaMock.user.findMany.mockResolvedValue([{ id: 1, name: "Test User", email: "test@test.com" }] as any);
    let result  = await crudTest.getAll();
    expect(result).toEqual([{ id: 1, name: "Test User", email: "test@test.com" }]);
});