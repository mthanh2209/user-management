// Constant
import { API } from '@constants';

// Types
import { IRole } from '@types';

// Services
import { useApi } from '@services/user';

export const getRoles = (): {
  data: IRole[];
  isValidating: boolean;
} => useApi(`${API.BASE}/${API.ROLES}`);
