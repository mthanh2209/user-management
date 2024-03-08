import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Component
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { API, INFO_LIST_VIEW_ROLE } from '@constants';

// Helpers
import {
  filterRoleItemsByRoleId,
  findRoleItemId,
  isItemAssignedToRole
} from '@helpers';

// Services
import {
  assignRuleToRole,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  unAssignRuleFromRole
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

interface IAssignRoleRules {
  items: ItemAssign[];
  title: string;
}

const AssignRoleRules = ({ items, title }: IAssignRoleRules) => {
  const [ruleState, setRuleState] = useState<ItemAssign[]>(items);

  const { selectedRow, setUserInfoList } = useContext(Context);

  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: roleRules } = getRoleRules();
  const { data: userRoles } = getUserRoles();

  const roleId = selectedRow.data?.id || 0;

  // Filters role rules based on the role ID.
  const getCorrespondingRoleRules = filterRoleItemsByRoleId(
    roleRules,
    ruleData,
    roleId
  );

  // Filters role users based on the role ID.
  const getCorrespondingRoleUsers = filterRoleItemsByRoleId(
    userRoles,
    roleData,
    roleId
  );

  // Handles the selection of a rule for assignment to a role.
  const handleRuleSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isItemAssignedToRole(
      roleId,
      id,
      roleRules || [],
      'ruleId'
    );

    const roleRuleId = findRoleItemId(
      roleId,
      id,
      roleRules || [],
      'ruleId'
    );

    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromRole(roleRuleId)
      : () => assignRuleToRole(roleId, id);

    const res = await action();

    const data = res && res.data;
    if (!data) {
      return;
    }

    mutate(`${API.BASE}/${API.ROLE_RULES}`);

    const newRules = ruleState.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    setRuleState(newRules);

    setUserInfoList([
      ...INFO_LIST_VIEW_ROLE(
        getCorrespondingRoleRules,
        getCorrespondingRoleUsers
      )
    ]);
  };

  return (
    <AssignItem
      items={items}
      title={title}
      optionName='rule'
      handleItemSelect={handleRuleSelect}
    />
  );
};

export default AssignRoleRules;
