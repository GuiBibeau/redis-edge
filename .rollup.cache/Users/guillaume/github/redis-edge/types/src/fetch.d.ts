/**
 * It's a wrapper around the native fetch API that returns a promise
 * @param {string} [pathname] - The URL to fetch.
 * @param options - RequestInit & { data?: any } = {}
 * @returns A function that returns a promise that resolves to a generic type T.
 */
export declare function fetcher<T>(pathname?: string, options?: RequestInit & {
    data?: any;
}): Promise<T>;
