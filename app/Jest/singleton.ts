import { PrismaClient } from "../generated/prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();
jest.mock("../database/Connection", () => ({
    __esModule: true,
    default: prismaMock,
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export { prismaMock };