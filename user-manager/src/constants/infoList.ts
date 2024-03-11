// Helpers
import { formatDate } from '@helpers/formatDate';

// Interfaces
import {
  IRole,
  IRule,
  IUser
} from '@types';

// Constants
import { INFO_TYPE } from '@constants';

/**
 * Generates a list of user information.
 *
 * @param {IUser} users - The user data used to generate the information list.
 * @param {IRole[]} roles - The roles associated with the user.
 * @returns {Array<Object>} An array of objects representing user information.
 */
export const INFO_LIST_VIEW_USER = (
  users: IUser | null,
  roles: IRole[],
  rules: IRule[]
) => {
  if (!users) {
    return [];
  }

  return [
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-email',
      title: 'Email:',
      content: users.email
    },
    {
      type: INFO_TYPE.TEXT_VIEW,
      icon: 'icon-date',
      title: 'Last visited:',
      content:
        users.lastVisitedDate !== null
          ? formatDate(users.lastVisitedDate)
          : 'Unknown'
    },
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-role',
          title: `Roles (${roles.length})`,
          content: roles.map((role) => ({
            text: role?.name,
            onClick: () => {}
          }))
        },
        {
          icon: 'icon-rule',
          title: `Rules (${rules.length})`,
          content: rules.map((rule) => ({
            text: rule?.name,
            onClick: () => {}
          }))
        }
      ]
    }
  ];
};

/**
 * Generates a list of information for a role.
 *
 * @param {IUser[]} users - The users associated with the role.
 * @param {IRule[]} userRules - The rules assigned to the role.
 * @returns {Array<Object>} An array of objects representing role information.
 */
export const INFO_LIST_VIEW_ROLE = (rules: IRule[], users: IUser[]) => {
  return [
    {
      type: INFO_TYPE.LIST_VIEW,
      content: [
        {
          icon: 'icon-rule',
          title: `Rules assigned (${rules.length})`,
          content: rules.map((rule) => ({
            text: rule?.name,
            onClick: () => {}
          }))
        },
        {
          icon: 'icon-user',
          title: `Members assigned (${users.length})`,
          content: users.map((user) => ({
            text: user?.fullName,
            onClick: () => {}
          }))
        }
      ]
    }
  ];
};

