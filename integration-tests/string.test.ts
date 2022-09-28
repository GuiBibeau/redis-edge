import { expect, test, describe } from "vitest";
import { RedisEdge } from "../src";
import fetch from "node-fetch";

this.fetch = fetch;

const { VITE_UPSTASH_REDIS_REST_URL, VITE_UPSTASH_REDIS_REST_TOKEN } =
  import.meta.env;

const client = new RedisEdge(
  VITE_UPSTASH_REDIS_REST_URL,
  VITE_UPSTASH_REDIS_REST_TOKEN
);

describe("String", () => {
  test("Set", async () => {
    const { success } = await client.set("foo", "bar");
    const foo = await client.get("foo");
    expect(success).toBeTruthy();
  });

  test("Get", async () => {
    const foo = await client.get("foo");
    expect(foo).toBe("bar");
  });

  test("Del", async () => {
    const { success } = await client.del("foo");
    const foo = await client.get("foo");

    expect(foo).toBeNull();
    expect(success).toBeTruthy();
  });

  test("Append", async () => {
    const key = "foo";
    const initialValue = "bar";
    const appendValue = "baz";
    await client.set(key, initialValue);
    const length = await client.append(key, appendValue);

    expect(length).toBe(initialValue.length + appendValue.length);
    await client.del("foo");
  });
});
