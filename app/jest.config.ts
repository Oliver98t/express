import { createDefaultEsmPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultEsmPreset().transform;

export default {
  clearMocks: true,
  projects: [
    {
      displayName: "unit",
      preset: "ts-jest/presets/default-esm",
      testEnvironment: "node",
      testMatch: ["<rootDir>/Jest/unit_tests/**/*.test.ts"],
      setupFilesAfterEnv: ["<rootDir>/Jest/singleton.ts"],
      extensionsToTreatAsEsm: [".ts"],
      transform: {
        ...tsJestTransformCfg,
      },
    },
    {
      displayName: "integration",
      preset: "ts-jest/presets/default-esm",
      testEnvironment: "node",
      testMatch: ["<rootDir>/Jest/integration_tests/**/*.test.ts"],
      extensionsToTreatAsEsm: [".ts"],
      transform: {
        ...tsJestTransformCfg,
      },
    },
  ],
};