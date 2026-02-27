import UserService from "../services/UserService"
import { prismaMock } from "./singleton";

let userService: UserService;
// set up
beforeAll(() => {
    userService = new UserService(prismaMock);
});

test("test get email", async () => {
    userService.getTable().findMany = jest.fn().mockResolvedValue([{ id: 1, email: "test@test.com" }]);
    const result = await userService.getByEmail("test@test.com");

});