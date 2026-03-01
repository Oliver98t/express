import "dotenv/config";
import UserService from "../../services/UserService"
import {prisma} from "../../database/Connection";

let userService: UserService;

beforeAll(async () => {
    userService = new UserService(prisma);
    console.log(process.env.TEST_DATABASE_URL);

});

afterAll(async () => {
    await prisma.$disconnect();
});

test("getAll", async () => {
    const result = await prisma.user.findMany();
    expect(result.length).toEqual(100);
});
/*
test("test get email", async () => {
    const result = await userService.getByEmail("test@test.com");
    console.log(result);
});
*/