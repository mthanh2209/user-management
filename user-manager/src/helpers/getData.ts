// Types
import {
  IRole,
  IRule,
  IUserRole,
  IUserRule,
  IRoleRule,
  IUser
} from '@types';

/**
 * Retrieves user roles and rules based on the provided user ID.
 *
 * @param {number} userId - The ID of the user for whom roles and rules are to be retrieved.
 * @param {IRole[]} roles - An array of all available roles.
 * @param {IUserRole[]} userRoles - An array of user-role relationships.
 */
export const getUserRolesAndRules = (
  userId: number,
  roles: IRole[],
  rules: IRule[],
  userRoles: IUserRole[],
  userRules: IUserRule[]
) => {
  let userRuleRelations: IUserRule[] = [];

  // Get the userRoles for the specified user
  const userRoleRelations = userRoles?.filter((item) => item.userId === userId);

  // Get roles for user based on userRolesRelations
  const userRolesItem = userRoleRelations?.map((item) =>
    roles.find((role) => role.id === item.roleId)
  );

  // Get roleRules for roles of user
  if (Array.isArray(userRules)) {
    userRuleRelations = userRules?.filter((item) => item.userId === userId);
  }

  // Get rules for user based on userRoleRuleRelations
  const userRulesItem =
    Array.isArray(rules) &&
    userRuleRelations?.map((item) =>
      rules.find((rule) => rule.id === item.ruleId)
    );

  return { userRolesItem, userRulesItem };
};

/**
 * Retrieves role rules based on the provided role ID.
 *
 * @param {number} roleId - The ID of the role for which rules are to be retrieved.
 * @param {IRule[]} rules - An array of all available rules.
 * @param {IRoleRule[]} roleRules - An array of role-rule relationships.
 * @returns {Object} - An object containing role rules.
 */
export const getRoleRulesAndUsers = (
  roleId: number,
  rules: IRule[],
  users: IUser[],
  roleRules: IRoleRule[],
  roleUsers: IUserRole[]
) => {
  let roleRuleRelations: IRoleRule[] = [];

  const roleUserRelations = roleUsers?.filter((item) => item.roleId === roleId);

  const roleUsersItem = roleUserRelations?.map((item) =>
    users.find((user) => user.id === item.userId)
  );

  if (Array.isArray(roleRules)) {
    roleRuleRelations = roleRules?.filter((item) => item.roleId === roleId);
  }

  const roleRulesItem =
    Array.isArray(rules) &&
    roleRuleRelations?.map((item) =>
      rules.find((rule) => rule.id === item.ruleId)
    );

  return { roleRulesItem, roleUsersItem };
};
