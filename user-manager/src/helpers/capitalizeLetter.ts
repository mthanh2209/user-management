/**
 * Capitalizes the first letter of a string.
 * @param type - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export const capitalizeLetter = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};
