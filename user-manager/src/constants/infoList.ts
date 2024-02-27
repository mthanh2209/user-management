// Helpers
import { formatDate } from '@helpers/formatDate';

// Interfaces
import { IUser } from '@types';
import { INFO_TYPE } from './types';

/**
 * Generates a list of user information.
 * @param data - The user data used to generate the information list.
 * @returns An array of objects representing user information.
 */
export const INFO_LIST = (data: IUser | null) => {
  if (!data) return [];
  return [
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-email',
      title: 'Email:',
      content: data.email
    },
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-date',
      title: 'Last visited:',
      content:
        data.lastVisitedDate !== null
          ? formatDate(data.lastVisitedDate)
          : 'Unknown'
    }
  ];
};
