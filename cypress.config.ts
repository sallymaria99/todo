import { defineConfig } from "cypress";
import { reseed } from "./cypress/task/reseed";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100",
    setupNodeEvents(on, config) {
      on("task", {
        reseed: reseed,
      });
    },
  },
});
