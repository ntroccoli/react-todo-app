// Vitest + RTL test setup
// Extend expect with jest-dom matchers
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup and reset state between tests
afterEach(() => {
  cleanup();
  localStorage.clear();
});
