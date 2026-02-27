import UserRouter from "../../routes/UserRouter"
import prisma from "../../database/Connection";

let userRouter: UserRouter;

// set up
beforeAll(() => {
    userRouter = new UserRouter(prisma);
});

test("Check table name", async () => {
    expect(UserRouter.tableKey).toBe("user");
});

test("Check default routes", async () => {
    const routes = userRouter.getRouter().stack;
    const routeLen = routes.length;
    const routeTest = [{ path: "/" }, { path: "/:id" }, { path: "/" },
        { path: "/:id" }, { path: "/:id" }, { path: "/get_email/:email" }];
    for (let i = 0; i < routeLen; i++) {
        expect(routes[i]?.route?.path).toBe(routeTest[i]?.path);
    }
});