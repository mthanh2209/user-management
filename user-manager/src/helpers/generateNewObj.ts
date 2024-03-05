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
    lastVisitedDate: null,
    details: '',
    bgColor: getRandomColor()
  };
};

/**
 * Generates a new role object with default or provided information.
 * @param name - The name of the new role.
 * @returns An object representing a new role with default or initialized values.
 */
export const generateNewRole = (name: string) => {
  return {
    avatar: '',
    name,
    bgColor: getRandomColor()
  };
};
