// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: "html",

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "on",
  },
});
