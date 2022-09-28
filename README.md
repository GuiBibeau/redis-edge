# Redis Edge

[![Build Size](https://img.shields.io/bundlephobia/minzip/redis-edge?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=redis-edge)
[![Version](https://img.shields.io/npm/v/redis-edge?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/redis-edge)
[![Downloads](https://img.shields.io/npm/dt/redis-edge.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/redis-edge)

Redis Edge is a tiny Redis client compatible with Edge Functions. It wraps over the [Upstash Redis API](https://docs.upstash.com/redis/features/restapi) to facilitate the usage of Redis in Edge Functions.

## Usage

Install using a package manager.

```bash
npm install redis-edge
# or
yarn add redis-edge
# or
pnpm add redis-edge
```

In the Upstash console, grab your `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_KEY`:

![Upstash Redis REST API](https://github.com/GuiBibeau/redis-edge/blob/main/assets/upstash.png)

Then, in your Edge Function, import the client and use it:

```js
import { RedisEdge } from "redis-edge";

const redis = new RedisEdge("<your redis rest url>", "<your redis rest key>");
```

## Run any Redis command

It is possible to send all supported Redis commands to the server by using the `redis.command()` method. The first argument is the name of the command, and the rest are the arguments to the command.

```js
redis.command("SET", key, value);
redis.command("GET", key);
redis.command("HSET", key, field1, value1, field2, value2);
```

Any arbitrary amount of arguments can be passed to the command. The return value is a promise that resolves to the result of the command.

## Common Redis commmands

Common commands are wrapped in the client for convenience. The following commands are supported:

- `redis.append(key, value)`
- `redis.decr(key)`
- `redis.decrby(key, decrement)`
- `redis.get(key)`
- `redis.del(key)`
- `redis.getdel(key)`
- `redis.incr(key)`
- `redis.incrby(key, increment)`
- `redis.incrbyfloat(key, increment)`
- `redis.set(key, value)`
- `redis.setex(key, seconds, value)`
- `redis.setnx(key, value)`

More commands will be added in the future but you can always use `redis.command()` to run any Redis command not available.
