import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Components
import AssignItem from '@components/Assign/AssignItem';

// Constants
import {
  API,
  INFO_LIST_VIEW_ROLE
} from '@constants';

// Services
import {
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

// Helpers
import {
  filterRoleItemsByRoleId,
  filterUserItemsByUserId,
  findRoleItemId,
  isItemAssignedToRole
} from '@helpers';
import { assignUserToRole, unAssignUserFromRole } from '@services/user';

interface IAssignRoleMember {
  items: ItemAssign[];
  title: string;
}

const AssignRoleMember = ({ items, title }: IAssignRoleMember) => {
  const [userState, setUserState] = useState<ItemAssign[]>(items);

  const { selectedRow, setUserInfoList } = useContext(Context);

  const { data: roleData } = getRoles();
  const { data: ruleData } = getRules();
  const { data: roleUsers } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  // Filters role users based on the user ID.
  const getCorrespondingUserRoles = filterRoleItemsByRoleId(
    roleUsers,
    roleData,
    selectedRow.data.id
  );

  // Filters role rules based on the user ID.
  const getCorrespondingRoleRules = filterUserItemsByUserId(
    roleRules,
    ruleData,
    selectedRow.data.id
  );

  /**
   * Handles the selection of a item.
   * @param id - The ID of the item.
   */
  const handleItemSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isItemAssignedToRole(
      selectedRow.data.id,
      id,
      roleUsers || [],
      'userId'
    );

    // Find the userRoleId
    const userRoleId = findRoleItemId(
      selectedRow.data.id,
      id,
      roleUsers || [],
      'userId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign user)
    const action = isCurrentlyAssigned
      ? () => unAssignUserFromRole(userRoleId)
      : () => assignUserToRole(id, selectedRow.data.id);

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
