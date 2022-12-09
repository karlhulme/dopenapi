/**
 * The list of headers that are provided by the browser
 * and should not be provided manually.
 */
export const requestHeadersToIgnore = [
  "user-agent",
];

/**
 * The list of headers that are processed by the browser
 * and should not be parsed manually.
 */
export const responseHeadersToIgnore = [
  "set-cookie",
];
