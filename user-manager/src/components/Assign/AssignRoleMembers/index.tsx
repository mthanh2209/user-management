import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Components
import AssignItem from '@components/Assign/AssignItem';

// Constants
import {
  API,
  INFO_LIST_VIEW_ROLE,
} from '@constants';

// Services
import {
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

// Helpers
import {
  filterRoleItemsByRoleId,
  filterUserItemsByUserId,
  findUserItemId,
  isItemAssignedToUser
} from '@helpers';
import { assignUserToRole, unAssignUserFromRole } from '@services/user';

interface IAssignRole {
  items: ItemAssign[];
  title: string;
}

const AssignRoleMember = ({ items, title }: IAssignRole) => {
  const [userState, setUserState] = useState<ItemAssign[]>(items);

  const { selectedRow, setUserInfoList } = useContext(Context);

  const { data: roleData } = getRoles();
  const { data: ruleData } = getRules();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  const userId = selectedRow.data?.id || 0;

  // Filters role users based on the user ID.
  const getCorrespondingUserRoles = filterUserItemsByUserId(
    userRoles,
    roleData,
    userId
  );

  // Filters role rules based on the user ID.
  const getCorrespondingRoleRules = filterRoleItemsByRoleId(
    roleRules,
    ruleData,
    userId
  );

  /**
   * Handles the selection of a item.
   * @param id - The ID of the item.
   */
  const handleItemSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isItemAssignedToUser(
      userId,
      id,
      userRoles || [],
      'userId'
    );

    // Find the userRoleId
    const userRoleId = findUserItemId(
      userId,
      id,
      userRoles || [],
      'userId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign user)
    const action = isCurrentlyAssigned
      ? () => unAssignUserFromRole(userRoleId)
      : () => assignUserToRole(id, userId);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_ROLES}`);

    // Create a new array with the updated assigned state for the selected role
    const newUsers = userState.map((user) => {
      if (user.id === id) {
        return { ...user, isAssigned: !isCurrentlyAssigned };
      }
      return user;
    });

    // Update the state of the list user
    setUserState(newUsers);

    // Update the display data list
    setUserInfoList([
      ...INFO_LIST_VIEW_ROLE(
        getCorrespondingRoleRules,
        getCorrespondingUserRoles
      )
    ]);
  };

  return (
    <AssignItem
      items={items}
      title={title}
      optionName='roleMembers'
      handleItemSelect={handleItemSelect}
    />
  );
};

export default AssignRoleMember;
