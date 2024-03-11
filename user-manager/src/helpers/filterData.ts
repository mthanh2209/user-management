import { IRole, IRoleRule, IRule, IUser, IUserRole, IUserRule } from '@types';

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

/**
 * Filters users associated with a specific rule.
 *
 * @param userRules - The array of user-rule relationships.
 * @param users - The array of user objects.
 * @param ruleId - The ID of the rule to filter by.
 * @returns An array of users associated with the rule.
 */
export const filterUsersOfRule = (
  userRules: IUserRule[],
  users: IUser[],
  ruleId: number
) => {
  const userRuleRelations = userRules.filter(
    (userRule) => userRule.ruleId === ruleId
  );

  const userOfRule = userRuleRelations
    .map((userRule) => users.find((user) => user.id === userRule.userId))
    .filter((user) => user !== undefined);

  return userOfRule;
};

/**
 * Filters roles associated with a specific rule.
 *
 * @param roleRules - The array of role-rule relationships.
 * @param roles - The array of role objects.
 * @param ruleId - The ID of the rule to filter by.
 * @returns An array of roles associated with the rule.
 */
export const filterRolesOfRule = (
  roleRules: IRoleRule[],
  roles: IRole[],
  ruleId: number
) => {
  const roleRulesRelations = roleRules.filter(
    (roleRule) => roleRule.ruleId === ruleId
  );

  const rolesOfRule = roleRulesRelations
    .map((roleRule) => roles.find((role) => role.id === roleRule.roleId))
    .filter((role) => role !== undefined);

  return rolesOfRule;
};

/**
 * Filters users associated with a specific role.
 *
 * @param userRoles - The array of user-role relationships.
 * @param users - The array of user objects.
 * @param roleId - The ID of the role to filter by.
 * @returns An array of users associated with the role.
 */
export const filterUsersOfRole = (
  userRoles: IUserRole[],
  users: IUser[],
  roleId: number
) => {
  const userRoleRelations = userRoles.filter(
    (userRole) => userRole.roleId === roleId
  );

  const userOfRole = userRoleRelations
    .map((userRole) => users.find((user) => user.id === userRole.userId))
    .filter((user) => user !== undefined);

  return userOfRole;
};

/**
 * Filters rules associated with a specific role.
 *
 * @param userRoles - The array of rule-role relationships.
 * @param users - The array of rule objects.
 * @param roleId - The ID of the role to filter by.
 * @returns An array of rules associated with the role.
 */
export const filterRulesOfRole = (
  ruleRoles: IRoleRule[],
  rules: IRule[],
  roleId: number
) => {
  const ruleRoleRelations = ruleRoles.filter(
    (ruleRole) => ruleRole.roleId === roleId
  );

  const ruleOfRole = ruleRoleRelations
    .map((ruleRole) => rules.find((rule) => rule.id === ruleRole.ruleId))
    .filter((rule) => rule !== undefined);

  return ruleOfRole;
};

/**
 * Filters rules associated with a specific user.
 *
 * @param ruleUsers - The array of rule-user relationships.
 * @param rules - The array of rule objects.
 * @param userId - The ID of the user to filter by.
 * @returns An array of rules associated with the user.
 */
export const filterRulesOfUser = (
  ruleUsers: IUserRule[],
  rules: IRule[],
  userId: number
) => {
  const ruleUserRelations = ruleUsers.filter(
    (ruleUser) => ruleUser.userId === userId
  );

  const ruleOfUser = ruleUserRelations
    .map((ruleUser) => rules.find((rule) => rule.id === ruleUser.ruleId))
    .filter((rule) => rule !== undefined);

  return ruleOfUser;
};

/**
 * Filters roles associated with a specific user.
 *
 * @param roleUsers - The array of role-user relationships.
 * @param roles - The array of role objects.
 * @param userId - The ID of the user to filter by.
 * @returns An array of roles associated with the user.
 */
export const filterRolesOfUser = (
  roleUsers: IUserRole[],
  roles: IRole[],
  userId: number
) => {
  const roleUserRelations = roleUsers.filter(
    (roleUser) => roleUser.userId === userId
  );

  const roleOfUser = roleUserRelations
    .map((roleUser) => roles.find((role) => role.id === roleUser.roleId))
    .filter((role) => role !== undefined);

  return roleOfUser;
};
