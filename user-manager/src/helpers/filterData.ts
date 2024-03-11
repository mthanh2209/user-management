import { IRole, IRule, IUser } from '@types';

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

/**
 * Filters an array of rule objects based on a search keyword.
 * @param rules - The array of rule objects to filter.
 * @param searchKeyword - The keyword used for filtering rules.
 * @returns An array of rule objects that match the search criteria.
 */
export const filterRules = (
  rules: IRule[] | undefined, // Add a type for the rules parameter
  searchKeyword: string
): IRule[] => {
  if (!rules) {
    return []; // Return an empty array if rules is undefined
  }

  return rules.filter((rule: IRule) => {
    return (
      rule.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
};

/**
 * Filters user items based on the user ID.
 * @param userItems - The array of user items.
 * @param itemData - The data of the items.
 * @param userId - The ID of the user to filter by.
 * @returns An array of filtered user items.
 */
export const filterUserItemsByUserId = (
  userItems: any,
  itemData: any,
  userId: number
) => {
  return Array.isArray(userItems)
    ? userItems
        ?.filter((userItem) => userItem.userId === userId)
        .map((userItem) =>
          itemData?.find((item: any) => item.id === userItem.itemId)
        )
    : [];
};

/**
 * Filters an array of role objects based on a search keyword.
 * @param {IRole[] | undefined} roles - The array of role objects to filter.
 * @param {string} searchKeyword - The keyword used for filtering roles.
 * @returns {IRole[]} - An array of role objects that match the search criteria.
 */
export const filterRoleItemsByRoleId = (
  roleItems: any,
  itemData: any,
  roleId: number
) => {
  return Array.isArray(roleItems)
    ? roleItems
        ?.filter((roleItem) => roleItem.roleId === roleId)
        .map((roleItem) =>
          itemData?.find((item: any) => item.id === roleItem.itemId)
        )
    : [];
};
