// Constant
import { API } from '@constants';

// Types
import { IRole, IRoleRule } from '@types';

// Services
import { useApi, useApiData } from '@services/user';

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
