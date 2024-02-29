// Helpers
import { formatDate } from '@helpers/formatDate';

// Interfaces
import { IRule, IUser, } from '@types';

// Constants
import { INFO_TYPE } from '@constants';

/**
 * Generates a list of user information.
 * @param data - The user data used to generate the information list.
 * @returns An array of objects representing user information.
 */
export const INFO_TEXT_VIEW = (data: IUser) => [
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

export const INFO_LIST_VIEW_ROLE = (
  users: IUser[],
  userRules: IRule[]
) => {
  return [
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-rule',
          title: `Rules assigned (${userRules.length})`,
          content: userRules.map((rule) => ({
            text: rule?.name,
            link: '/'
          }))
        },
        {
          icon: 'icon-user',
          title: `Members assigned (${users.length})`,
          content: users.map((user) => ({
            text: user?.fullName,
            link: '/'
          }))
        }
      ]
    }
  ];
};
