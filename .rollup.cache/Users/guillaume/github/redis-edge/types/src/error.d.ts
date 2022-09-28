declare type ErrorWithMessage = {
    message: string;
};
export declare function toErrorWithMessage(maybeError: unknown): ErrorWithMessage;
export declare function getErrorMessage(error: unknown): string;
export {};
