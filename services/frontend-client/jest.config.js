const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  testEnvironment: "jsdom",
};

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig(config);
