import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Types
import { IRole } from '@types';

export const getRoles = (): {
  data: IRole[] | undefined;
} => {
  const { data } = useSWR<IRole[]>(`${API.BASE}/${API.ROLES}`, fetcher);
  return {
    data
  };
};
