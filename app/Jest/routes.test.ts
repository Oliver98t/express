import { UserRouter } from '../routes/UserRouter';

let userRouter: UserRouter;

beforeAll(() => {
    console.log("Setting up test routes");
    userRouter = new UserRouter();
});

test('Sets up user router', () => {
    //userRouter.getRouter();
});