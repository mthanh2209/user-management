// Constant
import { API } from '@constants';

// Types
import { IRule } from '@types';

// Services
import {
  IResponse,
  makeRequest,
  useApi 
} from '@services/user';

export const getRules = (): {
  data: IRule[];
  error: string | null;
} => useApi(`${API.BASE}/${API.RULES}`);

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
