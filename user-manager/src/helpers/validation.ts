import validator from 'validator';

// Constants
import { VALIDATION_MESSAGE } from '@constants';

/**
 * Validates an email address.
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
 * @param value - The full name to validate.
 * @returns The invalid name error message if the name is empty or whitespace, undefined otherwise.
 */
export const isFullNameValid = (value: string) => {
  if (!value.trim()) {
    return VALIDATION_MESSAGE.INVALID_NAME;
  }
  return '';
};