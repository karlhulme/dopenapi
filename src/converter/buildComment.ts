export function buildComment(title?: string, description?: string) {
  if (title && description) {
    return `${description} (${title})`;
  } else {
    return undefined;
  }
}
