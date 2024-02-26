import { formatDate, getRandomColor } from '@helpers';

/**
 * Generates a new user object with default or provided information.
 * @param fullName - The full name of the new user.
 * @returns An object representing a new user with default or initialized values.
 */
export const generateNewUser = (fullName: string) => {
  return {
    avatar: '',
    fullName,
    email: '',
    isActive: false,
    registeredDate: formatDate(new Date().toString()),
    lastVisitedDate: formatDate(new Date().toString()),
    details: '',
    bgColor: getRandomColor(),
    roles: [],
    rules: []
  };
};
