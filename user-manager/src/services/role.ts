// Constant
import { API } from '@constants';

// Types
import { IRole, IRoleRule } from '@types';

// Services
import { IResponse, makeRequest, useApi, useApiData } from '@services/user';

// Helpers
import { generateNewRole } from '@helpers';

export const getRoles = (): {
  data: IRole[];
  error: string | null;
  mutate: () => Promise<any>;
} => {
  const { data, error, mutate } = useApi(`${API.BASE}/${API.ROLES}`);
  return { data, error, mutate };
};

/**
 * Adds a new role.
 * @param roleData - The role data to be added.
 * @returns A promise that resolves to the response object.
 */
export const addRole = (roleName: string): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.ROLES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(generateNewRole(roleName))
  });

/**
 * Deletes a role.
 * @param roleId - The ID of the role to be deleted.
 * @returns A promise that resolves to the response object.
 */
export const deleteRole = (roleId: number): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.ROLES}/${roleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

/**
 * Edits a role.
 * @param roleData - The updated role data.
 * @returns A promise that resolves to the response object.
 */
export const editRole = (roleData: IRole): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.ROLES}/${roleData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(roleData)
  });

/**
 * Fetches a list of role rules.
 * @returns An object containing the list of role rules.
 */
export const getRoleRules = (): {
  data: IRoleRule[];
  mutate: () => Promise<any>;
} => {
  const { data, mutate } = useApiData(`${API.BASE}/${API.ROLE_RULES}`);
  return { data, mutate };
};

/**
 * Assigns a role to a user using the provided userId and roleId.
 * @param userId - The ID of the user to whom the role will be assigned.
 * @param roleId - The ID of the role to be assigned to the user.
 * @returns A Promise resolving to an IResponse object.
 */
export const assignRoleToUser = (
  userId: number,
  roleId: number
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_ROLES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      roleId: roleId
    })
  });

/**
 * Unassign a role from a user using the provided userRoleId.
 * @param userRoleId - The ID of the user role to be unassigned.
 * @returns A Promise resolving to an IResponse object.
 */
export const unAssignRoleFromUser = (
  userRoleId: number | null
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_ROLES}/${userRoleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
