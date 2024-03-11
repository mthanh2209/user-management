// Constant
import { API } from '@constants';

// Types
import { IRule } from '@types';

// Services
import { IResponse, makeRequest, useApi } from '@services/user';

export const getRules = (): {
  data: IRule[];
  error: string | null;
  mutate: () => Promise<any>;
} => {
  const { data, error, mutate } = useApi(`${API.BASE}/${API.RULES}`);
  return { data, error, mutate };
};

/**
 * Assigns a rule to a user using the provided userId and ruleId.
 * @param userId - The ID of the user to whom the role will be assigned.
 * @param ruleId - The ID of the rule to be assigned to the user.
 * @returns A Promise resolving to an IResponse object.
 */
export const assignRuleToUser = (
  userId: number,
  ruleId: number
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_RULES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      ruleId: ruleId
    })
  });

/**
 * Unassign a rule from a user using the provided userRuleId.
 * @param userRuleId - The ID of the user rule to be unassigned.
 * @returns A Promise resolving to an IResponse object.
 */
export const unAssignRuleFromUser = (
  userRuleId: number | null
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_RULES}/${userRuleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

/**
 * Assigns a rule to a role.
 * @param {number} roleId - The ID of the role.
 * @param {number} ruleId - The ID of the rule to be assigned.
 * @returns {Promise<IResponse>} - A promise that resolves to the response from the server.
 */
export const assignRuleToRole = (
  roleId: number,
  ruleId: number
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.ROLE_RULES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      roleId: roleId,
      ruleId: ruleId
    })
  });

/**
 * Unassigns a rule from a role.
 * @param {number | null} roleRuleId - The ID of the role rule to be unassigned.
 * @returns {Promise<IResponse>} - A promise that resolves to the response from the server.
 */
export const unAssignRuleFromRole = (
  roleRuleId: number | null
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.ROLE_RULES}/${roleRuleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
