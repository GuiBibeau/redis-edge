/**
 * It's a wrapper around the native fetch API that returns a promise
 * @param {string} [pathname] - The URL to fetch.
 * @param options - RequestInit & { data?: any } = {}
 * @returns A function that returns a promise that resolves to a generic type T.
 */
export async function fetcher<T>(
  pathname: string = "",
  options: RequestInit & { data?: any } = {}
) {
  const res = await fetch(pathname, {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
    ...(options.data ? { body: JSON.stringify(options.data) } : {}),
  });
  const data = await res.json();
  return data as T;
}
