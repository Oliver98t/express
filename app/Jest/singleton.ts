import type { PrismaClient } from "../generated/prisma/client";
import { beforeEach, jest } from "@jest/globals";
import { mockDeep, mockReset } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();
jest.mock("../database/Connection", () => ({
    __esModule: true,
    prisma: prismaMock,
    getDB: () => prismaMock,
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export { prismaMock };