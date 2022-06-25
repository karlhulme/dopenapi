/**
 * Builds a comment based on the given title and description.
 * @param title The title associated with the schema.
 * @param description The description associated with the schema.
 */
export function buildComment(title?: string, description?: string) {
  if (title && description) {
    return `${description} (${title})`;
  } else if (title) {
    return title;
  } else if (description) {
    return description;
  } else {
    return undefined;
  }
}
