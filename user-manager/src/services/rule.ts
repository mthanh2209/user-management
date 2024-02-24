import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Types
import { IRule } from '@types';

export const getRules = (): {
  data: IRule[] | undefined;
} => {
  const { data } = useSWR<IRule[]>(`${API.BASE}/${API.RULES}`, fetcher);
  return {
    data
  };
};
