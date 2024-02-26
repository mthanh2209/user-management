/**
 * Highlights a specific keyword within a text by wrapping it in a HTML span element.
 * @param text - The text to be searched and highlighted.
 * @param keyword - The keyword to be highlighted within the text.
 * @returns The text with the specified keyword highlighted using HTML markup.
 */
export const highlightKeyword = (
  text: string,
  keyword: string
): string => {
  if (!keyword.trim()) {
    return text;
  }
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};
