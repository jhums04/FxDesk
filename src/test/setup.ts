import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./server";

// Fail loudly if a test hits a URL we have not mocked, so no real network calls leak through.
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
// Undo any per-test server.use() overrides so tests stay independent.
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
