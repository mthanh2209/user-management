import {
  IRole,
  IUserRole
} from '@types';

/**
 * Retrieves user roles and rules based on the provided user ID.
 *
 * @param {number} userId - The ID of the user for whom roles and rules are to be retrieved.
 * @param {IRole[]} roles - An array of all available roles.
 * @param {IUserRole[]} userRoles - An array of user-role relationships.
 */
export const getUsersAndRoles = (
  userId: number,
  roles: IRole[],
  userRoles: IUserRole[]
) => {
  // Get the userRoles for the specified user
  const userRoleRelations = userRoles?.filter((item) => item.userId === userId);

  // Get roles for user based on userRolesRelations
  const userRolesItem = userRoleRelations?.map((item) =>
    roles.find((role) => role.id === item.roleId)
  );

  return { userRolesItem };
};
