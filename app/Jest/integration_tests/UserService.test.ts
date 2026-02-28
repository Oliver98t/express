import UserService from "../../services/UserService"
import prisma from "../../database/Connection";

let userService: UserService;
// set up
beforeAll(() => {
    userService = new UserService(prisma);
});

test("getAll", async () => {
    //prismaMock.user.findMany.mockResolvedValue([{ id: 1, name: "Test User", email: "test@test.com" }] as any);
    const result = await userService.getAll();
    console.log(result);
    //let result  = await crudTest.getAll();
    //expect(result).toEqual([{ id: 1, name: "Test User", email: "test@test.com" }]);
});

test("test get email", async () => {
    const result = await userService.getByEmail("test@test.com");
    console.log(result);
});