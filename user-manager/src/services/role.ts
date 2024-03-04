// Constant
import { API } from '@constants';

// Types
import { IRole, IRoleRule } from '@types';

// Services
import {
  IResponse,
  makeRequest,
  useApi,
  useApiData
} from '@services/user';

export const getRoles = (): {
  data: IRole[];
  error: string | null;
} => useApi(`${API.BASE}/${API.ROLES}`);

/**
 * Fetches a list of role rules.
 * @returns An object containing the list of role rules.
 */
export const getRoleRules = (): { data: IRoleRule[] } =>
  useApiData(`${API.BASE}/${API.ROLE_RULES}`);

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
