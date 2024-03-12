import { useContext, useState } from 'react';

// Components
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { SingleOptionTypes, TOAST_TYPE } from '@constants';

// Services
import {
  assignRoleToUser,
  getUserRoles,
  unAssignRoleFromUser
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

// Helpers
import { findUserItemId, isItemAssignedToUser } from '@helpers';

interface IAssignRole {
  items: ItemAssign[];
  title: string;
}

const AssignUserRoles = ({ items, title }: IAssignRole) => {
  const [roleState, setRoleState] = useState<ItemAssign[]>(items);

  const { dispatch, selectedRow } = useContext(Context);

  const { data: userRoles, mutate: mutateUserRoles } = getUserRoles();

  /**
   * Handles the selection of a role.
   * @param id - The ID of the role.
   */
  const handleRoleSelect = (id: number) => async () => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    const isCurrentlyAssigned = isItemAssignedToUser(
      selectedRow.data.id,
      id,
      userRoles || [],
      'roleId'
    );

    // Find the userRoleId
    const userRoleId = findUserItemId(
      selectedRow.data.id,
      id,
      userRoles || [],
      'roleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRoleFromUser(userRoleId)
      : () => assignRoleToUser(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      dispatch({ type: TOAST_TYPE.ERROR });
      return;
    }

    // Update the data in the cache or on the server
    mutateUserRoles();

    // Create a new array with the updated assigned state for the selected role
    const newRoles = roleState.map((role) => {
      if (role.id === id) {
        return { ...role, isAssigned: !isCurrentlyAssigned };
      }
      return role;
    });

    // Update the state of the list rule
    setRoleState(newRoles);

    dispatch({ type: TOAST_TYPE.SUCCESS });
  };

  return (
    <AssignItem
      items={items}
      title={title}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName='role'
      handleItemSelect={handleRoleSelect}
    />
  );
};

export default AssignUserRoles;
