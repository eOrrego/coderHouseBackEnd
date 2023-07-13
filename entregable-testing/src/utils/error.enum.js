export const ErrorName = {
    NOT_FOUND: "NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    CONFLICT: "CONFLICT",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    BAD_GATEWAY: "BAD_GATEWAY",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
    NETWORK_AUTHENTICATION_REQUIRED: "NETWORK_AUTHENTICATION_REQUIRED",
    CUSTOM_ERROR: "CUSTOM_ERROR",
};

export const ErrorMessage = {
    NOT_FOUND: "Not Found",
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    BAD_GATEWAY: "Bad Gateway",
    SERVICE_UNAVAILABLE: "Service Unavailable",
    GATEWAY_TIMEOUT: "Gateway Timeout",
    NETWORK_AUTHENTICATION_REQUIRED: "Network Authentication Required",
    CUSTOM_ERROR: "Custom Error",
};

export const ErrorCause = {
    NOT_FOUND: "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.",
    BAD_REQUEST: "The server cannot or will not process the request due to an apparent client error.",
    UNAUTHORIZED: "The request has not been applied because it lacks valid authentication credentials for the target resource.",
    FORBIDDEN: "The server understood the request but refuses to authorize it.",
    CONFLICT: "The request could not be completed due to a conflict with the current state of the target resource.",
    INTERNAL_SERVER_ERROR: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
    BAD_GATEWAY: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    SERVICE_UNAVAILABLE: "The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.",
    GATEWAY_TIMEOUT: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
    NETWORK_AUTHENTICATION_REQUIRED: "The client needs to authenticate to gain network access.",
    CUSTOM_ERROR: "Custom Error",
};