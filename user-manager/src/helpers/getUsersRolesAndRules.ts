// Types
import {
  IRole,
  IRule,
  IUserRole,
  IUserRule
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
