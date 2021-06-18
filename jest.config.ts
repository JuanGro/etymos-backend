import type { Config } from "@jest/types";
import { defaults } from "jest-config";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    transform: { "\\.(ts|tsx)$": "ts-jest" },
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        isolatedModules: true,
      },
    },
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    setupFilesAfterEnv: [
      "./src/config/databaseConnection.ts"
    ]
  };
};
