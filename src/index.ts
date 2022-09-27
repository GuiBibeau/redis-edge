import { fetcher } from "./fetch";
import { getErrorMessage } from "./error";

export class RedisEdge {
  private redisUrl: string;
  private bearerToken: string;
  constructor(redisUrl: string, berearToken: string) {
    this.redisUrl = redisUrl;
    this.bearerToken = berearToken;
  }

  async command<T>(...commands: string[]) {
    return fetcher<T>(this.redisUrl, {
      data: commands,
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
      },
    });
  }

  async get(key: string) {
    try {
      const callRes = await this.command<{ result: string }>("GET", key);

      if (callRes.result === "null") {
        return null;
      }

      return callRes.result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async set(key: string, value: string) {
    try {
      const callRes = await this.command<{ result: string }>("SET", key, value);
      if (callRes.result === "OK") {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      const message = getErrorMessage(error);
      return { success: false };
    }
  }

  async del(key: string) {
    try {
      const callRes = await this.command<{ result: number }>("DEL", key);
      if (callRes.result === 1) {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      const message = getErrorMessage(error);
      return { success: false };
    }
  }

  async hgetall(key: string) {
    return this.command("HGETALL", key);
  }
}
