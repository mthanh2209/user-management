import {
  IRole,
  IRoleRule,
  IRule,
  IUser,
  IUserRole,
  IUserRule
} from '@types';

/**
 * Filter items based on search keyword.
 * @template T - The type of items being filtered.
 * @param {T[] | undefined} items - The array of items to filter.
 * @param {string} searchKeyword - The keyword to search for.
 * @returns {T[]} - The filtered array of items.
 */
export const filterItem = <
  T extends {
    name?: string;
    fullName?: string;
    email?: string;
    description?: string;
  }
>(
  items: T[] | undefined,
  searchKeyword: string
): T[] => {
  if (!items) {
    return []; // Return an empty array if items is undefined
  }

  return items.filter((item) => {
    const lowercaseKeyword = searchKeyword.toLowerCase();
    return (
      (item.fullName &&
        item.fullName.toLowerCase().includes(lowercaseKeyword)) ||
      (item.email && item.email.toLowerCase().includes(lowercaseKeyword)) ||
      (item.name && item.name.toLowerCase().includes(lowercaseKeyword)) ||
      (item.description &&
        item.description.toLowerCase().includes(lowercaseKeyword))
    );
  });
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
