import {
  IRole,
  IRoleRule,
  IRule,
  IUser,
  IUserRole,
  IUserRule
} from '@types';

/**
 * Checks if an item is assigned to a user.
 *
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item.
 * @param userItems - The array of user items.
 * @param key - The key to match against the item ID.
 * @returns True if the item is assigned to the user, otherwise false.
 */
export const isItemAssignedToUser = (
  userId: number,
  itemId: number,
  userItems: any[],
  key: string
) => userItems?.some((item) => item.userId === userId && item[key] === itemId);

/**
 * Checks if an item is assigned to a role.
 *
 * @param {number} roleId - The ID of the role.
 * @param {number} itemId - The ID of the item.
 * @param {any[]} roleItems - The array of role items.
 * @param {string} key - The key to match against the item ID.
 * @returns {boolean} - True if the item is assigned to the role, otherwise false.
 */
export const isItemAssignedToRole = (
  roleId: number,
  itemId: number,
  roleItems: any[],
  key: string
) => roleItems?.some((item) => item.roleId === roleId && item[key] === itemId);

/**
 * Finds the ID of a user item.
 *
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item.
 * @param userItems - The array of user items.
 * @returns The ID of the user item, or null if not found.
 */
export const findUserItemId = (
  userId: number,
  itemId: number,
  userItems: any[],
  key: string
) => {
  const userItem = userItems.find(
    (item) => item.userId === userId && item[key] === itemId
  );

  return userItem ? userItem.id : null;
};

/**
 * Finds the ID of a role item.
 *
 * @param {number} roleId - The ID of the role.
 * @param {number} itemId - The ID of the item.
 * @param {any[]} roleItems - The array of role items.
 * @param {string} key - The key to match against the item ID.
 * @returns {number | null} - The ID of the role item, or null if not found.
 */
export const findRoleItemId = (
  roleId: number,
  itemId: number,
  roleItems: any[],
  key: string
) => {
  const roleItem = roleItems.find(
    (item) => item.roleId === roleId && item[key] === itemId
  );

  return roleItem ? roleItem.id : null;
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

/**
 * Retrieves user rules for a specific user.
 *
 * @param userRules - An array of user rules.
 * @param userId - The ID of the user.
 * @returns An array of user rules associated with the specified user.
 */
export const getUserRulesForUser = (
  userRules: IUserRule[] | undefined,
  userId: number
) => userRules?.filter((userRule) => userRule.userId === userId);

/**
 * Retrieves user roles for a specific user.

 * @param userRoles - An array of user roles.
 * @param userId - The ID of the user.
 * @returns An array of user roles associated with the specified user.
 */
export const getUserRolesForUser = (
  userRoles: IUserRole[] | undefined,
  userId: number
) => userRoles?.filter((userRole) => userRole.userId === userId);

/**
 * Retrieves role rules for a specific role.
 * 
 * @param roleRules - An array of role rules.
 * @param roleId - The ID of the role.
 * @returns An array of role rules associated with the specified role.
 */
export const getRoleRulesForRole = (
  roleRules: IRoleRule[] | undefined,
  roleId: number
) => roleRules?.filter((roleRule) => roleRule.roleId === roleId);
