import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Component
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { API, INFO_LIST_VIEW_ROLE } from '@constants';

// Helpers
import {
  filterRoleItemsByRoleId,
  filterUserItemsByUserId,
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
  const { data: roleUsers } = getUserRoles();

  // Filters role rules based on the rule ID.
  const getCorrespondingRoleRules = filterRoleItemsByRoleId(
    roleRules,
    ruleData,
    selectedRow.data.id
  );

  // Filters role users based on the rule ID.
  const getCorrespondingRoleUsers = filterUserItemsByUserId(
    roleUsers,
    roleData,
    selectedRow.data.id
  );

  // Handles the selection of a rule for assignment to a role.
  const handleItemSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isItemAssignedToRole(
      selectedRow.data.id,
      id,
      roleRules || [],
      'ruleId'
    );

    const roleRuleId = findRoleItemId(
      selectedRow.data.id,
      id,
      roleRules || [],
      'ruleId'
    );

    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromRole(roleRuleId)
      : () => assignRuleToRole(selectedRow.data.id, id);

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
      optionName='roleRules'
      handleItemSelect={handleItemSelect}
    />
  );
};

export default AssignRoleRules;
