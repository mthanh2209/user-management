import { useState } from 'react';
import { mutate } from 'swr';

// Components
import AssignItem from '@components/DataDisplay/Assign/AssignItem';

// Constants
import {
  API,
  INFO_LIST_VIEW_USER,
  SingleOptionTypes
} from '@constants';

// Services
import {
  assignRoleToUser,
  getRoles,
  getUserRoles,
  unAssignRoleFromUser
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

// Helpers
import {
  filterUserItemsByUserId,
  findUserItemId,
  isItemAssignedToUser 
} from '@helpers';

interface IAssignRole {
  roles: ItemAssign[];
  title: string;
}

const AssignRole = ({ roles, title }: IAssignRole) => {
  const [roleState, setRoleState] = useState<ItemAssign[]>(roles);

  const { selectedRow, setUserInfoList } = Context();

  const { data: roleData } = getRoles();
  const { data: userRoles } = getUserRoles();

  /**
   * Checks if a role is assigned to a user.
   * @param userId - The ID of the user.
   * @param roleId - The ID of the role.
   * @returns True if the role is assigned to the user, otherwise false.
   */
  const isRoleAssignedToUser = (userId: number, roleId: number) =>
    isItemAssignedToUser(userId, roleId, userRoles || [], 'roleId');

  /**
   * Finds the ID of a user role.
   * @param userId - The ID of the user.
   * @param roleId - The ID of the role.
   * @returns The ID of the user role, or null if not found.
   */
  const findUserRoleId = (userId: number, roleId: number) =>
    findUserItemId(userId, roleId, userRoles || []);

  const userId = selectedRow.data?.id || 0;

  const getCorrespondingUserRoles = filterUserItemsByUserId(
    userRoles,
    roleData,
    userId
  );

  /**
   * Handles the selection of a role.
   * @param id - The ID of the role.
   */
  const handleRoleSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isRoleAssignedToUser(
      selectedRow.data?.id || 0,
      id
    );

    // Find the userRoleId
    const userRoleId = findUserRoleId(selectedRow.data?.id || 0, id);

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRoleFromUser(userRoleId)
      : () => assignRoleToUser(selectedRow.data?.id || 0, id);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_ROLES}`);

    // Create a new array with the updated assigned state for the selected role
    const newRoles = roleState.map((role) => {
      if (role.id === id) {
        return { ...role, isAssigned: !isCurrentlyAssigned };
      }
      return role;
    });

    // Update the state of the list rule
    setRoleState(newRoles);

    // Update the display data list
    setUserInfoList([
      ...INFO_LIST_VIEW_USER(selectedRow.data, getCorrespondingUserRoles)
    ]);
  };

  return (
    <AssignItem
      items={roles}
      title={title}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName='role'
      handleItemSelect={handleRoleSelect}
    />
  );
};

export default AssignRole;
