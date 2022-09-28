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

  // REDIS string methods

  async append(key: string, value: string) {
    try {
      const { result } = await this.command<{ result: number }>(
        "APPEND",
        key,
        value
      );
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async decr(key: string) {
    try {
      const { result } = await this.command<{ result: number }>("DECR", key);
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async decrby(key: string, decrement: number) {
    try {
      const { result } = await this.command<{ result: number }>(
        "DECRBY",
        key,
        String(decrement)
      );
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
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

  async del(key: string) {
    try {
      const callRes = await this.command<{ result: number }>("DEL", key);
      if (callRes.result === 1) {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      return { success: false };
    }
  }

  async getdel(key: string) {
    try {
      const callRes = await this.command<{ result: string }>("GETDEL", key);
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

  //   async getex() {
  //     // to implement
  //   }

  //   async getrange() {
  //     // to implement
  //   }

  //   async getset() {
  //     // to implement
  //   }

  async incr(key: string) {
    try {
      const { result } = await this.command<{ result: number }>("INCR", key);
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async incrby(key: string, increment: number) {
    try {
      const { result } = await this.command<{ result: number }>(
        "INCRBY",
        key,
        String(increment)
      );
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async incrbyfloat(key: string, increment: number) {
    try {
      const { result } = await this.command<{ result: number }>(
        "INCRBYFLOAT",
        key,
        String(increment)
      );
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      throw error;
    }
  }

  async mget(...keys: string[]) {
    // to implement
  }

  async mset(...keys: string[]) {
    // to implement
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
      console.error(message);
      return { success: false };
    }
  }

  async setex(key: string, value: string, seconds: number) {
    try {
      const callRes = await this.command<{ result: string }>(
        "SETEX",
        key,
        String(seconds),
        value
      );
      if (callRes.result === "OK") {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      return { success: false };
    }
  }

  async setnx(key: string, value: string) {
    try {
      const callRes = await this.command<{ result: number }>(
        "SETNX",
        key,
        value
      );
      if (callRes.result === 1) {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message);
      return { success: false };
    }
  }
}
