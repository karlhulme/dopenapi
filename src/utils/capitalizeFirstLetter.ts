/**
 * Returns the given text string with the first letter capitalised.
 * @param text A text string.
 */
export function capitalizeFirstLetter(text: string) {
  if (text.length > 0) {
    return text[0].toLocaleUpperCase() + text.slice(1);
  } else {
    return text;
  }
}
