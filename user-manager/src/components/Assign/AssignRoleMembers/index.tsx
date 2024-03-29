import { useContext, useState } from 'react';

// Components
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { SingleOptionTypes, TYPES } from '@constants';

// Services
import {
  getUserRoles,
  assignUserToRole,
  unAssignUserFromRole
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

// Helpers
import { findRoleItemId, isItemAssignedToRole } from '@helpers/array';

interface IAssignRoleMember {
  items: ItemAssign[];
  title: string;
}

const AssignRoleMember = ({ items, title }: IAssignRoleMember) => {
  const [userState, setUserState] = useState<ItemAssign[]>(items);

  const { state, dispatch } = useContext(Context);
  const { selectedRow } = state;

  const { data: roleUsers, mutate: mutateRoleMembers } = getUserRoles();

  /**
   * Handles the selection of a item.
   * @param id - The ID of the item.
   */
  const handleItemSelect = (id: number) => async () => {
    dispatch({ type: TYPES.PROCESSING });

    const isCurrentlyAssigned = isItemAssignedToRole(
      selectedRow.data.id,
      id,
      roleUsers || [],
      'userId'
    );

    // Find the userRoleId
    const roleUserId = findRoleItemId(
      selectedRow.data.id,
      id,
      roleUsers || [],
      'userId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign user)
    const action = isCurrentlyAssigned
      ? () => unAssignUserFromRole(roleUserId)
      : () => assignUserToRole(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      dispatch({ type: TYPES.ERROR });
      return;
    }

    // Update the data in the cache or on the server
    mutateRoleMembers();

    // Create a new array with the updated assigned state for the selected role
    const newUsers = userState.map((user) => {
      if (user.id === id) {
        return { ...user, isAssigned: !isCurrentlyAssigned };
      }
      return user;
    });

    // Update the state of the list user
    setUserState(newUsers);

    dispatch({ type: TYPES.SUCCESS });
  };

  return (
    <AssignItem
      items={items}
      title={title}
      optionName='roleMembers'
      singleOption={SingleOptionTypes.MembersAssigned}
      handleItemSelect={handleItemSelect}
    />
  );
};

export default AssignRoleMember;
