import { isAsyncFunction } from "./is-async-function";

const asyncFunction = async (): Promise<void> => {};
const notAsyncFunction = (): void => {};

describe("isAsyncFunction determines whether or not function is async", () => {
  test("async function", () => {
    const isAsync = isAsyncFunction(asyncFunction);
    expect(isAsync).toBe(true);
  });

  test("not async function", () => {
    const isAsync = isAsyncFunction(notAsyncFunction);
    expect(isAsync).toBe(false);
  });
});
