import validator from "validator";

// Constants
import { VALIDATION_MESSAGE } from "@constants";

/**
 * Capitalizes the first letter of a string.
 *
 * @param type - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export const capitalizeLetter = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Highlights a specific keyword within a text by wrapping it in a HTML span element.
 *
 * @param text - The text to be searched and highlighted.
 * @param keyword - The keyword to be highlighted within the text.
 * @returns The text with the specified keyword highlighted using HTML markup.
 */
export const highlightKeyword = (text: string, keyword: string): string => {
  if (!keyword.trim()) {
    return text;
  }

  const regex = new RegExp(`(${keyword})`, 'gi');

  return text.replace(regex, '<span class="highlight">$1</span>');
};

/**
 * Validates an email address.
 *
 * @param value - The email address to validate.
 * @returns A validation error message if the email is invalid, undefined otherwise.
 */
export const isEmailValid = (value: string) => {
  if (!value) {
    return VALIDATION_MESSAGE.EMAIL_REQUIRED;
  }
  if (!validator.isEmail(value)) {
    return VALIDATION_MESSAGE.INVALID_EMAIL;
  }
  return '';
};

/**
 * Validates a full name.
 *
 * @param value - The full name to validate.
 * @returns The invalid name error message if the name is empty or whitespace, undefined otherwise.
 */
export const isFullNameValid = (value: string) => {
  if (!value.trim()) {
    return VALIDATION_MESSAGE.INVALID_NAME;
  }
  return '';
};

/**
 * Generates a random hexadecimal color code.
 *
 * @returns A random hexadecimal color code (e.g., '#RRGGBB').
 */
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
