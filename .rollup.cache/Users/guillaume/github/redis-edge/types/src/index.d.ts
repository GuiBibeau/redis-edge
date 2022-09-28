export declare class RedisEdge {
    private redisUrl;
    private bearerToken;
    constructor(redisUrl: string, berearToken: string);
    command<T>(...commands: string[]): Promise<T>;
    append(key: string, value: string): Promise<number>;
    decr(key: string): Promise<number>;
    decrby(key: string, decrement: number): Promise<number>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<{
        success: boolean;
    }>;
    getdel(key: string): Promise<string | null>;
    incr(key: string): Promise<number>;
    incrby(key: string, increment: number): Promise<number>;
    incrbyfloat(key: string, increment: number): Promise<number>;
    mget(...keys: string[]): Promise<void>;
    mset(...keys: string[]): Promise<void>;
    set(key: string, value: string): Promise<{
        success: boolean;
    }>;
    setex(key: string, value: string, seconds: number): Promise<{
        success: boolean;
    }>;
    setnx(key: string, value: string): Promise<{
        success: boolean;
    }>;
}
