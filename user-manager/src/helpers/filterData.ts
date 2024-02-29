import { IRole, IUser } from '@types';

/**
 * Filters an array of user objects based on a search keyword.
 * @param users - The array of user objects to filter.
 * @param searchKeyword - The keyword used for filtering users.
 * @returns An array of user objects that match the search criteria.
 */
export const filterUsers = (
  users: IUser[] | undefined, // Add a type for the users parameter
  searchKeyword: string
): IUser[] => {
  if (!users) {
    return []; // Return an empty array if users is undefined
  }

  return users.filter((user: IUser) => {
    return (
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
};

/**
 * Filters an array of role objects based on a search keyword.
 * @param roles - The array of role objects to filter.
 * @param searchKeyword - The keyword used for filtering roles.
 * @returns An array of role objects that match the search criteria.
 */
export const filterRoles = (
  roles: IRole[] | undefined, // Add a type for the roles parameter
  searchKeyword: string
): IRole[] => {
  if (!roles) {
    return []; // Return an empty array if roles is undefined
  }

  return roles.filter((role: IRole) => {
    return role.name.toLowerCase().includes(searchKeyword.toLowerCase());
  });
};