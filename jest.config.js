module.exports = {
  preset: "@microsoft/spfx-heft-plugins/jest-preset",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.module\\.scss$": "identity-obj-proxy",
  },
  testMatch: ["**/*.test.{ts,tsx}"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};
