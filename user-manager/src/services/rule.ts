// Constant
import { API } from '@constants';

// Types
import { IRule } from '@types';

// Services
import { useApi } from '@services/user';

export const getRules = (): {
  data: IRule[];
  error: string | null;
} => useApi(`${API.BASE}/${API.RULES}`);
